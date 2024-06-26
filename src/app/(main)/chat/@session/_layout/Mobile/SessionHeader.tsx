'use client';

import { ActionIcon, Logo, MobileNavBar } from '@lobehub/ui';
import { MessageSquarePlus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';
import UserAvatar from '@/features/User/UserAvatar';
import { useSessionStore } from '@/store/session';
import { mobileHeaderSticky } from '@/styles/mobileHeader';

const Header = memo(() => {
  const [createSession] = useSessionStore((s) => [s.createSession]);
  const router = useRouter();

  return (
    <MobileNavBar
      left={
        <Flexbox align={'center'} gap={8} horizontal style={{ marginLeft: 8 }}>
          <UserAvatar onClick={() => router.push('/me')} size={32} />
          <Logo type={'text'} />
        </Flexbox>
      }
      right={[]
      }
      style={mobileHeaderSticky}
    />
  );
});

export default Header;
