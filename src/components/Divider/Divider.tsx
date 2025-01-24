import React from 'react';
import './Divider.scss';

interface DividerProps {
  children?: React.ReactNode;
}

export const Divider: React.FC<DividerProps> = ({ children }) => (
  <>
    {children}
    <div className='divider'></div>
  </>
);
