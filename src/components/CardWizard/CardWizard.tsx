import {
  ComponentParams,
  ComponentRendering,
  Field,
  Placeholder,
} from '@sitecore-content-sdk/nextjs';
import { useSitecore } from 'lib/challenger/hooks';
import CardWizardItemMain from './CardWizard.item.main';
import { useEffect, useState } from 'react';
import CardWizardItemChild from './CardWizard.item.child';

export interface CardWizardProps {
  rendering: ComponentRendering & { params: ComponentParams };
}

const CardWizard = (props: CardWizardProps) => {
  const phKey = 'card-wizard-container';
  const { isEditMode } = useSitecore();
  const items = props.rendering;
  const [hash, setHash] = useState<string>();

  useEffect(() => {
    const onHashChanged = () => {
      setHash((window.location.hash || '').replace('#', ''));
    };

    window.addEventListener('hashchange', onHashChanged);

    return () => {
      window.removeEventListener('hashchange', onHashChanged);
    };
  }, []);

  if (isEditMode) {
    return (
      <div className="relative flex w-full flex-col gap-5">
        <Placeholder name={phKey} rendering={props.rendering} />
      </div>
    );
  }

  if (!items || !items.placeholders) {
    return null;
  }

  const cardWizardItems = items.placeholders[phKey].filter((i: ComponentRendering) =>
    (i.componentName || '').startsWith('CardWizard.item')
  );

  const cardWizardItemMain = cardWizardItems.find(
    (c: ComponentRendering) => c.componentName === 'CardWizard.item.main'
  ) as ComponentRendering;

  if (hash) {
    const childItem = cardWizardItems.find(
      (c: ComponentRendering) => (c.fields?.Key as Field<string>)?.value === hash
    ) as ComponentRendering;

    if (childItem.componentName === 'CardWizard.item.child') {
      return <CardWizardItemChild rendering={childItem as never} />;
    }
  }

  if (cardWizardItemMain) {
    return <CardWizardItemMain rendering={cardWizardItemMain as never} />;
  }

  return <div></div>;
};

export default CardWizard;
