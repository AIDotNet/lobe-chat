import Desktop from './(desktop)';
import ServerLayout from '@/components/server/ServerLayout';
import { LayoutProps } from '../_layout/type';

const MainLayout = ServerLayout<LayoutProps>({ Desktop, Mobile: Desktop });

export default MainLayout;
