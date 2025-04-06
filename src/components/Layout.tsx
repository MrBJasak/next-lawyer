import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { Footer } from './Footer/Footer';
import { NavBar } from './NavBar/NavBar';

export const Layout = ({ children }: { children: ReactNode }) => {
  console.log('layout');
  const pathname = usePathname();

  const isAdminPath = pathname.startsWith('/admin');

  return (
    <>
      {!isAdminPath && <NavBar />}
      {children}
      {!isAdminPath && <Footer />}
    </>
  );
};
