type PromotionalCardProps = {
  imageSrc: string;
  imageAlt?: string;
  title: string;
  description: string;
  className?: string;
};

export default function PromotionalCard({
  imageSrc,
  imageAlt = 'Guide preview',
  title,
  description,
  className = 'hidden lg:flex w-80 flex flex-col flex-shrink-0 self-start h-auto min-h-[400px] lg:w-80 lg:min-h-[450px]',
}: PromotionalCardProps) {
  return (
    <div className={className}>
      {/* Image Section with Solid Background */}
      <div
        className="relative"
        style={{
          background: '#00205B',
          clipPath: 'polygon(0 0, 100% 0, 100% 75%, 0% 100%)',
          height: '240px',
        }}
      >
        <img
          src={imageSrc}
          alt={imageAlt}
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            background: '#00205B',
            clipPath: 'polygon(0 0, 100% 0, 100% 75%, 0% 100%)',
          }}
        />
      </div>

      {/* Text Section with Gradient Background */}
      <div
        className="px-8 py-16"
        style={{
          background: 'linear-gradient(to bottom, #00205B, #00629B)',
          marginTop: '-60px',
          clipPath: 'polygon(0 48px, 100% 0, 100% 100%, 0% 88%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}
      >
        <h3 className="font-roboto mb-4 text-xl font-medium text-white">{title}</h3>
        <p className="font-roboto text-sm text-white">{description}</p>
      </div>
    </div>
  );
}
