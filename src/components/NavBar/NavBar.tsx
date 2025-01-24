import { useEffect, useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

import Image from 'next/image';
import Link from 'next/link';
import logo from '../../assets/logo/Logo.jpg';
import { Button } from '../Button/Buttons';
import './styles.scss';
import { getHref, navItems, topBarItems, TopBarListProps } from './types';

export const NavBar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);


  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const topBarHeight = document.querySelector('.top-bar')?.clientHeight || 0;
      const position = window.scrollY;
      setIsSticky(position > topBarHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // const router = useRouter();

  return (
    <>
      <div className='top-bar'>
        <div className='top-bar-container'>
          <div className='top-bar-container-inner'>
            <TopBarList items={topBarItems} />
            <div className='top-bar-buttons'>
              <SocialIcons />
              <div>
                <Button >Umów się</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <header className={`header ${isSticky ? 'sticky' : ''}`}>
        <div className='header-container'>
          <div className='header-container-inner'>
            <div className='header-logo'>
              <Link href='/'>
                <Image 
                  src={logo} 
                  alt='Logo Agnieszka Jasak' 
                  className='header-logo-image'
                  priority
                />
              </Link>
            </div>
            <div className='burger-menu' onClick={toggleSidebar}>
              <AiOutlineMenu />
            </div>
            <div className='header-nav-items'>
              <NavBarList items={navItems} />
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar for mobile screens */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className='close-btn' onClick={toggleSidebar}>
          <AiOutlineClose />
        </div>
        <div className='sidebar-nav-items'>
          {navItems.map((item, index) => (
            <div key={index} className='sidebar-nav-item'>
              <Link onClick={toggleSidebar} href={item.path}>
                {item.label}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const TopBarList = ({ items }: { items: TopBarListProps }) => {
  return (
    <div className='topbar-list'>
      {items.map((item, index) => (
        <div key={index} className='topbar-item'>
          {item.icon}
          <a href={getHref(item)} className={item.type === 'time' ? 'no-cursor' : 'link'}>
            {item.value}
          </a>
          {index !== items.length - 1 && <span className='separator'>&middot;</span>}
        </div>
      ))}
    </div>
  );
};

const NavBarList = ({ items }: { items: { label: string; path: string }[] }) => {
  return (
    <>
      {items.map((item, index) => (
        <div className='header-nav-item' key={index}>
          <Link href={item.path}>{item.label}</Link>
        </div>
      ))}
    </>
  );
};

const SocialIcons = () => {
  const iconStyle = {
    color: 'green',
    fontSize: '1.5rem',
  };

  const socialIcons = [
    {
      name: 'linkedin',
      icon: <FaLinkedin style={iconStyle} />,
      link: 'https://www.linkedin.com/in/agnieszka-jasak-7b5861170/',
    },
    {
      name: 'facebook',
      icon: <FaFacebook style={iconStyle} />,
      link: 'https://www.facebook.com/profile.php?id=61566701225521',
    },
    {
      name: 'instagram',
      icon: <FaInstagram style={iconStyle} />,
      link: 'https://www.instagram.com/adwokat_agnieszka_jasak',
    },
  ];

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      {socialIcons.map((socialIcon, index) => {
        return (
          <a key={index} href={socialIcon.link} target='_blank' rel='noopener noreferrer'>
            {socialIcon.icon}
          </a>
        );
      })}
    </div>
  );
};
