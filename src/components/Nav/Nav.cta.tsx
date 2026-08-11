import Button from 'components/Button/Button';
import { ButtonProps, ButtonComponentProps } from 'components/Button/Button.types';

export interface NavCtaProps {
  params: { [key: string]: string };
  fields: CtaList;
}

export type CtaList = {
  items: CtaProps[];
};

export type CtaProps = {
  fields: ButtonProps;
};

const NavCta = (props: NavCtaProps): React.JSX.Element => {
  if (props?.fields?.items?.length > 0) {
    const items = props.fields.items;

    return (
      <div className="flex flex-col gap-4 xl:flex-row xl:gap-2 [&_a]:w-full [&_a]:text-nowrap [&_button]:border-none">
        {items.map((item, idx) => {
          const buttonFields = item.fields as ButtonProps;
          const propsFields = {
            rendering: {
              fields: buttonFields,
              params: {
                FieldNames: 'solid',
              },
            },
          } as unknown as ButtonComponentProps;

          return <Button key={idx} {...propsFields} />;
        })}
      </div>
    );
  }

  return <></>;
};

export default NavCta;
