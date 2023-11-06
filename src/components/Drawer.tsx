import React, { ReactNode } from 'react';

interface DrawerProps {
    isOpen?: boolean
    onClose?: () => void
    children: ReactNode
}
const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, children }) => {
  return <div className='drawer'>
      {children}
    </div>;
};

export default Drawer;