import dynamic from 'next/dynamic';
import { cookies } from 'next/headers';
import { FC, ReactNode } from 'react';

import { getClientConfig } from '@/config/client';
import { getServerFeatureFlagsValue } from '@/config/server/featureFlags';
import { LOBE_LOCALE_COOKIE } from '@/const/locale';
import {
  LOBE_THEME_APPEARANCE,
  LOBE_THEME_NEUTRAL_COLOR,
  LOBE_THEME_PRIMARY_COLOR,
} from '@/const/theme';
import { getServerGlobalConfig } from '@/server/globalConfig';
import { ServerConfigStoreProvider } from '@/store/serverConfig';
import { getAntdLocale } from '@/utils/locale';
import { isMobileDevice } from '@/utils/responsive';

import AppTheme from './AppTheme';
import Locale from './Locale';
import StoreInitialization from './StoreInitialization';
import StyleRegistry from './StyleRegistry';

interface GlobalLayoutProps {
  children: ReactNode;
}

const GlobalLayout = async ({ children }: GlobalLayoutProps) => {
  // get default theme config to use with ssr
  const cookieStore = cookies();
  const appearance = cookieStore.get(LOBE_THEME_APPEARANCE);
  const neutralColor = cookieStore.get(LOBE_THEME_NEUTRAL_COLOR);
  const primaryColor = cookieStore.get(LOBE_THEME_PRIMARY_COLOR);

  // get default locale config to use with ssr
  const defaultLang = cookieStore.get(LOBE_LOCALE_COOKIE);
  const antdLocale = await getAntdLocale(defaultLang?.value);

  // get default feature flags to use with ssr
  const serverFeatureFlags = getServerFeatureFlagsValue();
  const serverConfig = getServerGlobalConfig();
  const isMobile = isMobileDevice();
  return (
    <StyleRegistry>
      <Locale antdLocale={antdLocale} defaultLang={defaultLang?.value}>
        <AppTheme
          defaultAppearance={appearance?.value}
          defaultNeutralColor={neutralColor?.value as any}
          defaultPrimaryColor={primaryColor?.value as any}
        >
          <StoreInitialization />
          <ServerConfigStoreProvider
            featureFlags={serverFeatureFlags}
            isMobile={isMobile}
            serverConfig={serverConfig}
          >
            {children}
          </ServerConfigStoreProvider>
        </AppTheme>
      </Locale>
    </StyleRegistry>
  );
};

export default GlobalLayout;
