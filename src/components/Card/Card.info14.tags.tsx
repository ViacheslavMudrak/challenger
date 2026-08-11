import classNames from 'classnames';

export interface CardTagsProps {
  tag1?: string;
  tag2?: string;
  tag3?: string;
  className?: string;
}

const CardInfo14Tags = (props: CardTagsProps): React.JSX.Element => {
  const { tag1, tag2, tag3, className = 'border-blue text-blue' } = props;

  const renderTag = (text?: string) => {
    if (!text || text.length === 0) {
      return;
    }

    return (
      <span
        className={classNames(
          'rounded-sm border px-2 font-roboto-700 text-sm leading-[unset]',
          className
        )}
      >
        {text}
      </span>
    );
  };

  return (
    <>
      {renderTag(tag1)}
      {renderTag(tag2)}
      {renderTag(tag3)}
    </>
  );
};

export default CardInfo14Tags;
