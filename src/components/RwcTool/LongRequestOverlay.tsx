type LongRequestOverlayProps = {
  visible: boolean;
  title?: string;
  description?: string;
};

const LongRequestOverlay = ({
  visible,
  title = 'Still working on your results',
  description = 'This is taking longer than usual. We are retrying in the background.',
}: LongRequestOverlayProps) => {
  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bright-navy/35 px-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-white/60 bg-white p-6 shadow-2xl sm:p-8">
        <div className="flex items-start gap-4">
          <div
            className="mt-1 h-8 w-8 animate-spin rounded-full border-2 border-bright-teal border-t-transparent"
            aria-hidden="true"
          />
          <div>
            <h2 className="font-roboto text-xl font-bold text-bright-navy sm:text-2xl">{title}</h2>
            <p className="font-roboto mt-2 text-sm text-black/80 sm:text-base">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LongRequestOverlay;
