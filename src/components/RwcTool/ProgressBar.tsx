interface ProgressBarProps {
  currentStep: number;
  percent: number;
  steps: string[];
  onBack: () => void;
}

export default function ProgressBar({ currentStep, percent, steps, onBack }: ProgressBarProps) {
  return (
    <div className="flex w-full flex-col items-center bg-grey-light px-4 drop-shadow-3xl sm:px-6">
      <div className="mx-auto w-full max-w-screen-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between md:gap-4">
          {/* Back Button */}
          <button
            className="group cursor-pointer self-start p-1 sm:self-auto"
            aria-label="Back"
            onClick={onBack}
          >
            <svg
              width="32"
              height="32"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-bright-navy transition-colors duration-200 hover:stroke-blue"
            >
              <path
                d="M4 12h16M8 8l-4 4 4 4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Steps and Progress */}
          <div className="flex flex-1 flex-col sm:flex-row sm:items-center md:gap-4">
            <div className="flex w-full flex-wrap">
              {steps.map((label, index) => {
                const stepNumber = index + 1;
                const isCurrentStep = currentStep === stepNumber;
                // On mobile (< sm), only show current step. On sm+ screens, show all steps (unchanged behavior)
                return (
                  <div
                    key={index}
                    aria-current={isCurrentStep ? 'step' : undefined}
                    className={`flex min-w-[140px] flex-1 flex-col sm:min-w-0 ${
                      isCurrentStep ? '' : 'hidden sm:flex'
                    }`}
                  >
                    <div className="px-2 pt-4 sm:px-4 sm:pt-6">
                      <div className="text-lg font-bold text-bright-navy sm:text-2xl">
                        Step {stepNumber}
                      </div>
                      <div
                        className={`text-sm sm:text-base ${
                          isCurrentStep ? 'font-bold' : 'font-normal'
                        } text-bright-navy`}
                      >
                        {label}
                      </div>
                    </div>
                    {currentStep >= stepNumber && (
                      <div className="mt-2 h-2 w-full bg-challenger-green sm:mt-4" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Percent */}
            <span className="my-2 text-right text-sm text-bright-navy sm:my-0 sm:ml-4 sm:text-base">
              {percent}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
