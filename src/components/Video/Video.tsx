import React, { useState, useEffect, useRef } from 'react';
import IconButton from 'components/IconButton/IconButton';
import config from 'sitecore.config';
import { useSitecore } from 'lib/challenger/useSitecore';
import { ImageField, Link, LinkField, NextImage, Field } from '@sitecore-content-sdk/nextjs';
import Image from 'next/image';

interface ButtonType {
  fields: { Color: Field<string> };
}

interface SizeType {
  fields: { Size: Field<string> };
}

interface VideoProps {
  [key: string]: unknown;
  fields: {
    'Video URL': LinkField;
    CustomThumbnail?: ImageField;
    ButtonImage?: ButtonType;
    Size?: SizeType;
  };
}

// Custom Play Icon Components
const PlayIconBlue = () => (
  <img src={`${config.publicUrl}/youtube-play-blue.svg`} alt="Play_Blue" height={50} width={50} />
);

const PlayIconGreen = () => (
  <img src={`${config.publicUrl}/youtube-play-green.svg`} alt="Play_Green" height={50} width={50} />
);

const getDimensions = (size: string | null | undefined): { width: number; height: number } => {
  if (size === 'Large') {
    return { width: 960, height: 540 };
  }
  if (size === 'Medium') {
    return { width: 640, height: 360 };
  }
  return { width: 400, height: 225 };
};

function Video(props: VideoProps) {
  const videoUrl = props?.fields?.['Video URL'];
  const customThumbnail = props?.fields?.CustomThumbnail?.value?.src;
  const playIconColor = props?.fields?.ButtonImage?.fields?.Color?.value;
  const size = props?.fields?.Size?.fields?.Size?.value;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [thumbnailLoaded, setThumbnailLoaded] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { isEditMode } = useSitecore();
  const thumbnailDimension = getDimensions(size);

  function extractYouTubeVideoID(url: string): string | null {
    try {
      // Normalize URL
      const parsedUrl = new URL(url);

      // Case 1: Standard YouTube watch URL: https://www.youtube.com/watch?v=VIDEO_ID
      if (parsedUrl.hostname.includes('youtube.com')) {
        if (parsedUrl.searchParams.has('v')) {
          return parsedUrl.searchParams.get('v');
        }

        // Case 2: Embed URL: https://www.youtube.com/embed/VIDEO_ID
        const embedMatch = parsedUrl.pathname.match(/\/embed\/([^\/\?\&]+)/);
        if (embedMatch) {
          return embedMatch[1];
        }

        // Case 3: Shorts URL: https://www.youtube.com/shorts/VIDEO_ID
        const shortsMatch = parsedUrl.pathname.match(/\/shorts\/([^\/\?\&]+)/);
        if (shortsMatch) {
          return shortsMatch[1];
        }
      }

      // Case 4: Shortened URL: https://youtu.be/VIDEO_ID
      if (parsedUrl.hostname === 'youtu.be') {
        return parsedUrl.pathname.slice(1);
      }

      return null;
    } catch (err) {
      // Invalid URL
      return null;
    }
  }

  const videoId = videoUrl?.value?.href ? extractYouTubeVideoID(videoUrl?.value?.href) : '';

  // Generate YouTube thumbnail URL - using hqdefault for better compatibility
  const getThumbnailUrl = (id: string | null): string => {
    if (customThumbnail) return customThumbnail;
    return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  };

  const thumbnailUrl: string = getThumbnailUrl(videoId);

  // Handle modal open
  const openModal = (): void => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // Handle modal close
  const closeModal = (): void => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  // Handle escape key press
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent): void => {
      if (event.key === 'Escape' && isOpen) {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen]);

  // Handle click outside modal
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      closeModal();
    }
  };

  // Handle thumbnail load error with multiple fallbacks
  const handleThumbnailError = (e: React.SyntheticEvent<HTMLImageElement>): void => {
    const target = e.target as HTMLImageElement;
    const currentSrc = target.src;

    if (currentSrc.includes('hqdefault.jpg')) {
      target.src = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
    } else if (currentSrc.includes('mqdefault.jpg')) {
      target.src = `https://img.youtube.com/vi/${videoId}/default.jpg`;
    } else if (currentSrc.includes('maxresdefault.jpg')) {
      target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }
  };

  // Handle keyboard events for thumbnail
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal();
    }
  };

  // Handle iframe error
  const handleIframeError = (): void => {
    console.warn('YouTube embed failed to load:', videoId);
  };

  // Get the appropriate play icon
  const PlayIcon = playIconColor === 'Blue' ? PlayIconBlue : PlayIconGreen;

  function renderForPagesEditor() {
    return (
      <div>
        <NextImage field={props?.fields?.CustomThumbnail} height={225} width={400} />
        <Link field={videoUrl} />
      </div>
    );
  }

  if (isEditMode) {
    return <>{renderForPagesEditor()}</>;
  }

  return (
    <>
      {/* Thumbnail with Play Button Container*/}
      <div
        className={`group relative h-full w-full cursor-pointer overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105`}
        style={{
          maxWidth: `${thumbnailDimension.width}px`,
          maxHeight: `${thumbnailDimension.height}px`,
        }}
        onClick={openModal}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        aria-label={`Play video`}
      >
        {/* Thumbnail Image */}
        <div className="bg-gray-200 relative aspect-video w-full">
          <Image
            src={thumbnailUrl}
            alt={thumbnailUrl}
            height={thumbnailDimension.height}
            width={thumbnailDimension.width}
            className={`h-full w-full object-cover transition-opacity duration-300 ${
              thumbnailLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setThumbnailLoaded(true)}
            onError={handleThumbnailError}
          />
          {/*Set custom play button or Loading msg based on thumbnailLoaded state*/}
          {thumbnailLoaded ? (
            /* Custom Play Button */
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className={`transition-all duration-300 ${
                  isHovered ? 'scale-110' : 'scale-100'
                } drop-shadow-lg`}
              >
                <PlayIcon />
              </div>
            </div>
          ) : (
            /* Loading placeholder */
            <div className="bg-gray-300 absolute inset-0 flex animate-pulse items-center justify-center">
              <div className="text-white">Loading...</div>
            </div>
          )}
        </div>
      </div>

      {/* Modal Container*/}
      {isOpen && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm"
          onClick={handleOverlayClick}
          role="dialog"
          aria-modal="true"
          aria-label="Video player modal"
        >
          {/* Close Button */}
          <IconButton
            type="CloseIcon"
            onClick={closeModal}
            className="absolute right-3 top-3 rounded-[36px] bg-grey-darker p-1.5 transition-all duration-200 hover:scale-110 max-sm:w-11"
            aria-label="Close video"
          />

          {/* Video Container */}
          <div
            ref={modalRef}
            className="relative w-full max-w-[90vw] overflow-hidden rounded-lg bg-black shadow-2xl md:h-full md:max-h-[80vh]"
          >
            <iframe
              ref={iframeRef}
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
              className="aspect-video min-h-full min-w-full rounded-lg"
              allow="autoplay; encrypted-media; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              onError={handleIframeError}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Video;
