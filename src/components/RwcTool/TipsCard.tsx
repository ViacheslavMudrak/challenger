import React from 'react';

interface TipsCardProps {
  title: string;
  description?: string;
  items: {
    icon: React.ReactNode;
    text: string;
  }[];
  className?: string;
  withBorder?: boolean;
}

export const TipsCard: React.FC<TipsCardProps> = ({
  title,
  items,
  className = '',
  description,
  withBorder = true, // Default to true
}) => {
  return (
    <div className={`rounded-sm p-6 ${withBorder ? 'border border-grey' : ''} ${className}`}>
      {/* Tips Header */}
      <div className="mb-8 flex justify-start">
        <div className="font-roboto flex items-center gap-2 rounded-sm bg-blue px-3 py-2 text-base font-bold text-white">
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 21C9 21.55 9.45 22 10 22H14C14.55 22 15 21.55 15 21V20H9V21Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 2C8.13 2 5 5.13 5 9C5 11.38 6.19 13.47 8 14.74V17C8 17.55 8.45 18 9 18H15C15.55 18 16 17.55 16 17V14.74C17.81 13.47 19 11.38 19 9C19 5.13 15.87 2 12 2Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 12H15"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Tips
        </div>
      </div>
      <div className="mb-7.5">
        <h3 className="font-roboto text-left text-xl font-medium text-bright-navy">{title}</h3>
        {description && (
          <p className="font-roboto mt-2 text-left text-xs text-bright-navy">{description}</p>
        )}
      </div>

      {/* Items List */}
      <div className="space-y-0">
        {items.map((item, index) => (
          <div key={index}>
            <div className="flex items-center gap-3 py-3">
              <div className="flex h-6 w-6 flex-shrink-0 items-start justify-center">
                {item.icon}
              </div>
              <p className="font-roboto text-sm leading-relaxed text-bright-navy">{item.text}.</p>
            </div>
            {index < items.length - 1 && <div className="border-t border-grey"></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TipsCard;
