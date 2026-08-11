let productSchema;

function getProductSchema(url: string) {
  url = url.toLowerCase();
  if (url.includes('individual')) {
    if (url.includes('lifetime-annuities')) {
      productSchema = {
        '@context': 'https://schema.org',
        '@type': ['Product', 'FinancialProduct'],
        name: 'Challenger Lifetime Annuity (Liquid Lifetime)',
        description:
          "Challenger's Lifetime Annuity (Liquid Lifetime) allows you to receive guaranteed regular income for life from a lump sum investment.",
        url: 'https://www.challenger.com.au/individual/what-we-offer/lifetime-annuities',
        image:
          'https://edge.sitecorecloud.io/challengerg66c7-challengerprod-prod-4c11/media/Project/Challenger/Challenger/Images/Logos/challenger_logo.svg',

        provider: {
          '@type': 'Organization',
          name: 'Challenger Limited',
          url: 'https://www.challenger.com.au/',
        },

        feesAndCommissionsSpecification:
          'View our Product Disclosure Statement (PDS) for all fees and charges associated with the Lifetime Annuity: https://edge.sitecorecloud.io/challengerg66c7-challengerprod-prod-4c11/media/Project/Challenger/Challenger/Documents/PDS/GA-LL-PDS.pdf',

        additionalProperty: [
          {
            '@type': 'PropertyValue',
            name: 'Current Rates',
            value: 'See the latest rates on the Challenger website.',
            url: 'https://www.challenger.com.au/individual/what-we-offer/view-rates',
          },
          {
            '@type': 'PropertyValue',
            name: 'Income Duration',
            value: 'Lifetime',
          },
        ],

        offers: {
          '@type': 'Offer',
          url: 'https://www.challenger.com.au/individual/what-we-offer/lifetime-annuities',
          offeredBy: {
            '@type': 'Organization',
            name: 'Challenger Limited',
          },
          priceCurrency: 'AUD',
          availability: 'https://schema.org/InStock',
          eligibleCustomer: 'https://schema.org/Investor',

          priceSpecification: {
            '@type': 'PriceSpecification',
            name: 'Minimum initial investment',
            minPrice: 10000,
            priceCurrency: 'AUD',
            description:
              'The minimum investment amount required to open the Liquid Lifetime annuity is $10,000 AUD.',
          },
        },
      };
      return productSchema;
    }
    if (url.includes('fixed-term-direct')) {
      productSchema = {
        '@context': 'https://schema.org',
        '@type': ['Product', 'FinancialProduct'],
        name: 'Challenger Guaranteed Annuity (Fixed Term Direct)',
        description:
          "Challenger's Guaranteed Annuity (Fixed Term Direct) offers guaranteed regular income from a lump sum you invest for a fixed investment term you choose of 1 to 5 years.",
        url: 'https://www.challenger.com.au/individual/what-we-offer/fixed-term-direct',
        image:
          'https://edge.sitecorecloud.io/challengerg66c7-challengerprod-prod-4c11/media/Project/Challenger/Challenger/Images/Logos/challenger_logo.svg',

        provider: {
          '@type': 'Organization',
          name: 'Challenger Limited',
          url: 'https://www.challenger.com.au/',
        },

        feesAndCommissionsSpecification:
          'View our Product Disclosure Statement (PDS) for all fees and charges associated with Challenger’s Guaranteed Annuity (Fixed Term Direct): https://edge.sitecorecloud.io/challengerg66c7-challengerprod-prod-4c11/media/Project/Challenger/Challenger/Documents/PDS/GA-Fixed-Term-Direct-PDS.pdf',

        additionalProperty: [
          {
            '@type': 'PropertyValue',
            name: 'Current Rates',
            value: 'See the latest rates on the Challenger website.',
            url: 'https://www.challenger.com.au/individual/what-we-offer/view-rates',
          },
          {
            '@type': 'PropertyValue',
            name: 'Investment term',
            value: '1-5 years',
            minValue: 1,
            maxValue: 5,
            unitText: 'Years',
          },
        ],

        offers: {
          '@type': 'Offer',
          url: 'https://www.challenger.com.au/individual/what-we-offer/fixed-term-direct',
          offeredBy: {
            '@type': 'Organization',
            name: 'Challenger Limited',
          },
          priceCurrency: 'AUD',
          availability: 'https://schema.org/InStock',
          eligibleCustomer: 'https://schema.org/Investor',

          priceSpecification: {
            '@type': 'PriceSpecification',
            name: 'Minimum initial investment',
            minPrice: 10000,
            priceCurrency: 'AUD',
            description:
              'The minimum investment amount required to open the Fixed Term Direct annuity is $10,000 AUD.',
          },
        },
      };
      return productSchema;
    }
    if (url.includes('term-annuities')) {
      productSchema = {
        '@context': 'https://schema.org',
        '@type': ['Product', 'FinancialProduct'],
        name: 'Challenger Guaranteed Annuity (Fixed Term Direct)',
        description:
          "Challenger's Guaranteed Annuity (Fixed Term Direct) offers guaranteed regular income from a lump sum you invest for a fixed investment term you choose of 1 to 5 years.",
        url: 'https://www.challenger.com.au/individual/what-we-offer/term-annuities',
        image:
          'https://edge.sitecorecloud.io/challengerg66c7-challengerprod-prod-4c11/media/Project/Challenger/Challenger/Images/Logos/challenger_logo.svg',

        provider: {
          '@type': 'Organization',
          name: 'Challenger Limited',
          url: 'https://www.challenger.com.au/',
        },

        feesAndCommissionsSpecification:
          'View our Product Disclosure Statement (PDS) for all fees and charges associated with Challenger’s Guaranteed Annuity (Fixed Term Direct): https://edge.sitecorecloud.io/challengerg66c7-challengerprod-prod-4c11/media/Project/Challenger/Challenger/Documents/PDS/GA-Fixed-Term-Direct-PDS.pdf',

        additionalProperty: [
          {
            '@type': 'PropertyValue',
            name: 'Current Rates',
            value: 'See the latest rates on the Challenger website.',
            url: 'https://www.challenger.com.au/individual/what-we-offer/view-rates',
          },
          {
            '@type': 'PropertyValue',
            name: 'Investment term',
            value: '1-5 years',
            minValue: 1,
            maxValue: 5,
            unitText: 'Years',
          },
        ],

        offers: {
          '@type': 'Offer',
          url: 'https://www.challenger.com.au/individual/what-we-offer/term-annuities',
          offeredBy: {
            '@type': 'Organization',
            name: 'Challenger Limited',
          },
          priceCurrency: 'AUD',
          availability: 'https://schema.org/InStock',
          eligibleCustomer: 'https://schema.org/Investor',

          priceSpecification: {
            '@type': 'PriceSpecification',
            name: 'Minimum initial investment',
            minPrice: 10000,
            priceCurrency: 'AUD',
            description:
              'The minimum investment amount required to open the Fixed Term Direct annuity is $10,000 AUD.',
          },
        },
      };
      return productSchema;
    }
    if (url.includes('income-for-aged-care')) {
      productSchema = {
        '@context': 'https://schema.org',
        '@type': ['Product', 'FinancialProduct'],
        name: 'Challenger CarePlus',
        description:
          'Challenger CarePlus provides a fixed monthly payment to help with the ongoing costs of aged care. It’s for people who are receiving or planning to receive government subsidised aged care services. The monthly payments continue for the lifetime of the investor. Upon their death the original amount invested is paid to the nominated beneficiary or estate.',
        url: 'https://www.challenger.com.au/individual/what-we-offer/income-for-aged-care',
        image:
          'https://edge.sitecorecloud.io/challengerg66c7-challengerprod-prod-4c11/media/Project/Challenger/Challenger/Images/Logos/challenger_logo.svg',

        provider: {
          '@type': 'Organization',
          name: 'Challenger Limited',
          url: 'https://www.challenger.com.au/',
        },

        feesAndCommissionsSpecification:
          'View our Product Disclosure Statement (PDS) for all fees and charges associated with CarePlus: https://edge.sitecorecloud.io/challengerg66c7-challengerprod-prod-4c11/media/Project/Challenger/Challenger/Documents/PDS/CarePlus-PDS.pdf',

        additionalProperty: [
          {
            '@type': 'PropertyValue',
            name: 'Current Rates',
            value: 'See the latest rates on the Challenger website.',
            url: 'https://www.challenger.com.au/individual/what-we-offer/view-rates',
          },
        ],

        offers: {
          '@type': 'Offer',
          url: 'https://www.challenger.com.au/individual/what-we-offer/income-for-aged-care',
          offeredBy: {
            '@type': 'Organization',
            name: 'Challenger Limited',
          },
          priceCurrency: 'AUD',
          availability: 'https://schema.org/InStock',
          eligibleCustomer: 'https://schema.org/Investor',

          priceSpecification: {
            '@type': 'PriceSpecification',
            name: 'Minimum initial investment',
            minPrice: 10000,
            priceCurrency: 'AUD',
            description: 'The minimum investment amount required to open CarePlus is $10,000 AUD.',
          },
        },
      };
      return productSchema;
    }
  }

  if (url.includes('adviser')) {
    if (url.includes('lifetime-annuities')) {
      productSchema = {
        '@context': 'https://schema.org',
        '@type': ['Product', 'FinancialProduct'],
        name: 'Challenger Lifetime Annuity (Liquid Lifetime)',
        description:
          "Challenger's Lifetime Annuity (Liquid Lifetime) allows you to receive guaranteed regular income for life from a lump sum investment.",
        url: 'https://www.challenger.com.au/adviser/products/Lifetime-annuities',
        image:
          'https://edge.sitecorecloud.io/challengerg66c7-challengerprod-prod-4c11/media/Project/Challenger/Challenger/Images/Logos/challenger_logo.svg',

        provider: {
          '@type': 'Organization',
          name: 'Challenger Limited',
          url: 'https://www.challenger.com.au/',
        },

        feesAndCommissionsSpecification:
          'View our Product Disclosure Statement (PDS) for all fees and charges associated with the Lifetime Annuity: https://edge.sitecorecloud.io/challengerg66c7-challengerprod-prod-4c11/media/Project/Challenger/Challenger/Documents/PDS/GA-LL-PDS.pdf',

        additionalProperty: [
          {
            '@type': 'PropertyValue',
            name: 'Current Rates',
            value: 'See the latest rates on the Challenger website.',
            url: 'https://www.challenger.com.au/individual/what-we-offer/view-rates',
          },
          {
            '@type': 'PropertyValue',
            name: 'Income Duration',
            value: 'Lifetime',
          },
        ],

        offers: {
          '@type': 'Offer',
          url: 'https://www.challenger.com.au/adviser/products/Lifetime-annuities',
          offeredBy: {
            '@type': 'Organization',
            name: 'Challenger Limited',
          },
          priceCurrency: 'AUD',
          availability: 'https://schema.org/InStock',
          eligibleCustomer: 'https://schema.org/Investor',

          priceSpecification: {
            '@type': 'PriceSpecification',
            name: 'Minimum initial investment',
            minPrice: 10000,
            priceCurrency: 'AUD',
            description:
              'The minimum investment amount required to open the Liquid Lifetime annuity is $10,000 AUD.',
          },
        },
      };
      return productSchema;
    }
    if (url.includes('term-annuities')) {
      productSchema = {
        '@context': 'https://schema.org',
        '@type': ['Product', 'FinancialProduct'],
        name: 'Challenger Guaranteed Annuity (Fixed Term Direct)',
        description:
          "Challenger's Guaranteed Annuity (Fixed Term Direct) offers guaranteed regular income from a lump sum you invest for a fixed investment term you choose of 1 to 5 years.",
        url: 'https://www.challenger.com.au/adviser/products/term-annuities',
        image:
          'https://edge.sitecorecloud.io/challengerg66c7-challengerprod-prod-4c11/media/Project/Challenger/Challenger/Images/Logos/challenger_logo.svg',

        provider: {
          '@type': 'Organization',
          name: 'Challenger Limited',
          url: 'https://www.challenger.com.au/',
        },

        feesAndCommissionsSpecification:
          "View our Product Disclosure Statement (PDS) for all fees and charges associated with Challenger's Guaranteed Annuity (Fixed Term Direct): https://edge.sitecorecloud.io/challengerg66c7-challengerprod-prod-4c11/media/Project/Challenger/Challenger/Documents/PDS/GA-Fixed-Term-Direct-PDS.pdf",

        additionalProperty: [
          {
            '@type': 'PropertyValue',
            name: 'Current Rates',
            value: 'See the latest rates on the Challenger website.',
            url: 'https://www.challenger.com.au/individual/what-we-offer/view-rates',
          },
          {
            '@type': 'PropertyValue',
            name: 'Investment term',
            value: '1-5 years',
            minValue: 1,
            maxValue: 5,
            unitText: 'Years',
          },
        ],

        offers: {
          '@type': 'Offer',
          url: 'https://www.challenger.com.au/adviser/products/term-annuities',
          offeredBy: {
            '@type': 'Organization',
            name: 'Challenger Limited',
          },
          priceCurrency: 'AUD',
          availability: 'https://schema.org/InStock',
          eligibleCustomer: 'https://schema.org/Investor',

          priceSpecification: {
            '@type': 'PriceSpecification',
            name: 'Minimum initial investment',
            minPrice: 10000,
            priceCurrency: 'AUD',
            description:
              'The minimum investment amount required to open the Fixed Term Direct annuity is $10,000 AUD.',
          },
        },
      };
      return productSchema;
    }
    if (url.includes('careplus')) {
      productSchema = {
        '@context': 'https://schema.org',
        '@type': ['Product', 'FinancialProduct'],
        name: 'Challenger CarePlus',
        description:
          'Challenger CarePlus provides a fixed monthly payment to help with the ongoing costs of aged care. It’s for people who are receiving or planning to receive government subsidised aged care services. The monthly payments continue for the lifetime of the investor. Upon their death the original amount invested is paid to the nominated beneficiary or estate.',
        url: 'https://www.challenger.com.au/adviser/products/careplus',
        image:
          'https://edge.sitecorecloud.io/challengerg66c7-challengerprod-prod-4c11/media/Project/Challenger/Challenger/Images/Logos/challenger_logo.svg',

        provider: {
          '@type': 'Organization',
          name: 'Challenger Limited',
          url: 'https://www.challenger.com.au/',
        },

        feesAndCommissionsSpecification:
          'View our Product Disclosure Statement (PDS) for all fees and charges associated with CarePlus: https://edge.sitecorecloud.io/challengerg66c7-challengerprod-prod-4c11/media/Project/Challenger/Challenger/Documents/PDS/CarePlus-PDS.pdf',

        additionalProperty: [
          {
            '@type': 'PropertyValue',
            name: 'Current Rates',
            value: 'See the latest rates on the Challenger website.',
            url: 'https://www.challenger.com.au/individual/what-we-offer/view-rates',
          },
        ],

        offers: {
          '@type': 'Offer',
          url: 'https://www.challenger.com.au/adviser/products/careplus',
          offeredBy: {
            '@type': 'Organization',
            name: 'Challenger Limited',
          },
          priceCurrency: 'AUD',
          availability: 'https://schema.org/InStock',
          eligibleCustomer: 'https://schema.org/Investor',

          priceSpecification: {
            '@type': 'PriceSpecification',
            name: 'Minimum initial investment',
            minPrice: 10000,
            priceCurrency: 'AUD',
            description: 'The minimum investment amount required to open CarePlus is $10,000 AUD.',
          },
        },
      };
      return productSchema;
    }

    if (url.includes('knowledge-hub/economic-updates')) {
      return {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Dr Jonathan Kearns',
        jobTitle: 'Chief Economist and Head of Regulatory Affairs',
        description:
          'He worked for 28 years at the Reserve Bank of Australia, occupying a wide range of senior roles, including Department Head for Domestic Markets Department, Financial Stability Department, Economic Analysis Department and Economic Research Department. He also led the Bank’s work on climate change across four departments. Jonathan also worked at the Bank of International Settlements in Basel and has published research in the fields of international finance and macroeconomics. He has a Ph.D. from Massachusetts Institute of Technology and Bachelor of Economics (Honours) from the Australian National University.',
        image:
          'https://edge.sitecorecloud.io/challengerg66c7-challengerprod-prod-4c11/media/Project/Challenger/Challenger/Images/Headshots/Jonathan-Kearns.jpg',
        url: 'https://www.challenger.com.au/adviser/knowledge-hub/Economic-updates',
        sameAs: ['https://www.linkedin.com/in/jk-econ/'],
        worksFor: {
          '@type': 'Organization',
          name: 'Challenger Limited',
          url: 'https://www.challenger.com.au',
        },
        alumniOf: [
          { '@type': 'EducationalOrganization', name: 'Massachusetts Institute of Technology' },
          { '@type': 'EducationalOrganization', name: 'Australian National University' },
        ],
        hasCredential: {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'degree',
          name: 'PhD Economics',
        },
        knowsAbout: [
          'Economics',
          'Monetary Policy',
          'Financial Stability',
          'Retirement Income',
          'International Finance',
        ],
      };
    }
  }
  return;
}

export default getProductSchema;
