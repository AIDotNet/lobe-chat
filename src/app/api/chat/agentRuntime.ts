import { getServerConfig } from '@/config/server';
import { JWTPayload } from '@/const/auth';
import { INBOX_SESSION_ID } from '@/const/session';
import {
  LOBE_CHAT_OBSERVATION_ID,
  LOBE_CHAT_TRACE_ID,
  TracePayload,
  TraceTagMap,
} from '@/const/trace';
import { AgentRuntime, ChatStreamPayload, ModelProvider } from '@/libs/agent-runtime';
import { TraceClient } from '@/libs/traces';

import apiKeyManager from './apiKeyManager';

export interface AgentChatOptions {
  enableTrace?: boolean;
  provider: string;
  trace?: TracePayload;
}

/**
 * Retrieves the options object from environment and apikeymanager
 * based on the provider and payload.
 *
 * @param provider - The model provider.
 * @param payload - The JWT payload.
 * @returns The options object.
 */
const getLlmOptionsFromPayload = (provider: string, payload: JWTPayload) => {
  switch (provider) {
    default: // Use Openai options as default
    case ModelProvider.OpenAI: {
      const { OPENAI_API_KEY, OPENAI_PROXY_URL } = getServerConfig();
      const openaiApiKey = payload?.apiKey || OPENAI_API_KEY;
      const baseURL = payload?.endpoint || OPENAI_PROXY_URL;
      const apiKey = apiKeyManager.pick(openaiApiKey);
      return {
        apiKey,
        baseURL,
      };
    }
  }
};

/**
 * Initializes the agent runtime with the user payload in backend
 * @param provider - The provider name.
 * @param payload - The JWT payload.
 * @returns A promise that resolves when the agent runtime is initialized.
 */
export const initAgentRuntimeWithUserPayload = (provider: string, payload: JWTPayload) => {
  return AgentRuntime.initializeWithProviderOptions(provider, {
    [provider]: getLlmOptionsFromPayload(provider, payload),
  });
};

export const createTraceOptions = (
  payload: ChatStreamPayload,
  { trace: tracePayload, provider }: AgentChatOptions,
) => {
  const { messages, model, tools, ...parameters } = payload;
  // create a trace to monitor the completion
  const traceClient = new TraceClient();
  const trace = traceClient.createTrace({
    id: tracePayload?.traceId,
    input: messages,
    metadata: { provider },
    name: tracePayload?.traceName,
    sessionId: `${tracePayload?.sessionId || INBOX_SESSION_ID}@${tracePayload?.topicId || 'start'}`,
    tags: tracePayload?.tags,
    userId: tracePayload?.userId,
  });

  const generation = trace?.generation({
    input: messages,
    metadata: { provider },
    model,
    modelParameters: parameters as any,
    name: `Chat Completion (${provider})`,
    startTime: new Date(),
  });

  return {
    callback: {
      experimental_onToolCall: async () => {
        trace?.update({
          tags: [...(tracePayload?.tags || []), TraceTagMap.ToolsCall],
        });
      },

      onCompletion: async (completion: string) => {
        generation?.update({
          endTime: new Date(),
          metadata: { provider, tools },
          output: completion,
        });

        trace?.update({ output: completion });
      },

      onFinal: async () => {
        await traceClient.shutdownAsync();
      },

      onStart: () => {
        generation?.update({ completionStartTime: new Date() });
      },
    },
    headers: {
      [LOBE_CHAT_OBSERVATION_ID]: generation?.id,
      [LOBE_CHAT_TRACE_ID]: trace?.id,
    },
  };
};
