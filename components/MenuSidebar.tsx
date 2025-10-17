// components/MenuSidebar.tsx
'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { useMenuSidebar } from '@/context/MenuSidebarContext';
import { client } from '@/lib/sanityClient';
import type { Category, Training } from '@/types';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { X, ChevronDown, Check, Loader2 } from 'lucide-react';

interface CategoryWithTrainings extends Category {
  trainings: Training[];
}

export default function MenuSidebar() {
  const { isOpen, toggleSidebar } = useMenuSidebar();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [categories, setCategories] = useState<CategoryWithTrainings[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [isCategoryListOpen, setIsCategoryListOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Simulação de episódios concluídos (substitua pela sua lógica de usuário)
  const [completedModules] = useState(['versao-5.40', 'versao-5.39']);

  useEffect(() => {
    if (isOpen && categories.length === 0) {
      const fetchSidebarData = async () => {
        setIsLoading(true);
        const query = `*[_type == "category"] | order(title asc) {
          _id, title,
          "trainings": *[_type == "training" && references(^._id)] | order(title asc) { _id, title, "slug": slug.current }
        }`;
        try {
          const data = await client.fetch(query);
          setCategories(data);
        } catch (error) {
          console.error("Falha ao buscar dados para a sidebar:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchSidebarData();
    }
  }, [isOpen, categories.length]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCategoryListOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedCategory = useMemo(() => {
    return categories.find(cat => cat._id === selectedCategoryId);
  }, [selectedCategoryId, categories]);

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setIsCategoryListOpen(false);
  };
  
  const handleTrainingClick = (slug: string) => {
    router.push(`/watch/${slug}`);
    toggleSidebar();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="menu-sidebar-overlay" onClick={toggleSidebar}></div>
      <div className={`menu-sidebar-panel ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Image src="/footer-logo.png" alt="EMEX Play" width={40} height={40} />
          <div className="actions text-gray-400">
            <button onClick={toggleSidebar} className=" action-button hover:text-white"><X size={24} /></button>
          </div>
        </div>

        {/* Dropdown de Categoria */}
        <div className="sidebar-form-group">
          <label>Selecione o curso</label>
          <div className="category-dropdown" ref={dropdownRef}>
            <button 
              onClick={() => setIsCategoryListOpen(prev => !prev)} 
              className="category-dropdown-button"
              disabled={isLoading}
            >
              <span className="flex items-center gap-2">
                {isLoading && <Loader2 size={16} className="animate-spin" />}
                {isLoading ? 'Carregando cursos...' : (selectedCategory?.title || 'Selecione...')}
              </span>
              <ChevronDown size={20} />
            </button>
            <div className={`category-dropdown-list ${isCategoryListOpen ? 'open' : ''}`}>
              {categories.map(cat => (
                <button 
                  key={cat._id} 
                  onClick={() => handleSelectCategory(cat._id)}
                  className={cat._id === selectedCategoryId ? 'selected' : ''}
                >
                  {cat.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* --- CORREÇÃO PRINCIPAL AQUI --- */}
        {/* Agora renderizamos uma LISTA de módulos, em vez de um segundo dropdown */}
        {selectedCategory && (
          <div className="sidebar-form-group">
            <label>Módulo</label>
            <div className="module-list">
              {selectedCategory.trainings.map(training => {
                if (!training.slug?.current) return null; // Segurança
                const isCompleted = completedModules.includes(training.slug.current);
                return (
                  // Usamos uma tag <a> para o clique, mas poderia ser <button> também
                  <a key={training._id} onClick={() => handleTrainingClick(training.slug.current)} className="module-item">
                    <span>{training.title}</span>
                    <div className={`completion-indicator ${isCompleted ? 'completed' : ''}`}>
                      {isCompleted && <Check size={14} />}
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}