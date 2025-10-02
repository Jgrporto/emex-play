// context/ProfileSidebarContext.tsx

"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define a "forma" do nosso contexto
interface ProfileSidebarContextType {
  isOpen: boolean;
  toggleSidebar: () => void;
}

// Cria o contexto
const ProfileSidebarContext = createContext<ProfileSidebarContextType | undefined>(undefined);

// Cria o Provedor, que vai gerenciar o estado
export function ProfileSidebarProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <ProfileSidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      {children}
    </ProfileSidebarContext.Provider>
  );
}

// Cria um hook customizado para facilitar o uso
export function useProfileSidebar() {
  const context = useContext(ProfileSidebarContext);
  if (context === undefined) {
    throw new Error('useProfileSidebar must be used within a ProfileSidebarProvider');
  }
  return context;
}