import { LinkField } from '@sitecore-content-sdk/nextjs';
import { CardType, ShardColorType } from './Card.types';

/**
 * Maps bgColour to Card shard colour
 * @param bgColor string
 * @returns Shard colour
 */
export const getShardColor = (bgColor: string | undefined): ShardColorType => {
  if (bgColor) {
    if (bgColor.toLowerCase() === 'navy') {
      return ShardColorType.Navy;
    }

    if (bgColor.toLowerCase() === 'green') {
      return ShardColorType.Green;
    }

    if (bgColor.toLowerCase() === 'teal') {
      return ShardColorType.Teal;
    }

    if (bgColor.toLowerCase() === 'lightblue') {
      return ShardColorType.LightBlue;
    }
  }

  return ShardColorType.None;
};

export const isValidLink = (link?: LinkField): boolean => {
  if (!link || !link.value) {
    return false;
  }

  const url = link.value.href?.replace('http://', '').replace('https://', '') || '';
  const isValid = url.length > 0;

  return isValid;
};

export const getCardComponentName = (cardType: string): string => {
  const card = cardType as CardType;

  if (card === CardType.Info1) {
    return 'card.info1';
  }

  if (card === CardType.Info2) {
    return 'card.info2';
  }

  if (card === CardType.Info3) {
    return 'card.info3';
  }

  if (card === CardType.Info4) {
    return 'card.info4';
  }

  if (card === CardType.Info5) {
    return 'card.info5';
  }

  if (card === CardType.Info6) {
    return 'card.info6';
  }

  if (card === CardType.Info7) {
    return 'card.info7';
  }

  if (card === CardType.Info8) {
    return 'card.info8';
  }

  if (card === CardType.Info9) {
    return 'card.info9';
  }

  if (card === CardType.Info10) {
    return 'card.info10';
  }

  if (card === CardType.Info11) {
    return 'card.info11';
  }

  if (card === CardType.Info12) {
    return 'card.info12';
  }

  if (card === CardType.Info13) {
    return 'card.info13';
  }

  if (card === CardType.Info14) {
    return 'card.info14';
  }

  return '';
};
