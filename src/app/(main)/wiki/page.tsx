import Desktop from './(desktop)';
import Mobile from './(mobile)';
import ServerLayout from '@/components/server/ServerLayout';
import { LayoutProps } from '../_layout/type';

const MainLayout = ServerLayout<LayoutProps>({ Desktop, Mobile });

export default MainLayout;
