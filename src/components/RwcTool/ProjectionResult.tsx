import React, { ReactElement } from 'react';
import { formatCurrency } from 'lib/challenger/rwc';

interface ProjectionResultProps {
  durationYears: number;
  incomePerFortnight: string;
  icon?: ReactElement<{ className?: string }>;
}

const ProjectionResult: React.FC<ProjectionResultProps> = ({
  durationYears,
  incomePerFortnight,
  icon,
}) => {
  return (
    <div className="rounded-xs my-6 w-full bg-grey-light p-6">
      <div className="flex items-start gap-4">
        {/* Icon on the left */}
        {icon && (
          <div className="flex h-16 w-16 shrink-0 items-center justify-center">
            {React.cloneElement(icon, {
              className: `w-16 h-16 ${icon.props.className ?? ''}`,
            })}
          </div>
        )}

        {/* Text on the right */}
        <p className="font-roboto-500 text-lg leading-relaxed text-bright-navy">
          We estimate that with a desired income of{' '}
          <strong>${formatCurrency(parseInt(incomePerFortnight))}</strong> per week, your super
          savings could last for{' '}
          <span className="font-roboto-700 text-2xl text-bright-navy">{durationYears} years</span>.
        </p>
      </div>
    </div>
  );
};

export default ProjectionResult;
