export const SectionHeader = ({
  title,
  icon,
  action,
}: {
  title: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  description?: React.ReactNode;
}) => (
  <div className="mb-8 flex items-center justify-between border-y border-grey py-4">
    <div className="flex items-center gap-2">
      {icon && icon}
      <span className="font-roboto text-3xl font-bold text-bright-navy">{title}</span>
    </div>
    {action}
  </div>
);
