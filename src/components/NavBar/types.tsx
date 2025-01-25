import { AiOutlinePhone, AiTwotoneMail } from 'react-icons/ai';

export const topBarItems = [
  {
    value: '+48 665 643 337',
    icon: <AiOutlinePhone className='icon' style={{ transform: 'rotate(90deg)' }} />,
    href: '#',
    type: 'phone',
  },
  {
    value: 'adwokat.agnieszka.jasak@gmail.com',
    icon: <AiTwotoneMail className='icon' />,
    href: '#',
    type: 'email',
  },
];
export type TopBarListProps = typeof topBarItems;

export const navItems = [
  { label: 'Strona główna', path: '/' },
  { label: 'O mnie', path: '/about' },
  { label: 'Zakres usług', path: '/services' },
  { label: 'Honorarium', path: '/fee' },
  { label: 'Blog', path: '/blog' },
  { label: 'Kontakt', path: '/contact' },
];

export const getHref = (item: TopBarListProps[0]) => {
  if (item.type === 'email') return `mailto:${item.value}`;
  if (item.type === 'phone') return `tel:${item.value}`;
  return item.href;
};
