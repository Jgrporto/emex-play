  import Image from 'next/image';

  export default function Loading() {
    return (
      <div className="bg-emex-preto min-h-screen flex flex-col justify-center items-center">
        <div className="animate-pulse">
          {/* 1. Logo aumentado novamente */}
          <Image
            src="/footer-logo.png"
            alt="Carregando EMEX Play"
            width={300} // DE: 250
            height={100} // DE: 83
            priority
          />
        </div>
        
        {/* 2. Texto mais estilizado */}
        <p className="text-gray-500 mt-8 text-lg uppercase tracking-widest animate-pulse">
          Carregando conteúdo...
        </p>
      </div>
    );
  }