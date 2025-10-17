// context/MenuSidebarContext.tsx
'use client';

import { createContext, useState, useContext, ReactNode } from 'react';

type MenuSidebarContextType = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

const MenuSidebarContext = createContext<MenuSidebarContextType | undefined>(undefined);

export function MenuSidebarProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(prev => !prev);

  return (
    <MenuSidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      {children}
    </MenuSidebarContext.Provider>
  );
}

export function useMenuSidebar() {
  const context = useContext(MenuSidebarContext);
  if (context === undefined) {
    throw new Error('useMenuSidebar must be used within a MenuSidebarProvider');
  }
  return context;
}