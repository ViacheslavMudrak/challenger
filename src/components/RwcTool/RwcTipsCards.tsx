import React from 'react';
import { TipsCard } from './TipsCard';

// Helper function to create Step2Results TipsCard content
export const getStep2ResultsTipsCards = () => {
  const SuperIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2L2 7L12 12L22 7L12 2Z"
        stroke="#00205B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 17L12 22L22 17"
        stroke="#00205B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 12L12 17L22 12"
        stroke="#00205B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const AgePensionIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19 17H5C3.9 17 3 16.1 3 15V7C3 5.9 3.9 5 5 5H19C20.1 5 21 5.9 21 7V15C21 16.1 20.1 17 19 17Z"
        stroke="#00205B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 21H16"
        stroke="#00205B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 17V21"
        stroke="#00205B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 17V21"
        stroke="#00205B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const MedicalIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22 12H18L15 21L9 3L6 12H2"
        stroke="#00205B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <>
      <TipsCard
        title="The truth about super:"
        items={[
          {
            icon: <SuperIcon />,
            text: 'Your super can run out',
          },
          {
            icon: <SuperIcon />,
            text: 'Super is a foundation to your future, but not a full plan. Smart decisions can help your super grow',
          },
          {
            icon: <SuperIcon />,
            text: 'The value of your super can change depending on market conditions',
          },
        ]}
      />
      <TipsCard
        title="In addition to providing income, the Age Pension comes with great benefits such as:"
        items={[
          {
            icon: <AgePensionIcon />,
            text: 'Discounts on car registration',
          },
          {
            icon: <MedicalIcon />,
            text: 'Medical concessions',
          },
        ]}
      />
    </>
  );
};

// Helper function to create Step3Boost TipsCard content
export const getStep3BoostTipsCard = (result?: unknown | null) => {
  // Extract data from result for dynamic content
  const api =
    result && typeof result === 'object' && Object.keys(result).length > 0
      ? (result as Record<string, unknown>)
      : null;

  const agePensionStatus = api ? String(api.agePensionStatus || '') : '';
  const isEligible = agePensionStatus.toLowerCase().includes('eligible');

  const SuperIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2L2 7L12 12L22 7L12 2Z"
        stroke="#00205B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 17L12 22L22 17"
        stroke="#00205B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 12L12 17L22 12"
        stroke="#00205B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  // Dynamically adjust tips based on Age Pension eligibility
  const tips = [
    {
      icon: <SuperIcon />,
      text: isEligible
        ? 'A lifetime income stream works alongside Age Pension and retirement savings.'
        : 'Including a lifetime income stream as part of your retirement income plan could increase your Age Pension eligibility',
    },
    {
      icon: <SuperIcon />,
      text: 'A lifetime income stream works alongside Age Pension and retirement savings',
    },
    {
      icon: <SuperIcon />,
      text: 'Lifetime income streams can complement account-based pension',
    },
  ];

  return <TipsCard title="Did you know?" withBorder={false} items={tips} />;
};
