import Link from 'next/link';
import { FaFileAlt, FaTachometerAlt } from 'react-icons/fa';
import { TbFileCertificate } from 'react-icons/tb';
import { LogoutButton } from '../../../components/Admin/SignIn/SignIn';
import './layout.scss';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='dashboard'>
      <div className='dashboard__content'>
        <aside className='dashboard__sidebar'>
          <nav className='dashboard__sidebar-nav'>
            <Link href='/admin/dashboard' className='active'>
              <FaTachometerAlt />
              Dashboard
            </Link>
            <Link href='/admin/dashboard/posts'>
              <FaFileAlt />
              Posty
            </Link>
            <Link href='/admin/dashboard/certificates'>
              <TbFileCertificate />
              Certyfiakty
            </Link>
            <LogoutButton />
          </nav>
        </aside>
        <main className='dashboard__main'>{children}</main>
      </div>
    </div>
  );
}
