'use client';

import { useTranslation } from 'react-i18next';

import FullscreenLoading from '@/components/FullscreenLoading';

const Loading = () => {
  const { t } = useTranslation('common');
// @ts-ignore
  return <FullscreenLoading title={t('appInitializing')} />;
};

export default Loading;
