// app/(main)/layout.tsx

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-emex-preto">
      <Navbar />
      {/* A tag 'main' agora é flex-grow para ocupar o espaço disponível */}
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}