import { Facebook, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 mt-12 py-8 text-gray-400">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p>&copy; {new Date().getFullYear()} EMEX Play. Todos os direitos reservados.</p>
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook" className="hover:text-white"><Facebook /></a>
            <a href="#" aria-label="Instagram" className="hover:text-white"><Instagram /></a>
            <a href="#" aria-label="Linkedin" className="hover:text-white"><Linkedin /></a>
          </div>
        </div>
        <div className="text-center text-sm mt-8">
          <a href="#" className="hover:text-white mx-2">Termos de Serviço</a>
          |
          <a href="#" className="hover:text-white mx-2">Política de Privacidade</a>
          |
          <a href="#" className="hover:text-white mx-2">Suporte</a>
        </div>
      </div>
    </footer>
  );
}