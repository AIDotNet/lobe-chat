import { ActionIcon } from '@lobehub/ui';
import { AppWindowMac, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { useGlobalStore } from '@/store/global';
import { SidebarTabKey } from '@/store/global/initialState';
import { useSessionStore } from '@/store/session';

export interface TopActionProps {
  tab?: SidebarTabKey;
}

const TopActions = memo<TopActionProps>(({ tab }) => {
  const { t } = useTranslation('common');
  const switchBackToChat = useGlobalStore((s) => s.switchBackToChat);
  const switchToApp = useGlobalStore((s) => s.switchToApp);

  return (
    <>
      <Link
        aria-label={t('tab.chat')}
        href={'/chat'}
        onClick={(e) => {
          e.preventDefault();
          switchBackToChat(useSessionStore.getState().activeId);
        }}
      >
        <ActionIcon
          active={tab === SidebarTabKey.Chat}
          icon={MessageSquare}
          placement={'right'}
          size="large"
          title={t('tab.chat')}
        />
      </Link>
      <Link
        aria-label={t('tab.app')}
        href={'/app'}
        onClick={(e) => {
          e.preventDefault();
          switchToApp();
        }}
      >
        <ActionIcon
          active={tab === SidebarTabKey.App}
          icon={AppWindowMac}
          placement={'right'}
          size="large"
          title={t('tab.app')}
        />
      </Link>
    </>
  );
});

export default TopActions;
