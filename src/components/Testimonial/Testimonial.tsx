'use client';

import { useState, useRef } from 'react';
import { TestimonialProps } from './Testimonial.types';
import { NextImage, RichText } from '@sitecore-content-sdk/nextjs';
import { ArrowLeftIcon, ArrowRightIcon } from 'components/Icons';

export default function Testimonial(props: TestimonialProps) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const items = props?.rendering?.fields.List;

  const next = () => setIndex((prev) => (prev + 1) % items?.length);
  const prev = () => setIndex((prev) => (prev - 1 + items?.length) % items?.length);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;

    if (delta > 50) next();
    if (delta < -50) prev();

    touchStartX.current = null;
  };

  return (
    <div className="w-full overflow-hidden px-4 py-10 md:px-10 md:py-16">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div
          className="w-full overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${index * 100}%)`,
            }}
          >
            {items?.map((item) => (
              <div
                key={item.fields.Id?.value}
                className="
                  flex
                  min-w-full flex-col gap-12
                  md:flex-row md:items-center md:justify-start
                "
              >
                {/* LEFT LOGOS (unchanged on md) */}
                <div className="flex items-center gap-3 md:w-1/4">
                  <NextImage field={item.fields.Logo} />
                </div>

                {/* TEXT (center stays same on md) */}
                <div className="text-bright-navy md:w-2/4">
                  <span className="text-bright-navy md:mb-6">
                    <RichText className="mb-4 text-bright-navy md:mb-6" field={item.fields.Quote} />
                  </span>

                  <RichText className="text-bright-navy" field={item.fields.SubQuote} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex shrink-0 items-center justify-center gap-4 md:ml-6">
        <button
          onClick={prev}
          className="min-w-[50px] rounded-sm bg-bright-teal px-5 py-3 font-roboto-500 text-lg text-bright-navy hover:bg-teal lg:w-fit"
        >
          <ArrowLeftIcon />
        </button>

        <span className="text-xs sm:text-sm">
          {index + 1} / {items?.length}
        </span>

        <button
          onClick={next}
          className="min-w-[50px] rounded-sm bg-bright-teal px-5 py-3 font-roboto-500 text-lg text-bright-navy hover:bg-teal lg:w-fit"
        >
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
}
