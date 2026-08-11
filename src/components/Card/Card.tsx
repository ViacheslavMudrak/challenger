import { CardFields, CardProps } from './Card.types';
import CardInfo1 from './Card.info1';
import CardInfo2 from './Card.info2';
import CardInfo3 from './Card.info3';
import CardInfo4 from './Card.info4';
import CardInfo5 from './Card.info5';
import CardInfo6 from './Card.info6';
import CardInfo7 from './Card.info7';
import CardInfo8 from './Card.info8';
import CardInfo9 from './Card.info9';
import CardInfo10 from './Card.info10';
import CardInfo11 from './Card.info11';
import CardInfo12 from './Card.info12';
import CardInfo13 from './Card.info13';
import CardInfo14 from './Card.info14';

const Card = (props: CardProps<CardFields>): React.JSX.Element => {
  const cardType = props.rendering.componentName.toLowerCase();

  if (!cardType) {
    return <></>;
  }

  if (cardType === 'card.info1') {
    return <CardInfo1 rendering={props.rendering} />;
  }

  if (cardType === 'card.info2') {
    return <CardInfo2 rendering={props.rendering} />;
  }

  if (cardType === 'card.info3') {
    return <CardInfo3 rendering={props.rendering} />;
  }

  if (cardType === 'card.info4') {
    return <CardInfo4 rendering={props.rendering} />;
  }

  if (cardType === 'card.info5') {
    return <CardInfo5 rendering={props.rendering} />;
  }

  if (cardType === 'card.info6') {
    return <CardInfo6 rendering={props.rendering} />;
  }

  if (cardType === 'card.info7') {
    return <CardInfo7 rendering={props.rendering} />;
  }

  if (cardType === 'card.info8') {
    return <CardInfo8 rendering={props.rendering} />;
  }

  if (cardType === 'card.info9') {
    return <CardInfo9 rendering={props.rendering} />;
  }

  if (cardType === 'card.info10') {
    return <CardInfo10 rendering={props.rendering} />;
  }

  if (cardType === 'card.info11') {
    return <CardInfo11 rendering={props.rendering} />;
  }

  if (cardType === 'card.info12') {
    return <CardInfo12 rendering={props.rendering} />;
  }

  if (cardType === 'card.info13') {
    return <CardInfo13 rendering={props.rendering} />;
  }

  if (cardType === 'card.info14') {
    return <CardInfo14 rendering={props.rendering} />;
  }

  return <></>;
};

export const Default = (props: CardProps<CardFields>) => {
  return <Card {...props} />;
};

export default Card;
