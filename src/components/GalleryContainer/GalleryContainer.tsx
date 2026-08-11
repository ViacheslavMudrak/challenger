import GalleryCard from 'components/GalleryContainer/GalleryCard';
import { useEffect, useMemo, useState } from 'react';
import GalleryContainerPagination from './GalleryContainer.pagination';
import { useSitecore } from 'lib/challenger/useSitecore';
import { ComponentParams, ComponentRendering, Placeholder } from '@sitecore-content-sdk/nextjs';
import { GalleryCardFields, GalleryCardProps } from './GalleryContainer.types';
import { useAnalytics } from 'lib/challenger/useAnalytics';
import { useRouter } from 'next/router';

export interface GalleryContainerProps {
  rendering: ComponentRendering & { params: ComponentParams };
}

export default function GalleryContainer(props: GalleryContainerProps) {
  const NUMBER_OF_CARDS_PER_PAGE = 6;

  const { isEditMode, isPreviewMode } = useSitecore();
  const phKey = 'gallery-container';
  const router = useRouter();

  const delimiter = ' ';
  const containerStyles = props?.rendering?.params?.Styles || '';
  const uniqueId = props?.rendering?.params?.RenderingIdentifier || props?.rendering?.uid || '';
  const gapSize =
    containerStyles.split(delimiter).find((s: string) => s.startsWith('spacing')) || '';
  const alignment =
    containerStyles.split(delimiter).find((s: string) => s.startsWith('position')) || '';

  const cards =
    props?.rendering?.placeholders && props?.rendering?.placeholders[phKey].length >= 0
      ? props?.rendering?.placeholders[phKey]
      : [];

  const { linkComponent } = useAnalytics(props.rendering);
  const cardLength = cards?.length;
  const [currentPage, setCurrentPage] = useState(1);
  const activeCards = useMemo(() => {
    if (isEditMode) {
      return cards;
    }
    if (cards?.length > 0) {
      return cards.slice(
        (currentPage - 1) * NUMBER_OF_CARDS_PER_PAGE,
        currentPage * NUMBER_OF_CARDS_PER_PAGE
      );
    }
    return [];
  }, [currentPage]);

  const handlePageClickEvents = (page = 1) => {
    if (isEditMode || isPreviewMode) return;

    router.push(
      {
        pathname: router.asPath?.split('?')[0],
        query: { ...router.query, galleryPage: page == 1 ? [] : `${page}`, path: [] },
      },
      undefined,
      { shallow: true }
    );
  };

  useEffect(() => {
    if (!router.isReady) return;
    if (
      !(
        router?.query?.galleryPage &&
        typeof router?.query?.galleryPage == 'string' &&
        parseInt(router?.query?.galleryPage) > 0
      )
    ) {
      setCurrentPage(1);
      return;
    }
    setCurrentPage(parseInt(router?.query?.galleryPage));
  }, [router.isReady, router.query?.galleryPage]);

  if (isEditMode) {
    return (
      <div
        id={uniqueId}
        className={`gallery-container flex w-full border-2 border-blue p-5 ${containerStyles}`}
      >
        <div
          className={`edit-mode grid gap-6 md:grid-cols-2 xl:grid-cols-3 ${gapSize} ${alignment}`}
        >
          <Placeholder key={phKey} name={phKey} rendering={props.rendering} />
        </div>
      </div>
    );
  }

  if (!props.rendering || !props.rendering.placeholders) {
    return null;
  }

  const toalPages = Math.ceil(cardLength / NUMBER_OF_CARDS_PER_PAGE);

  const onPageNumberClick = (page: number) => {
    if (page <= toalPages) {
      setCurrentPage(page);
      handlePageClickEvents(page);
    }
  };

  const onPreviousClick = () => {
    handlePageClickEvents(currentPage - 1);
    setCurrentPage((page) => page - 1);
  };

  const onNextClick = () => {
    handlePageClickEvents(currentPage + 1);
    setCurrentPage((page) => page + 1);
  };

  const getGalleryCard = (card: ComponentRendering) => {
    const galleryCardRendering = { rendering: card } as GalleryCardProps<GalleryCardFields>;
    return <GalleryCard rendering={galleryCardRendering.rendering} />;
  };

  return (
    <div
      id={uniqueId}
      link_component={linkComponent}
      className={`gallery-container flex w-full flex-col flex-wrap p-6 ${containerStyles}`}
    >
      <div className={`flex w-full flex-wrap gap-6 ${gapSize} ${alignment}`}>
        {activeCards.map((card, i) => (
          <div
            className="gallery-card-wrapper min-w-[250px] md:max-w-[calc(50%-12px)] md:basis-[calc(50%-12px)] xl:max-w-[calc((100%-48px)/3)] xl:basis-[calc((100%-48px)/3)]"
            key={'gallerycard-' + i}
          >
            {getGalleryCard(card as ComponentRendering)}
          </div>
        ))}
      </div>
      {cardLength > NUMBER_OF_CARDS_PER_PAGE && (
        <div className="mt-5">
          <GalleryContainerPagination
            currentPage={currentPage}
            totalPages={toalPages}
            onPageNumberClick={onPageNumberClick}
            onPreviousClick={onPreviousClick}
            onNextClick={onNextClick}
          />
        </div>
      )}
    </div>
  );
}
