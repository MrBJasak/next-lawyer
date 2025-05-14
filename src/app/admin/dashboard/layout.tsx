'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaFileAlt } from 'react-icons/fa';
import { TbFileCertificate } from 'react-icons/tb';
import { LogoutButton } from '../../../components/Admin/SignIn/SignIn';
import './layout.scss';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? 'active' : '';
  };
  return (
    <div className='dashboard'>
      <div className='dashboard__content'>
        <aside className='dashboard__sidebar'>
          <nav className='dashboard__sidebar-nav'>
            <Link href='/admin/dashboard/posts' className={isActive('/admin/dashboard/posts')}>
              <FaFileAlt />
              Posty
            </Link>
            <Link href='/admin/dashboard/certificates' className={isActive('/admin/dashboard/certificates')}>
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
