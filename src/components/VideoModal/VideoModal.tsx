import IconButton from 'components/IconButton/IconButton';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

interface VideoModalProps {
  url: string | undefined;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

function VideoModal(props: VideoModalProps) {
  const videoUrl = props.url;
  const [isOpen, setIsOpen] = useState<boolean>(props.showModal);
  const modalRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

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

  const videoId = videoUrl ? extractYouTubeVideoID(videoUrl) : '';

  // Handle modal close
  const closeModal = (): void => {
    setIsOpen(false);
    props.setShowModal(!props.showModal);
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

  // Handle iframe error
  const handleIframeError = (): void => {
    console.warn('YouTube embed failed to load:', videoId);
  };

  return (
    <>
      {/* Modal Container*/}
      {isOpen && (
        <div
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm"
          onClick={handleOverlayClick}
          role="dialog"
          aria-modal="true"
          aria-label="Video player modal"
        >
          {/* Close Button */}
          <IconButton
            type="CloseIcon"
            onClick={closeModal}
            className="relative bottom-3 right-5 self-end rounded-[36px] bg-grey-darker p-0.5 transition-all duration-200 hover:scale-110 max-sm:w-11"
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
              className="aspect-video max-h-full min-h-full min-w-full rounded-lg"
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

export default VideoModal;
