"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel"; 
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Carousel({
  children,
  options,
}: {
  children: React.ReactNode;
  options?: EmblaOptionsType;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative">
      {/* Viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        {/* Container */}
        <div className="flex">{children}</div>
      </div>

      {/* Prev button */}
      <button
        type="button"
        onClick={scrollPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-background border rounded-full p-2 shadow hover:bg-accent/10 transition"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Next button */}
      <button
        type="button"
        onClick={scrollNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-background border rounded-full p-2 shadow hover:bg-accent/10 transition"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}

export function CarouselItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] px-3">
      {children}
    </div>
  );
}
