import { Icon } from '@lobehub/ui';
import { Dropdown } from 'antd';
import { createStyles } from 'antd-style';
import isEqual from 'fast-deep-equal';
import { LucideArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, memo, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { ModelItemRender, ProviderItemRender } from '@/components/ModelSelect';
import { useAgentStore } from '@/store/agent';
import { agentSelectors } from '@/store/agent/slices/chat';
import { useUserStore } from '@/store/user';
import { modelProviderSelectors } from '@/store/user/selectors';
import { ModelProviderCard } from '@/types/llm';
import { withBasePath } from '@/utils/basePath';
import { GetChatApplicationsList } from '@/services/ChatApplicationService';

const useStyles = createStyles(({ css, prefixCls }) => ({
  menu: css`
    .${prefixCls}-dropdown-menu-item {
      display: flex;
      gap: 8px;
    }
    .${prefixCls}-dropdown-menu {
      &-item-group-title {
        padding-inline: 8px;
      }

      &-item-group-list {
        margin: 0 !important;
      }
    }
  `,
  tag: css`
    cursor: pointer;
  `,
}));

let models = [];
const ModelSwitchPanel = memo<PropsWithChildren>(({ children }) => {
  const { t } = useTranslation('components');
  const { styles, theme } = useStyles();
  const [items, setItems] = useState([]);
  const [model, updateAgentConfig] = useAgentStore((s) => [
    agentSelectors.currentAgentModel(s),
    s.updateAgentConfig,
  ]);

  useEffect(() => {

    GetChatApplicationsList(1, 1000)
      .then((res) => {
        models = res.result;
        setItems([
          {
            id: '系统应用',
            name: '应用',
            chatModels: models,
          }].map((provider) => ({
            children: getModelItems(provider),
            key: provider.name,
            label: <ProviderItemRender provider={provider.name} />,
            type: 'group',
          })));
      })
      .catch((err) => {
        console.error(err);
      });

    const getModelItems = (provider: any) => {
      const items = provider.chatModels.map((model) => ({
        key: model.id,
        label: <ModelItemRender {...model} />,
        onClick: () => {
          updateAgentConfig({ model: model.id, provider: provider.id });
        },
      }));

      return items;

      // if there is empty items, add a placeholder guide
      // if (items.length === 0)
      //   return [
      //     {
      //       key: 'empty',
      //       label: (
      //         <Flexbox gap={8} horizontal style={{ color: theme.colorTextTertiary }}>
      //           {t('ModelSwitchPanel.emptyModel')}
      //           <Icon icon={LucideArrowRight} />
      //         </Flexbox>
      //       ),
      //       onClick: () => {
      //         router.push(withBasePath('/settings/llm'));
      //       },
      //     },
      //   ];
    };

  }, []);

  return (
    <Dropdown
      menu={{
        activeKey: model,
        className: styles.menu,
        items,
        style: {
          maxHeight: 500,
          overflowY: 'scroll',
        },
      }}
      placement={'topLeft'}
      trigger={['click']}
    >
      <div className={styles.tag}>{children}</div>
    </Dropdown>
  );
});

export default ModelSwitchPanel;
