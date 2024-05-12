import { ClientOptions } from 'openai';

import type { TracePayload } from '@/const/trace';

import { LobeRuntimeAI } from './BaseAI';
import { LobeOpenAI } from './openai';
import { ChatCompetitionOptions, ChatStreamPayload, ModelProvider } from './types';


export interface AgentChatOptions {
  enableTrace?: boolean;
  provider: string;
  trace?: TracePayload;
}

class AgentRuntime {
  private _runtime: LobeRuntimeAI;

  constructor(runtime: LobeRuntimeAI) {
    this._runtime = runtime;
  }

  /**
   * Initiates a chat session with the agent.
   *
   * @param payload - The payload containing the chat stream data.
   * @param options - Optional chat competition options.
   * @returns A Promise that resolves to the chat response.
   *
   * @example - Use without trace
   * ```ts
   * const agentRuntime = await initializeWithClientStore(provider, payload);
   * const data = payload as ChatStreamPayload;
   * return await agentRuntime.chat(data);
   * ```
   *
   * @example - Use Langfuse trace
   * ```ts
   * // ============  1. init chat model   ============ //
   * const agentRuntime = await initAgentRuntimeWithUserPayload(provider, jwtPayload);
   * // ============  2. create chat completion   ============ //
   * const data = {
   * // your trace options here
   *  } as ChatStreamPayload;
   * const tracePayload = getTracePayload(req);
   * return await agentRuntime.chat(data, createTraceOptions(data, {
   *   provider,
   *   trace: tracePayload,
   * }));
   * ```
   */
  async chat(payload: ChatStreamPayload, options?: ChatCompetitionOptions) {
    return this._runtime.chat(payload, options);
  }

  async models() {
    return this._runtime.models?.();
  }

  /**
   * @description Initialize the runtime with the provider and the options
   * @param provider choose a model provider
   * @param params options of the choosed provider
   * @returns the runtime instance
   * Try to initialize the runtime with the provider and the options.
   * @example
   * ```ts
   * const runtime = await AgentRuntime.initializeWithProviderOptions(provider, {
   *    [provider]: {...options},
   * })
   * ```
   * **Note**: If you try to get a AgentRuntime instance from client or server,
   * you should use the methods to get the runtime instance at first.
   * - `src/app/api/chat/agentRuntime.ts: initAgentRuntimeWithUserPayload` on server
   * - `src/services/chat.ts: initializeWithClientStore` on client
   */
  static async initializeWithProviderOptions(
    provider: string,
    params: Partial<{
      openai: Partial<ClientOptions>;
    }>,
  ) {
    let runtimeModel: LobeRuntimeAI;

    // switch (provider) {
    //   default:
    //   case ModelProvider.OpenAI: {
    //     // Will use the openai as default provider
    //     runtimeModel = new LobeOpenAI(params.openai ?? (params as any)[provider]);
    //     break;
    //   }

    // }
    runtimeModel = new LobeOpenAI(params.openai ?? (params as any)[provider]);

    return new AgentRuntime(runtimeModel);
  }
}

export default AgentRuntime;
