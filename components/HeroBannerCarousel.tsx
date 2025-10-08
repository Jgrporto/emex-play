"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Banner } from '@/types';

type HeroBannerCarouselProps = {
  banners: Banner[];
};

export default function HeroBannerCarousel({ banners }: HeroBannerCarouselProps) {
  return (
    <div className="relative w-full h-[60vh] lg:h-[70vh] group">
      <Swiper
        modules={[Navigation, Autoplay, EffectFade]}
        navigation={{
          nextEl: '.swiper-button-next-hero',
          prevEl: '.swiper-button-prev-hero',
        }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="h-full w-full overflow-hidden"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner._id}>
            <div className="relative h-full w-full">
              <Image
                src={banner.imagem.asset.url}
                alt={banner.titulo}
                fill
                className="object-cover"
              />
              {/* O conteúdo de texto continua aqui, com z-index para sobrepor o degradê */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent p-8 sm:p-12 flex flex-col justify-center items-start z-20">
                <h2 className="text-3xl sm:text-4xl font-bold text-white max-w-md">
                  {banner.titulo}
                </h2>
                {banner.descricao && (
                  <p className="text-md sm:text-lg text-gray-300 mt-4 max-w-md">
                    {banner.descricao}
                  </p>
                )}
                {banner.mostrarBotao && banner.link && (
                  <div className="mt-8">
                    <Link href={banner.link} passHref>
                      <button className="bg-emex-verde text-white font-bold py-3 px-6 rounded-md hover:bg-green-600 transition-colors duration-300 cursor-pointer">
                        {banner.textoDoBotao || 'Acessar'}
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* --- NOVA BORDA DEGRADÊ PARA FAZER A TRANSIÇÃO --- */}
      {/* Esta div cria um degradê que se funde com o fundo do site (emex-preto) */}
      <div className="absolute bottom-0 left-0 w-full h-32 banner-vignette z-10 pointer-events-none"></div>

{/* --- COR DAS SETAS ALTERADA AQUI --- */}
      <div className="swiper-button-prev-hero absolute top-1/2 left-0 -translate-y-1/2 z-20 
                      h-full w-24 flex items-center justify-start 
                      cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
        {/* Trocamos 'from-black/50' por 'from-emex-preto/70' */}
        <div className="absolute inset-0 bg-gradient-to-r from-emex-preto/70 to-transparent"></div>
        <ChevronLeft size={40} className="relative text-white" />
      </div>
      <div className="swiper-button-next-hero absolute top-1/2 right-0 -translate-y-1/2 z-20
                      h-full w-24 flex items-center justify-center
                      cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
        {/* Trocamos 'from-black/50' por 'from-emex-preto/70' */}
        <div className="absolute inset-0 bg-gradient-to-l from-emex-preto/70 to-transparent"></div>
        <ChevronRight size={40} className="relative text-white" />
      </div>
    </div>
  );
}