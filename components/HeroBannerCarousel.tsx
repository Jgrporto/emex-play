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
    <div className="relative w-full h-[60vh] lg:h-[70vh] group z-10">
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
        {banners.map((banner) => {
          // Lógica para criar o estilo do Hotspot
          const imageStyle = banner.imagem?.hotspot
            ? { objectPosition: `${banner.imagem.hotspot.x * 100}% ${banner.imagem.hotspot.y * 100}%` }
            : { objectPosition: 'center' };

          return (
            <SwiperSlide key={banner._id}>
              <div className="relative h-full w-full">
                <Image
                  src={banner.imagemUrlOtimizada}
                  alt={banner.titulo}
                  fill
                  priority
                  quality={100}
                  sizes="100vw"
                  className="object-cover w-full h-full scale-100"
                  // Estilo dinâmico aplicado para o enquadramento correto
                  style={imageStyle} 
                />
                inset-0 bg-gradient-to-r from-black/80 via-bla <div className="absoluteck/50 to-transparent p-8 sm:p-12 flex flex-col justify-center items-start z-20">
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
          );
        })}
      </Swiper>

       <div className="absolute bottom-0 left-0 w-full h-32 banner-vignette z-5 pointer-events-none"></div>

      <div className="swiper-button-prev-hero absolute top-1/2 left-0 -translate-y-1/2 z-20 h-full w-24 flex items-center justify-start cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute inset-0 bg-gradient-to-r from-emex-preto/70 to-transparent"></div>
        <ChevronLeft size={40} className="relative text-white" />
      </div>
      <div className="swiper-button-next-hero absolute top-1/2 right-0 -translate-y-1/2 z-20 h-full w-24 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute inset-0 bg-gradient-to-l from-emex-preto/70 to-transparent"></div>
        <ChevronRight size={40} className="relative text-white" />
      </div>
    </div>
  );
}