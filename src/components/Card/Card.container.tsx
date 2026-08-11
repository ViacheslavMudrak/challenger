import { ComponentParams, ComponentRendering, Placeholder } from '@sitecore-content-sdk/nextjs';
import classNames from 'classnames';
import { CardFields, CardProps } from './Card.types';
import Card from './Card';
import CardSeparator from './Card.separator';
import React from 'react';
import { CardInfo1Fields } from './Card.info1';
import { CardInfo4Fields } from './Card.info4';
import { CardInfo8Fields } from './Card.info8';
import { CardInfo9Fields } from './Card.info9';
import { CardInfo10Fields } from './Card.info10';
import { CardInfo13Fields } from './Card.info13';
import { CardInfo14Fields } from './Card.info14';
import { useSitecore } from 'lib/challenger/hooks';
import useHeadScript from 'lib/challenger/useHeadScript';
import { usePathname } from 'next/navigation';

export interface CardContainerProps {
  rendering: ComponentRendering & { params: ComponentParams };
}

const UseHeadScriptHookCaller = ({ id, content }: { id: string; content: string }) => {
  useHeadScript({ id: id, content: content });
  return null;
};

const CardContainer = (props: CardContainerProps) => {
  const { isEditMode } = useSitecore();
  const phKey = `card-container`;
  const containerStyles = props?.rendering?.params?.Styles || '';
  const uniqueId = props?.rendering?.params?.RenderingIdentifier || props.rendering.uid || '';
  const path = usePathname().toLowerCase();

  if (isEditMode) {
    return (
      <div
        className={classNames(
          'card-container',
          'flex w-full border-2 border-blue p-5',
          '[&_>_div]:flex [&_>_div]:justify-center',
          containerStyles
        )}
      >
        <Placeholder key={phKey} name={phKey} rendering={props.rendering} />
      </div>
    );
  }

  const delimiter = ' ';
  const max_cards_per_row = 4;
  const card_component_prefix = 'card';
  let cardsPerRow = (props.rendering.params['CardsPerRow'] || max_cards_per_row) as number;
  const includeSeparator = props.rendering.params['IncludeSeparator'] === '1';
  const items = props.rendering;
  const gapSize = containerStyles.split(delimiter).find((s) => s.startsWith('spacing')) || '';
  const alignment = containerStyles.split(delimiter).find((s) => s.startsWith('position')) || '';

  if (cardsPerRow <= 0) {
    cardsPerRow = max_cards_per_row;
  }

  if (!items || !items.placeholders) {
    return null;
  }

  const cardItems = items.placeholders[phKey].filter((i: ComponentRendering) =>
    (i.componentName || '').toLowerCase().startsWith(card_component_prefix)
  );
  const cardCount = cardItems.length;
  const rowCount = Math.ceil(cardCount / cardsPerRow);

  let cardIdx = 0;

  const renderCardItems = (currentRow: number) => {
    if (cardItems && cardCount > 0) {
      let rowIdx = 1;
      const startIdx = currentRow * cardsPerRow;
      let endIdx = (currentRow + 1) * cardsPerRow;

      if (endIdx > cardItems.length) {
        endIdx = cardItems.length;
      }

      return cardItems.slice(startIdx, endIdx).map((item, idx) => {
        const mappedItem = {
          rendering: item,
        } as CardProps<
          | CardFields
          | CardInfo1Fields
          | CardInfo4Fields
          | CardInfo8Fields
          | CardInfo9Fields
          | CardInfo10Fields
          | CardInfo13Fields
          | CardInfo14Fields
        >;

        cardIdx++;

        const count = idx + 1;

        if (count > rowIdx * cardsPerRow) {
          rowIdx++;
        }

        const showSeparator = count < endIdx && includeSeparator;

        if (cardsPerRow > 1) {
          if (count < cardItems.length && showSeparator && cardIdx < cardItems.length) {
            return (
              <React.Fragment key={idx}>
                <Card rendering={mappedItem.rendering} />
                <CardSeparator />
              </React.Fragment>
            );
          }
        }

        return <Card key={idx} rendering={mappedItem.rendering} />;
      });
    }

    return null;
  };

  const schemaUrl = path.includes('/adviser-resources/technical-resources')
    ? 'https://www.challenger.com.au/adviser/adviser-resources/technical-resources'
    : 'https://www.challenger.com.au/about-us/board-and-leadership';
  const personSchemas = cardItems.map((item) => {
    const person_details = (item as any)?.['fields']; // eslint-disable-line @typescript-eslint/no-explicit-any
    const personId = person_details.FullName?.value
      .toLowerCase()
      .replace('.', '')
      .replace(' ', '-');
    const content = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id':
        schemaUrl +
        '#' +
        person_details.FullName?.value.toLowerCase().replace('.', '').replace(' ', '-'),
      name: person_details.FullName?.value,
      jobTitle: person_details.Role?.value,
      description: person_details.Bio?.value,
      image: person_details.CardImage?.value?.src,
      url: schemaUrl,

      worksFor: {
        '@type': 'Organization',
        name: 'Challenger Limited',
        url: 'https://www.challenger.com.au',
      },
    };
    return { personId, content: content };
  });

  return (
    <div
      id={uniqueId}
      className={classNames(
        'card-container',
        'flex w-full flex-col flex-wrap gap-5 p-5 lg:flex-row',
        { 'border-2 border-blue': isEditMode },
        containerStyles
      )}
    >
      <div className={classNames('card-list', 'flex h-full w-full flex-col', gapSize)}>
        {[...Array(rowCount)].map((_, idx) => {
          return (
            <div
              key={idx}
              className={classNames(
                'card-item',
                'flex w-full flex-wrap !items-stretch lg:flex-nowrap',
                gapSize,
                alignment
              )}
            >
              {renderCardItems(idx)}
              {path.includes('/board-and-leadership') ||
              path.includes('/adviser-resources/technical-resources')
                ? personSchemas.map((schema, idx) => (
                    <UseHeadScriptHookCaller
                      key={idx}
                      id={schema.personId}
                      content={JSON.stringify(schema.content)}
                    />
                  ))
                : ''}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardContainer;
