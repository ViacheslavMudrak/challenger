const jssConfig = require('./src/temp/config');
const plugins = require('./src/temp/next-config-plugins') || {};
const withImages = require('next-images');

const publicUrl = jssConfig.publicUrl;

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // Set assetPrefix to our public URL
  assetPrefix: publicUrl,

  // Allow specifying a distinct distDir when concurrently running app in a container
  distDir: process.env.NEXTJS_DIST_DIR || '.next',

  // Make the same PUBLIC_URL available as an environment variable on the client bundle
  env: {
    PUBLIC_URL: publicUrl,
  },

  i18n: {
    // These are all the locales you want to support in your application.
    // These should generally match (or at least be a subset of) those in Sitecore.
    locales: ['en'],
    // This is the locale that will be used when visiting a non-locale
    // prefixed path e.g. `/styleguide`.
    defaultLocale: jssConfig.defaultLanguage,
  },

  // Enable React Strict Mode
  reactStrictMode: true,

  // use this configuration to ensure that only images from the whitelisted domains
  // can be served from the Next.js Image Optimization API
  // see https://nextjs.org/docs/app/api-reference/components/image#remotepatterns
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'edge*.**',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'feaas*.blob.core.windows.net',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'xmc-challenger*.sitecorecloud.io',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'sit2-challenger.vercel.app',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'sit1.challenger.vercel.app',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
      },
    ],
  },

  async rewrites() {
    // When in connected mode we want to proxy Sitecore paths off to Sitecore
    return [
      // API endpoints
      {
        source: '/sitecore/api/:path*',
        destination: `${jssConfig.sitecoreApiHost}/sitecore/api/:path*`,
      },
      // media items
      {
        source: '/-/:path*',
        destination: `${jssConfig.sitecoreMediaHost}/-/:path*`,
      },
      // healthz check
      {
        source: '/healthz',
        destination: '/api/healthz',
      },
      // rewrite for Sitecore service pages
      {
        source: '/sitecore/service/:path*',
        destination: `${jssConfig.sitecoreApiHost}/sitecore/service/:path*`,
      },
    ];
  },

  webpack(config) {
    config.module.rules.push({ test: /\.svg$/i, issuer: /\.[jt]sx?$/, use: ['@svgr/webpack'] });
    config.resolve.alias['ordercloud-javascript-sdk'] = false;
    return config;
  },

  async redirects() {
    return [
      {
        source: '/about-us/careers/2019-equileap-global-gender-equality',
        destination: '/about-us/careers',
        permanent: true,
      },
      {
        source: '/about-us/board-of-directors',
        destination: '/about-us/board-and-leadership',
        permanent: true,
      },
      { source: '/about-us/careers/culture', destination: '/about-us/careers', permanent: true },
      { source: '/about-us/careers/culture/', destination: '/about-us/careers', permanent: true },
      {
        source: '/about-us/careers/finsoc-mentoring-breakfast',
        destination: '/about-us/careers',
        permanent: true,
      },
      { source: '/about-us/careers/grow', destination: '/about-us/careers', permanent: true },
      {
        source: '/about-us/careers/join-our-team',
        destination: '/about-us/careers',
        permanent: true,
      },
      { source: '/about-us/challenger-group', destination: '/about-us', permanent: true },
      {
        source: '/about-us/contact-us/australian-offices',
        destination: '/about-us/contact-us',
        permanent: true,
      },
      {
        source: '/about-us/contact-us/complaints-form',
        destination: '/about-us/contact-us/Resolving-complaints',
        permanent: true,
      },
      {
        source: '/about-us/contact-us/enquiry-form',
        destination: '/about-us/contact-us',
        permanent: true,
      },
      {
        source: '/about-us/contact-us/international-offices',
        destination: '/about-us/contact-us',
        permanent: true,
      },
      {
        source: '/about-us/contact-us/my-epost',
        destination: '/individual/help-and-support/How-do-I/my-epost',
        permanent: true,
      },
      {
        source: '/about-us/contact-us/resolving-complaints',
        destination: '/about-us/contact-us',
        permanent: true,
      },
      {
        source: '/about-us/leadership-team',
        destination: '/about-us/board-and-leadership',
        permanent: true,
      },
      {
        source: '/about-us/media-centre',
        destination: '/about-us/media-releases',
        permanent: true,
      },
      {
        source: '/about-us/media-centre/challengers-response-to-novel-coronavirus',
        destination: '/about-us/media-releases',
        permanent: true,
      },
      {
        source: '/about-us/media-centre/community-partnership-update',
        destination: '/about-us/media-releases',
        permanent: true,
      },
      {
        source: '/about-us/media-centre/faqs-on-challenger-and-the-changing-market',
        destination: '/about-us/media-releases',
        permanent: true,
      },
      {
        source: '/about-us/media-centre/media-releases',
        destination: '/about-us/media-releases',
        permanent: true,
      },
      {
        source:
          '/about-us/media-centre/media-releases/challenger-reaches-new-audiences-with-the-sydney-film-festival',
        destination: '/about-us/media-releases',
        permanent: true,
      },
      {
        source:
          '/about-us/media-centre/media-releases/challengers-blooming-partnership-with-the-melbourne-international-flower-and-garden-show',
        destination: '/about-us/media-releases',
        permanent: true,
      },
      {
        source:
          '/about-us/media-centre/media-releases/inflation-and-cost-of-living-growing-focus-for-australian-retirees',
        destination: '/about-us/media-releases',
        permanent: true,
      },
      {
        source:
          '/about-us/media-centre/media-releases/more-than-a-nest-egg-challengers-index-reveals-drivers-of-retirement-happiness',
        destination: '/about-us/media-releases',
        permanent: true,
      },
      {
        source: '/about-us/media-centre/media-releases/register-for-media-releases',
        destination: '/about-us/media-releases',
        permanent: true,
      },
      {
        source:
          '/about-us/media-centre/media-releases/retirees-want-an-additional-145-billion-of-guaranteed-income',
        destination: '/about-us/media-releases',
        permanent: true,
      },
      {
        source: '/about-us/media-centre/media-releases/savvy-seniors-seek-advice',
        destination: '/about-us/media-releases',
        permanent: true,
      },
      {
        source: '/about-us/media-centre/online-origination',
        destination: '/about-us/media-releases',
        permanent: true,
      },
      {
        source: '/about-us/media-centre/retirement-income-research',
        destination: '/individual/learn',
        permanent: true,
      },
      {
        source:
          '/about-us/media-centre/retirement-income-research/alarmingly-low-numbers-financially-plan-for-aged-care',
        destination: '/individual/learn',
        permanent: true,
      },
      {
        source:
          '/about-us/media-centre/retirement-income-research/australias-productivity-challenge',
        destination: '/individual/learn',
        permanent: true,
      },
      {
        source:
          '/about-us/media-centre/retirement-income-research/five-things-you-didnt-know-about-annuities',
        destination: '/about-us/media-releases',
        permanent: true,
      },
      {
        source:
          '/about-us/media-centre/retirement-income-research/how-bad-are-recessions-for-asset-returns',
        destination: '/adviser/knowledge-hub/articles/how-bad-are-recessions-for-asset-returns',
        permanent: true,
      },
      {
        source: '/about-us/media-centre/retirement-income-research/how-likely-is-a-recession',
        destination: '/about-us/media-releases',
        permanent: true,
      },
      {
        source:
          '/about-us/media-centre/retirement-income-research/inflation-expectations-alert-but-not-yet-alarmed',
        destination: '/adviser/knowledge-hub/articles/inflation-expectations',
        permanent: true,
      },
      {
        source:
          '/about-us/media-centre/retirement-income-research/inflation-risks-and-retirement-income-innovations',
        destination: '/about-us/media-releases',
        permanent: true,
      },
      {
        source:
          '/about-us/media-centre/retirement-income-research/is-inflation-higher-for-some-households',
        destination: '/individual/learn/articles/is-inflation-higher-for-some-households',
        permanent: true,
      },
      {
        source:
          '/about-us/media-centre/retirement-income-research/link-between-inflation-and-interest-rates',
        destination:
          '/individual/learn/articles/Is-the-link-between-inflation-and-interest-rates-as-straightforward-as-it-seems',
        permanent: true,
      },
      {
        source:
          '/about-us/media-centre/retirement-income-research/macro-musing-federal-budget-2024-to-25',
        destination: '/adviser/knowledge-hub/articles/Macro-Musing-Federal-Budget-2024-25',
        permanent: true,
      },
      {
        source:
          '/about-us/media-centre/retirement-income-research/protecting-retirement-income-from-inflation',
        destination: '/adviser/knowledge-hub/articles/Protecting-retirement-income-from-inflation',
        permanent: true,
      },
      {
        source:
          '/about-us/media-centre/retirement-income-research/retirement-phase-of-superannuation',
        destination: '/individual/learn/articles/retirement-phase-of-superannuation',
        permanent: true,
      },
      {
        source:
          '/about-us/media-centre/retirement-income-research/the-changing-goals-in-retirement',
        destination: '/individual/learn/articles/The-changing-goals-in-retirement',
        permanent: true,
      },
      {
        source:
          '/about-us/media-centre/retirement-income-research/the-cost-of-living-and-older-australians-financial-wellbeing',
        destination: '/about-us/media-releases',
        permanent: true,
      },
      {
        source: '/about-us/media-centre/retirement-income-research/the-outlook-for-oil',
        destination: '/adviser/knowledge-hub/articles/the-outlook-for-oil',
        permanent: true,
      },
      {
        source:
          '/about-us/media-centre/retirement-income-research/what-does-it-mean-to-retire-in-the-21st-century',
        destination: '/about-us/media-releases',
        permanent: true,
      },
      {
        source: '/about-us/media-centre/what-does-the-covid-19-stimulus-mean-for-you',
        destination: '/about-us/media-releases',
        permanent: true,
      },
      {
        source: '/about-us/sustainability/taxation-strategy',
        destination: '/about-us/sustainability/corporate-governance',
        permanent: true,
      },
      {
        source: '/adviser',
        has: [
          {
            type: 'query',
            key: 'pid',
            value: 'da_br_a_3yrfta_833BDMcontactfta_df_',
          },
        ],
        destination: '/adviser',
        permanent: true,
      },
      {
        source: '/adviser/adviser-resources/case-studies',
        destination: '/adviser/How-we-can-help/Client-scenarios',
        permanent: true,
      },
      {
        source:
          '/adviser/adviser-resources/content-to-use-with-your-clients/client-friendly-retirement-income-content',
        destination: '/adviser/adviser-resources/content-to-use-with-your-clients',
        permanent: true,
      },
      {
        source:
          '/adviser/adviser-resources/content-to-use-with-your-clients/client-friendly-retirement-income-content/four-quick-wins-to-take-you-client-reviews-to-the-next-level',
        destination: '/adviser/adviser-resources/content-to-use-with-your-clients',
        permanent: true,
      },
      {
        source:
          '/adviser/adviser-resources/content-to-use-with-your-clients/white-label-aged-care-content',
        destination: '/adviser/adviser-resources/content-to-use-with-your-clients',
        permanent: true,
      },
      {
        source:
          '/adviser/adviser-resources/content-to-use-with-your-clients/white-label-aged-care-content/aged-care-and-the-role-of-advice',
        destination: '/adviser/adviser-resources/content-to-use-with-your-clients',
        permanent: true,
      },
      {
        source:
          '/adviser/adviser-resources/content-to-use-with-your-clients/white-label-retirement-income-content',
        destination: '/adviser/adviser-resources/content-to-use-with-your-clients',
        permanent: true,
      },
      {
        source: '/adviser/adviser-resources/forms',
        destination: '/adviser/adviser-resources/forms-pds-tmd',
        permanent: true,
      },
      {
        source: '/adviser/adviser-resources/how-to-use-an-annuity',
        destination: '/adviser/knowledge-hub',
        permanent: true,
      },
      {
        source: '/adviser/adviser-resources/how-to-use-an-annuity/annuities-in-later-retirement',
        destination: '/adviser/adviser-resources',
        permanent: true,
      },
      {
        source:
          '/adviser/adviser-resources/how-to-use-an-annuity/annuities-in-later-retirement/aged-care-and-the-role-of-advice',
        destination: '/adviser/adviser-resources',
        permanent: true,
      },
      {
        source: '/adviser/adviser-resources/how-to-use-an-annuity/annuities-in-retirement',
        destination: '/adviser/adviser-resources',
        permanent: true,
      },
      {
        source:
          '/adviser/adviser-resources/how-to-use-an-annuity/annuities-in-retirement/how-lifetime-annuities-have-changed',
        destination: '/adviser/adviser-resources',
        permanent: true,
      },
      {
        source:
          '/adviser/adviser-resources/how-to-use-an-annuity/annuities-in-retirement/sequencing-risk-explained',
        destination: '/adviser/knowledge-hub/Articles/sequencing-risk-explained',
        permanent: true,
      },
      {
        source:
          '/adviser/adviser-resources/how-to-use-an-annuity/annuities-in-retirement/timing-matters-in-retirement',
        destination: '/adviser/adviser-resources',
        permanent: true,
      },
      {
        source: '/adviser/adviser-resources/retirement-income-and-aged-care-strategies',
        destination: '/adviser/How-we-can-help',
        permanent: true,
      },
      {
        source:
          '/adviser/adviser-resources/retirement-income-and-aged-care-strategies/aged-care-strategies',
        destination: '/adviser/How-we-can-help/Aged-care-planning',
        permanent: true,
      },
      {
        source:
          '/adviser/adviser-resources/retirement-income-and-aged-care-strategies/retirement-income-strategies',
        destination: '/adviser/How-we-can-help',
        permanent: true,
      },
      {
        source: '/adviser/adviser-resources/tools',
        destination: '/adviser/Adviser-resources/Tools-and-calculators',
        permanent: true,
      },
      {
        source: '/adviser/adviser-resources/webinars',
        destination: '/adviser/knowledge-hub/webinars',
        permanent: true,
      },
      {
        source: '/adviser/campaigns/inflation-protection',
        destination: '/adviser',
        permanent: true,
      },
      {
        source: '/adviser/campaigns/portfolio-outcomes',
        has: [
          {
            type: 'query',
            key: 'pid',
            value: 'iw_pr_a_TPO_1275TPOCPWAdviser_df_',
          },
        ],
        destination: '/adviser/campaigns/portfolio-outcomes',
        permanent: true,
      },
      {
        source: '/adviser/campaigns/portfolio-outcomes/contact-a-bdm',
        destination: '/adviser/campaigns/portfolio-outcomes',
        permanent: true,
      },
      {
        source:
          '/adviser/campaigns/portfolio-outcomes/the-role-of-financial-security-in-retiree-happiness',
        destination: '/adviser/campaigns/portfolio-outcomes',
        permanent: true,
      },
      {
        source: '/adviser/products/design-and-distribution-obligations',
        destination: '/adviser/products/other-products/design-and-distribution-obligations',
        permanent: true,
      },
      {
        source: '/adviser/products/fixed-term-annuities',
        destination: '/adviser/products/Term-annuities',
        permanent: true,
      },
      {
        source: '/adviser/products/guaranteed-allocated-pension',
        destination: '/adviser/products/Other-products',
        permanent: true,
      },
      {
        source: '/adviser/products/guaranteed-income-fund',
        destination: '/adviser/products/managed-investments/guaranteed-income-fund',
        permanent: true,
      },
      {
        source: '/adviser/products/guaranteed-income-fund/guaranteed-income-fund-classes-available',
        destination: '/adviser/products/managed-investments/guaranteed-income-fund',
        permanent: true,
      },
      {
        source:
          '/adviser/products/guaranteed-income-fund/guaranteed-income-fund-continuous-disclosure',
        destination: '/adviser/products/managed-investments/guaranteed-income-fund',
        permanent: true,
      },
      {
        source:
          '/adviser/products/guaranteed-pension-fund/guaranteed-pension-fund-continuous-disclosure',
        destination: '/adviser/products/Other-products',
        permanent: true,
      },
      {
        source: '/adviser/products/guaranteed-personal-superannuation',
        destination: '/adviser/products/Other-products',
        permanent: true,
      },
      {
        source: '/adviser/products/lifetime-annuities/deferred-payments',
        destination: '/adviser/products/Lifetime-annuities',
        permanent: true,
      },
      {
        source: '/adviser/products/lifetime-annuities/immediate-payments',
        destination: '/adviser/products/Lifetime-annuities',
        permanent: true,
      },
      {
        source: '/adviser/products/lifetime-annuities/market-linked-payments',
        destination: '/adviser/products/Lifetime-annuities',
        permanent: true,
      },
      {
        source: '/adviser/products/stronger-super-disclosures',
        destination: '/adviser/products/other-products/stronger-super-disclosures',
        permanent: true,
      },
      {
        source: '/adviser/why-challenger',
        destination: '/adviser/How-we-can-help/Why-Challenger',
        permanent: true,
      },
      {
        source: '/adviser/why-challenger/history',
        destination: '/adviser/How-we-can-help/Why-Challenger',
        permanent: true,
      },
      {
        source: '/adviser/why-challenger/product-availability',
        destination: '/adviser/products/Product-availability',
        permanent: true,
      },
      {
        source: '/AnnualReview2018/',
        destination: '/about-us/shareholder-centre/financial-information',
        permanent: true,
      },
      {
        source: '/annualreview2019/',
        destination: '/about-us/shareholder-centre/financial-information',
        permanent: true,
      },
      {
        source: '/AnnualReview2020/',
        destination: '/about-us/shareholder-centre/financial-information',
        permanent: true,
      },
      {
        source: '/AnnualReview2020/bod.html',
        destination: '/about-us/shareholder-centre/financial-information',
        permanent: true,
      },
      {
        source: '/AnnualReview2020/chair-ceo-report.html',
        destination: '/about-us/shareholder-centre/financial-information',
        permanent: true,
      },
      {
        source: '/AnnualReview2020/funds-management.html',
        destination: '/about-us/shareholder-centre/financial-information',
        permanent: true,
      },
      {
        source: '/AnnualReview2020/highlights.html',
        destination: '/about-us/shareholder-centre/financial-information',
        permanent: true,
      },
      {
        source: '/AnnualReview2020/increase-the-use-of-secure-retirement-income-streams.html',
        destination: '/about-us/shareholder-centre/financial-information',
        permanent: true,
      },
      {
        source: '/AnnualReview2020/index.html',
        destination: '/about-us/shareholder-centre/financial-information',
        permanent: true,
      },
      {
        source:
          '/AnnualReview2020/lead-the-retirement-income-market-&-be-the-partner-of-choice.html',
        destination: '/about-us/shareholder-centre/financial-information',
        permanent: true,
      },
      {
        source: '/AnnualReview2020/leadership.html',
        destination: '/about-us/shareholder-centre/financial-information',
        permanent: true,
      },
      {
        source: '/AnnualReview2020/life-business.html',
        destination: '/about-us/shareholder-centre/financial-information',
        permanent: true,
      },
      {
        source: '/AnnualReview2020/maintain-leading-operational-people-practices.html',
        destination: '/about-us/shareholder-centre/financial-information',
        permanent: true,
      },
      {
        source: '/AnnualReview2020/our-businesses.html',
        destination: '/about-us/shareholder-centre/financial-information',
        permanent: true,
      },
      {
        source: '/AnnualReview2020/our-history.html',
        destination: '/about-us/shareholder-centre/financial-information',
        permanent: true,
      },
      {
        source: '/AnnualReview2020/our-vision-and-strategy.html',
        destination: '/about-us/shareholder-centre/financial-information',
        permanent: true,
      },
      {
        source: '/AnnualReview2020/progress-on-our-sustainability.html',
        destination: '/about-us/shareholder-centre/financial-information',
        permanent: true,
      },
      {
        source:
          '/AnnualReview2020/provide-our-customers-with-excellent-funds-management-solutions.html',
        destination: '/about-us/shareholder-centre/financial-information',
        permanent: true,
      },
      {
        source: '/AnnualReview2020/what-matters-most.html',
        destination: '/about-us/shareholder-centre/financial-information',
        permanent: true,
      },
      {
        source: '/annualreview2021',
        destination: '/about-us/shareholder-centre/financial-information',
        permanent: true,
      },
      {
        source: '/annualreview2021/',
        destination: '/about-us/shareholder-centre/financial-information',
        permanent: true,
      },
      {
        source: '/annualreview2021/2021-highlights',
        destination: '/about-us/shareholder-centre/financial-information',
        permanent: true,
      },
      {
        source: '/annualreview2021/2021-highlights/financial-highlights',
        destination: '/about-us/shareholder-centre/financial-information',
        permanent: true,
      },
      {
        source: '/annualreview2021/2021-highlights/operational-highlights',
        destination: '/about-us/shareholder-centre/financial-information',
        permanent: true,
      },
      {
        source: '/annualreview2021/about-challenger',
        destination: '/about-us/shareholder-centre/financial-information',
        permanent: true,
      },
      {
        source: '/annualreview2021/about-challenger/our-businesses',
        destination: '/about-us/shareholder-centre/financial-information',
        permanent: true,
      },
      {
        source: '/annualreview2021/about-challenger/our-history-timeline',
        destination: '/about-us/shareholder-centre/financial-information',
        permanent: true,
      },
      {
        source: '/annualreview2021/about-challenger/our-vision-and-strategy',
        destination: '/about-us/shareholder-centre/financial-information',
        permanent: true,
      },
      {
        source: '/annualreview2021/board-leadership-team',
        destination: '/about-us/shareholder-centre/financial-information',
        permanent: true,
      },
      {
        source: '/annualreview2021/board-leadership-team/board-of-directors',
        destination: '/about-us/shareholder-centre/financial-information',
        permanent: true,
      },
      {
        source: '/annualreview2021/board-leadership-team/leadership-team',
        destination: '/about-us/shareholder-centre/financial-information',
        permanent: true,
      },
      {
        source: '/annualreview2021/chair-ceo-report',
        destination: '/about-us/shareholder-centre/financial-information',
        permanent: true,
      },
      {
        source: '/annualreview2021/downloads',
        destination: '/about-us/shareholder-centre/financial-information',
        permanent: true,
      },
      {
        source: '/annualreview2021/sustainability',
        destination: '/about-us/shareholder-centre/financial-information',
        permanent: true,
      },
      {
        source: '/annualreview2021/sustainability/our-community-partnership',
        destination: '/about-us/shareholder-centre/financial-information',
        permanent: true,
      },
      {
        source: '/annualreview2021/sustainability/our-sustainability-strategy',
        destination: '/about-us/shareholder-centre/financial-information',
        permanent: true,
      },
      {
        source: '/annualreview2021/sustainability/what-matters-most',
        destination: '/about-us/shareholder-centre/financial-information',
        permanent: true,
      },
      {
        source: '/institutional/challengers-group-annuity',
        destination: '/institutional/Retirement-solutions',
        permanent: true,
      },
      {
        source: '/institutional/income-solutions',
        destination: '/institutional/Retirement-solutions',
        permanent: true,
      },
      { source: '/institutional/insights', destination: '/institutional', permanent: true },
      {
        source: '/institutional/insights/a-pathway-for-fund-members-to-follow-into-retirement',
        destination: '/institutional',
        permanent: true,
      },
      {
        source:
          '/institutional/insights/a-pathway-to-designing-an-intelligent-and-scalable-retirement-income-solution',
        destination:
          '/institutional/Articles/a-pathway-to-designing-an-intelligent-and-scalable-retirement-income-solution',
        permanent: true,
      },
      {
        source: '/institutional/insights/a-solutions-framework-for-generating-alpha',
        destination: '/institutional',
        permanent: true,
      },
      {
        source:
          '/institutional/insights/ausbiz-interview-with-challenger-head-of-solutions-josh-heller',
        destination: '/institutional',
        permanent: true,
      },
      {
        source: '/institutional/insights/balancing-retirement-income-risks',
        destination: '/institutional',
        permanent: true,
      },
      {
        source: '/institutional/insights/bridging-the-retirement-advice-gap',
        destination: '/institutional',
        permanent: true,
      },
      {
        source: '/institutional/insights/capital-preferences-roundtable-outcomes',
        destination: '/institutional/articles/capital-preferences-roundtable-outcomes',
        permanent: true,
      },
      {
        source: '/institutional/insights/carry-makes-a-comeback',
        destination: '/institutional',
        permanent: true,
      },
      {
        source:
          '/institutional/insights/celebrating-the-first-anniversary-of-the-liquid-alternatives-balanced-fund',
        destination: '/institutional',
        permanent: true,
      },
      {
        source:
          '/institutional/insights/celebrating-two-years-of-strong-performance-of-the-spectrum-systematic-alpha-fund',
        destination: '/institutional',
        permanent: true,
      },
      {
        source: '/institutional/insights/defined-benefit-derisking',
        destination: '/institutional/articles/defined-benefit-de-risking',
        permanent: true,
      },
      {
        source:
          '/institutional/insights/delivering-high-quality-alternatives-to-traditional-active-management',
        destination: '/institutional',
        permanent: true,
      },
      {
        source:
          '/institutional/insights/designing-a-simple-path-to-achieving-retirement-income-objectives',
        destination: '/institutional',
        permanent: true,
      },
      {
        source: '/institutional/insights/financial-wellbeing-and-rising-costs-of-living',
        destination: '/institutional/articles/financial-wellbeing-and-rising-costs-of-living',
        permanent: true,
      },
      {
        source: '/institutional/insights/fundamentals-of-alternatives-investing-interview',
        destination: '/institutional',
        permanent: true,
      },
      {
        source: '/institutional/insights/giving-members-the-best-outcomes',
        destination: '/institutional/articles/giving-members-the-best-outcomes',
        permanent: true,
      },
      {
        source: '/institutional/insights/guided-choice',
        destination: '/institutional',
        permanent: true,
      },
      {
        source:
          '/institutional/insights/incorporating-liquid-alternatives-allocations-into-superfund-portfolios',
        destination: '/institutional',
        permanent: true,
      },
      {
        source: '/institutional/insights/liability-management-of-defined-benefit-funds',
        destination: '/institutional',
        permanent: true,
      },
      {
        source: '/institutional/insights/maximising-retirement-income',
        destination: '/institutional/articles/maximising-retirement-income',
        permanent: true,
      },
      {
        source:
          '/institutional/insights/mind-the-gap-hedging-tails-to-provide-liquidity-in-times-of-stress',
        destination: '/institutional',
        permanent: true,
      },
      {
        source: '/institutional/insights/once-bitten-twice-shy',
        destination: '/institutional',
        permanent: true,
      },
      {
        source: '/institutional/insights/protecting-retirement-income-from-inflation',
        destination: '/institutional/Articles/Protecting-retirement-income-from-inflation',
        permanent: true,
      },
      {
        source: '/institutional/insights/reducing-the-portfolio-carbon-footprint',
        destination: '/institutional',
        permanent: true,
      },
      {
        source:
          '/institutional/insights/retirees-still-need-help-to-navigate-spending-in-retirement',
        destination: '/institutional',
        permanent: true,
      },
      {
        source: '/institutional/insights/retirement-is-coming',
        destination: '/institutional',
        permanent: true,
      },
      {
        source: '/institutional/insights/retirement-really-is-different',
        destination: '/institutional',
        permanent: true,
      },
      {
        source: '/institutional/insights/super-is-delivering-for-people-about-to-retire',
        destination: '/institutional',
        permanent: true,
      },
      {
        source:
          '/institutional/insights/the-decumulation-puzzle-how-to-give-retirees-the-confidence-to-spend',
        destination: '/institutional',
        permanent: true,
      },
      {
        source: '/institutional/insights/the-purpose-of-savings',
        destination: '/institutional',
        permanent: true,
      },
      {
        source: '/institutional/insights/thinking-alternatively',
        destination: '/institutional/Articles/thinking-alternatively-part-one',
        permanent: true,
      },
      {
        source: '/institutional/insights/thinking-alternatively-part-four',
        destination: '/institutional/Articles/thinking-alternatively-part-four',
        permanent: true,
      },
      {
        source: '/institutional/insights/thinking-alternatively-part-three',
        destination: '/institutional/Articles/thinking-alternatively-part-three',
        permanent: true,
      },
      {
        source: '/institutional/insights/thinking-alternatively-part-two',
        destination: '/institutional/Articles/thinking-alternatively-part-two',
        permanent: true,
      },
      {
        source: '/institutional/insights/what-next-for-inflation-protection-strategies',
        destination: '/institutional',
        permanent: true,
      },
      {
        source: '/institutional/investments',
        destination: '/institutional/investment-solutions',
        permanent: true,
      },
      {
        source: '/institutional/investments/challenger-index-plus',
        destination: '/institutional/Investment-solutions/Index-Plus',
        permanent: true,
      },
      {
        source: '/institutional/investments/challenger-solutions-spectrum-systematic-alpha-fund',
        destination: '/institutional/Investment-solutions/spectrum-fund',
        permanent: true,
      },
      {
        source: '/institutional/investments/institutional-mandates',
        destination: '/institutional',
        permanent: true,
      },
      { source: '/institutional/subscribe', destination: '/institutional', permanent: true },
      { source: '/personal', destination: '/individual', permanent: true },
      {
        source: '/personal/aged-care',
        destination: '/individual/interested-in/planning-for-aged-care',
        permanent: true,
      },
      {
        source: '/personal/aged-care/aged-care-essentials',
        destination: '/individual/interested-in/planning-for-aged-care',
        permanent: true,
      },
      {
        source: '/personal/aged-care/aged-care-faqs',
        destination:
          '/individual/help-and-support/frequently-asked-questions#Questionsaboutagedcarecosts',
        permanent: true,
      },
      {
        source: '/personal/crisl-retirement-income-strategy',
        destination: '/individual/what-we-offer/other-products/challenger-retirement-fund',
        permanent: true,
      },
      {
        source: '/personal/customer-resources-and-help',
        destination: '/individual/help-and-support',
        permanent: true,
      },
      {
        source: '/personal/customer-resources-and-help',
        has: [
          {
            type: 'query',
            key: 'pid',
            value: 'cc_br_c_AS_810ASLP_df_',
          },
        ],
        destination: '/individual/help-and-support',
        permanent: true,
      },
      {
        source: '/personal/happiness-index',
        destination: '/individual/campaigns/happiness-index',
        permanent: true,
      },
      {
        source: '/personal/happiness-index',
        has: [
          {
            type: 'query',
            key: 'cid',
            value: 'ie_br_c_Happy_1303HappinessPR_df_',
          },
        ],
        destination: '/individual/campaigns/happiness-index',
        permanent: true,
      },
      { source: '/personal/products', destination: '/individual/what-we-offer', permanent: true },
      {
        source: '/personal/products/careplus',
        destination: '/individual/what-we-offer/income-for-aged-care',
        permanent: true,
      },
      {
        source: '/personal/products/careplus/careplus-payment-rates',
        destination: '/individual/what-we-offer/income-for-aged-care',
        permanent: true,
      },
      {
        source: '/personal/products/closed-products',
        destination: '/individual/what-we-offer/other-products#closedproducts',
        permanent: true,
      },
      {
        source: '/personal/products/forms',
        destination: '/individual/help-and-support/Forms-PDS-TMD',
        permanent: true,
      },
      {
        source: '/personal/products/guaranteed-allocated-pension',
        destination: '/individual/what-we-offer/other-products#allocatedpension',
        permanent: true,
      },
      {
        source: '/personal/products/guaranteed-personal-superannuation',
        destination: '/individual/what-we-offer/other-products#challengersuper',
        permanent: true,
      },
      {
        source: '/personal/products/lifetime-annuities',
        destination: '/individual/what-we-offer/lifetime-annuities',
        permanent: true,
      },
      {
        source: '/personal/products/lifetime-annuities/deferred-payments',
        destination: '/individual/what-we-offer/lifetime-annuities',
        permanent: true,
      },
      {
        source: '/personal/products/lifetime-annuities/immediate-payments',
        destination: '/individual/what-we-offer/lifetime-annuities',
        permanent: true,
      },
      {
        source: '/personal/products/lifetime-annuities/lifetime-annuity-payment-rates',
        destination: '/individual/what-we-offer/lifetime-annuities',
        permanent: true,
      },
      {
        source: '/personal/products/lifetime-annuities/market-linked-payments',
        destination: '/individual/what-we-offer/lifetime-annuities',
        permanent: true,
      },
      {
        source: '/personal/products/order-and-download-pds',
        destination: '/individual/help-and-support/Forms-TMDs-PDS',
        permanent: true,
      },
      {
        source: '/personal/products/order-and-download-pds/archived-target-market-determinations',
        destination:
          '/individual/help-and-support/Forms-TMDs-PDS/archived-target-market-determinations',
        permanent: true,
      },
      {
        source: '/personal/products/other-products',
        destination: '/individual/what-we-offer/other-products',
        permanent: true,
      },
      {
        source: '/personal/products/term-annuities',
        destination: '/individual/what-we-offer/term-annuities',
        permanent: true,
      },
      {
        source: '/personal/products/term-annuities/product-options',
        destination: '/individual/what-we-offer/term-annuities',
        permanent: true,
      },
      {
        source: '/personal/retirement',
        destination: '/individual/interested-in/planning-my-retirement-income',
        permanent: true,
      },
      {
        source: '/personal/retirement/account-based-pension',
        destination: '/individual/help-and-support/Frequently-asked-questions#otherquestions',
        permanent: true,
      },
      {
        source: '/personal/retirement/age-pension',
        destination: '/individual/interested-in/planning-my-retirement-income/age-pension',
        permanent: true,
      },
      {
        source: '/personal/retirement/age-pension-calculator',
        destination:
          '/individual/help-and-support/tools-and-calculators/Retire-with-Confidence-tool',
        permanent: true,
      },
      {
        source: '/personal/retirement/age-pension-calculator',
        has: [
          {
            type: 'query',
            key: 'pid',
            value: 'c_LFWC_397APCusRWCbanner_df_',
          },
        ],
        destination:
          '/individual/help-and-support/tools-and-calculators/Retire-with-Confidence-tool',
        permanent: true,
      },
      {
        source: '/personal/retirement/annuities-super-age-pension',
        destination: '/individual/interested-in/planning-my-retirement-income',
        permanent: true,
      },
      {
        source: '/personal/retirement/annuities-super-age-pension/investments',
        destination: '/individual/interested-in/planning-my-retirement-income',
        permanent: true,
      },
      {
        source:
          '/personal/retirement/annuities-super-age-pension/making-retirement-savings-last-a-lifetime',
        destination: '/individual/interested-in/planning-my-retirement-income',
        permanent: true,
      },
      {
        source:
          '/personal/retirement/annuities-super-age-pension/making-retirement-savings-last-a-lifetime',
        has: [
          {
            type: 'query',
            key: 'pid',
            value: 'c_LFWC_398APCusCasestudycontent_df_',
          },
        ],
        destination: '/individual/interested-in/planning-my-retirement-income',
        permanent: true,
      },
      {
        source: '/personal/retirement/annuities-super-age-pension/superannuation-considerations',
        destination: '/individual/learn/articles/superannuation-considerations',
        permanent: true,
      },
      {
        source: '/personal/retirement/annuity',
        destination: '/individual/learn/what-is-an-annuity',
        permanent: true,
      },
      {
        source: '/personal/retirement/annuity/a-guide-to-income-in-retirement',
        destination:
          '/individual/help-and-support/tools-and-calculators#aguidetoincomeinretirement',
        permanent: true,
      },
      {
        source: '/personal/retirement/annuity/a-guide-to-income-in-retirement',
        has: [
          {
            type: 'query',
            key: 'pid',
            value: 'sc_pr_c_682eBook1Card_df_',
          },
        ],
        destination:
          '/individual/help-and-support/tools-and-calculators#aguidetoincomeinretirement',
        permanent: true,
      },
      {
        source:
          '/personal/retirement/annuity/a-guide-to-income-in-retirement/a-guide-to-income-in-retirement-form',
        destination:
          '/individual/help-and-support/tools-and-calculators#aguidetoincomeinretirement',
        permanent: true,
      },
      {
        source: '/personal/retirement/annuity/case-studies',
        destination: '/individual/why-challenger/Customer-stories',
        permanent: true,
      },
      {
        source: '/personal/retirement/annuity/retirement-income-quiz',
        destination: '/individual/what-we-offer',
        permanent: true,
      },
      {
        source: '/personal/retirement/annuity/what-is-an-annuity',
        destination: '/individual/learn/what-is-an-annuity',
        permanent: true,
      },
      {
        source: '/personal/retirement/be-retirement-ready',
        destination: '/individual/interested-in/getting-ready-for-retirement',
        permanent: true,
      },
      {
        source: '/personal/retirement/be-retirement-ready/a-guide-to-a-confident-retirement',
        destination:
          '/individual/interested-in/getting-ready-for-retirement/a-guide-to-a-confident-retirement',
        permanent: true,
      },
      {
        source: '/personal/retirement/be-retirement-ready/a-guide-to-a-confident-retirement',
        has: [
          {
            type: 'query',
            key: 'pid',
            value: 'sc_pr_c_682eBook2Card_df_',
          },
        ],
        destination:
          '/individual/interested-in/getting-ready-for-retirement/a-guide-to-a-confident-retirement',
        permanent: true,
      },
      {
        source:
          '/personal/retirement/be-retirement-ready/a-guide-to-a-confident-retirement/a-guide-to-a-confident-retirement-form',
        destination:
          '/individual/interested-in/getting-ready-for-retirement/a-guide-to-a-confident-retirement',
        permanent: true,
      },
      {
        source: '/personal/retirement/be-retirement-ready/how-much-do-you-need-to-retire',
        destination:
          '/individual/interested-in/getting-ready-for-retirement/how-much-do-you-need-to-retire',
        permanent: true,
      },
      {
        source: '/personal/retirement/be-retirement-ready/retirement-age',
        destination:
          '/individual/interested-in/getting-ready-for-retirement/what-is-the-retirement-age-in-australia',
        permanent: true,
      },
      {
        source: '/personal/retirement/be-retirement-ready/where-to-retire',
        destination: '/individual/interested-in/getting-ready-for-retirement',
        permanent: true,
      },
      {
        source: '/personal/retirement/could-i-outlive-my-savings',
        destination: '/individual/learn/articles/living-longer',
        permanent: true,
      },
      {
        source: '/personal/retirement/could-i-outlive-my-savings/enjoying-your-retirement',
        destination: '/individual/learn/articles/enjoying-your-retirement',
        permanent: true,
      },
      {
        source: '/personal/retirement/could-i-outlive-my-savings/impact-of-inflation',
        destination: '/individual/learn/articles/impact-of-inflation',
        permanent: true,
      },
      {
        source: '/personal/retirement/could-i-outlive-my-savings/later-stage-retirement',
        destination: '/individual/learn/articles/living-longer',
        permanent: true,
      },
      {
        source: '/personal/retirement/could-i-outlive-my-savings/living-longer',
        destination: '/individual/learn/articles/living-longer',
        permanent: true,
      },
      {
        source: '/personal/retirement/could-i-outlive-my-savings/sequencing-risk',
        destination: '/individual/learn/articles/sequencing-risk',
        permanent: true,
      },
      {
        source: '/personal/retirement/could-i-outlive-my-savings/share-market-volatility',
        destination: '/individual/learn/articles/share-market-volatility',
        permanent: true,
      },
      {
        source: '/personal/retirement/could-i-outlive-my-savings/will-your-savings-go-the-distance',
        destination: '/individual/learn/articles/living-longer',
        permanent: true,
      },
      {
        source: '/personal/retirement/faqs',
        destination: '/individual/help-and-support/frequently-asked-questions',
        permanent: true,
      },
      {
        source: '/personal/retirement/glossary-of-terms',
        destination: '/individual/help-and-support/glossary-of-terms',
        permanent: true,
      },
      {
        source: '/personal/retirement/helpful-links',
        destination: '/individual/help-and-support/helpful-links',
        permanent: true,
      },
      {
        source: '/personal/retirement/horizons',
        destination: '/individual/learn/horizons',
        permanent: true,
      },
      {
        source: '/personal/retirement/insights',
        destination: '/individual/learn',
        permanent: true,
      },
      {
        source: '/personal/retirement/insights/-/media/E628FC9251364C0892183D0468923CEB.ashx',
        destination: '/individual/learn',
        permanent: true,
      },
      {
        source: '/personal/retirement/insights/are-you-getting-the-age-pension-youre-entitled-to',
        destination: '/individual/learn',
        permanent: true,
      },
      {
        source: '/personal/retirement/insights/are-you-getting-the-age-pension-youre-entitled-to',
        has: [
          {
            type: 'query',
            key: 'pid',
            value: 'c_LFWC_399APCusarticlecontent_df_',
          },
        ],
        destination: '/individual/learn',
        permanent: true,
      },
      {
        source: '/personal/retirement/insights/are-you-planning-for-poor-health',
        destination: '/individual/learn',
        permanent: true,
      },
      {
        source:
          '/personal/retirement/insights/australian-seniors-still-worried-by-market-volatility',
        destination: '/individual/learn',
        permanent: true,
      },
      {
        source: '/personal/retirement/insights/boosting-confidence-in-retirement',
        destination: '/individual/learn/articles/boosting-confidence-in-retirement',
        permanent: true,
      },
      {
        source: '/personal/retirement/insights/do-you-have-enough-to-retire',
        destination:
          '/individual/interested-in/getting-ready-for-retirement/how-much-do-you-need-to-retire',
        permanent: true,
      },
      {
        source: '/personal/retirement/insights/elder-financial-abuse',
        destination: '/individual/learn/articles/elder-financial-abuse',
        permanent: true,
      },
      {
        source: '/personal/retirement/insights/federal-budget-2022-client-report',
        destination: '/individual/learn',
        permanent: true,
      },
      {
        source: '/personal/retirement/insights/federal-budget-2023-client-report',
        destination: '/individual/learn',
        permanent: true,
      },
      {
        source: '/personal/retirement/insights/federal-budget-2024-client-report',
        destination: '/individual/learn/articles/federal-budget-2024-25-report',
        permanent: true,
      },
      {
        source: '/personal/retirement/insights/financial-discomfort-in-retirement',
        destination: '/individual/learn',
        permanent: true,
      },
      {
        source:
          '/personal/retirement/insights/financial-security-in-retirement-after-the-coronavirus-crisis',
        destination: '/individual/learn',
        permanent: true,
      },
      {
        source:
          '/personal/retirement/insights/five-facts-everyone-needs-to-know-about-life-expectancy',
        destination:
          '/individual/learn/articles/five-facts-everyone-needs-to-know-about-life-expectancy',
        permanent: true,
      },
      {
        source:
          '/personal/retirement/insights/five-things-to-consider-when-getting-ready-for-retirement',
        destination:
          '/individual/learn/articles/Five-things-to-consider-when-getting-ready-for-retirement',
        permanent: true,
      },
      {
        source:
          '/personal/retirement/insights/how-a-lifetime-annuity-can-complement-your-retirement-income',
        destination:
          '/individual/learn/articles/how-a-lifetime-annuity-can-complement-your-retirement-income',
        permanent: true,
      },
      {
        source:
          '/personal/retirement/insights/how-can-an-increased-life-expectancy-affect-your-retirement',
        destination: '/individual/learn',
        permanent: true,
      },
      {
        source: '/personal/retirement/insights/how-much-can-you-confidently-spend-in-retirement',
        destination: '/individual/learn/articles/how-much-can-you-confidently-spend-in-retirement',
        permanent: true,
      },
      {
        source: '/personal/retirement/insights/reducing-risk-in-retirement',
        destination: '/individual/learn/articles/reducing-risk-in-retirement',
        permanent: true,
      },
      {
        source: '/personal/retirement/insights/retirement-income-worry',
        destination: '/individual/learn',
        permanent: true,
      },
      {
        source: '/personal/retirement/insights/staying-on-track',
        destination: '/individual/learn/articles/staying-on-track',
        permanent: true,
      },
      {
        source: '/personal/retirement/insights/the-real-benefits-to-retirees-of-financial-advice',
        destination: '/individual/learn',
        permanent: true,
      },
      {
        source: '/personal/retirement/insights/wealth-no-guarantee-of-a-comfortable-retirement',
        destination: '/individual/learn',
        permanent: true,
      },
      {
        source: '/personal/retirement/insights/what-is-the-best-age-to-retire',
        destination: '/individual/learn/articles/what-is-the-best-age-to-retire',
        permanent: true,
      },
      {
        source: '/personal/retirement/insights/whats-your-retirement-risk-factor',
        destination: '/individual/learn/articles/what-is-your-retirement-risk-factor',
        permanent: true,
      },
      {
        source: '/personal/retirement/insights/why-investing-for-retirement-is-different',
        destination: '/individual/learn',
        permanent: true,
      },
      {
        source: '/personal/retirement/value-of-advice',
        destination: '/individual/learn/value-of-advice',
        permanent: true,
      },
      {
        source: '/personal/retirement/value-of-advice/questions-to-ask-a-financial-adviser',
        destination: '/individual/learn/value-of-advice',
        permanent: true,
      },
      {
        source: '/personal/retirement/who-can-i-talk-to',
        destination: '/individual/learn/value-of-advice',
        permanent: true,
      },
      {
        source: '/personal/tools-and-calculators',
        destination: '/individual/help-and-support/Tools-and-calculators',
        permanent: true,
      },
      {
        source: '/personal/why-invest',
        destination: '/individual/why-challenger',
        permanent: true,
      },
      {
        source: '/personal/why-invest/about-the-guarantee',
        destination: '/individual/why-challenger/How-we-cover-our-promises',
        permanent: true,
      },
      {
        source: '/personal/why-invest/our-customer-experience',
        destination: '/individual/help-and-support/how-to-apply',
        permanent: true,
      },
      {
        source: '/personal/why-invest/who-is-challenger',
        destination: '/individual/why-challenger',
        permanent: true,
      },
      { source: '/shareholder', destination: '/about-us/shareholder-centre', permanent: true },
      {
        source: '/shareholder/debt-instruments',
        destination: '/about-us/shareholder-centre/debt-instruments',
        permanent: true,
      },
      {
        source: '/shareholder/debt-instruments/challenger-capital-notes-2-cgfpb',
        destination: '/about-us/shareholder-centre/debt-instruments',
        permanent: true,
      },
      {
        source: '/shareholder/debt-instruments/challenger-capital-notes-3-cgfpc',
        destination: '/about-us/shareholder-centre/debt-instruments',
        permanent: true,
      },
      {
        source: '/shareholder/debt-instruments/challenger-capital-notes-4-cgfpd',
        destination: '/about-us/shareholder-centre/debt-instruments',
        permanent: true,
      },
      {
        source: '/shareholder/debt-instruments/challenger-capital-notes-cgfpa',
        destination: '/about-us/shareholder-centre/debt-instruments',
        permanent: true,
      },
      {
        source: '/shareholder/debt-instruments/clc-subordinated-notes',
        destination: '/about-us/shareholder-centre/debt-instruments',
        permanent: true,
      },
      {
        source: '/shareholder/financial-information',
        destination: '/about-us/shareholder-centre/financial-information',
        permanent: true,
      },
      {
        source: '/shareholder/market-announcements',
        destination: '/about-us/shareholder-centre/market-announcements',
        permanent: true,
      },
      {
        source:
          '/shareholder/market-announcements/challenger-extends-ms-primary-reinsurance-partnership',
        destination: '/about-us/shareholder-centre/market-announcements',
        permanent: true,
      },
      {
        source: '/shareholder/market-announcements/challenger-launches-capital-notes-4-offer',
        destination: '/about-us/shareholder-centre/market-announcements',
        permanent: true,
      },
      {
        source: '/shareholder/market-announcements/completion-of-challenger-bank-sale',
        destination: '/about-us/shareholder-centre/market-announcements',
        permanent: true,
      },
      {
        source:
          '/shareholder/market-announcements/final-regulatory-approvals-received-for-challenger-bank-sale',
        destination: '/about-us/shareholder-centre/market-announcements',
        permanent: true,
      },
      {
        source: '/shareholder/market-announcements/interim-2024-dividend-reinvestment-plan',
        destination: '/about-us/shareholder-centre/market-announcements',
        permanent: true,
      },
      {
        source:
          '/shareholder/market-announcements/macquarie-australia-conference-2024--presentation',
        destination: '/about-us/shareholder-centre/market-announcements',
        permanent: true,
      },
      {
        source: '/shareholder/market-announcements/register-for-market-releases',
        destination: '/about-us/shareholder-centre/market-announcements',
        permanent: true,
      },
      {
        source: '/shareholder/market-announcements/third-quarter-update',
        destination: '/about-us/shareholder-centre/market-announcements',
        permanent: true,
      },
      {
        source: '/shareholder/shareholder-information',
        destination: '/about-us/shareholder-centre/shareholder-information',
        permanent: true,
      },
      {
        source: '/shareholder/shareholder-information/annual-general-meeting',
        destination: '/about-us/shareholder-centre/shareholder-information/annual-general-meeting',
        permanent: true,
      },
      {
        source: '/shareholder/shareholder-information/dividend-reinvestment-plan',
        destination:
          '/about-us/shareholder-centre/shareholder-information/dividend-reinvestment-plan',
        permanent: true,
      },
      {
        source: '/shareholder/shareholder-information/key-dates',
        destination: '/about-us/shareholder-centre/shareholder-information#dates',
        permanent: true,
      },
      {
        source: '/shareholder/shareholder-information/manage-shareholding',
        destination: '/about-us/shareholder-centre/shareholder-information',
        permanent: true,
      },
      {
        source: '/shareholder/shareholder-information/shareholder-enquiries',
        destination: '/about-us/shareholder-centre',
        permanent: true,
      },
      {
        source: '/corporategovernance2021',
        destination: '/about-us/sustainability/corporate-governance',
        permanent: true,
      },
      {
        source: '/corporategovernance2023',
        destination: '/about-us/sustainability/corporate-governance',
        permanent: true,
      },
      {
        source: '/about-us/challenger-group/navigating-a-changing-environment',
        destination: '/about-us',
        permanent: true,
      },
      {
        source: '/about/Businesspractices.asp',
        destination: '/about-us/sustainability',
        permanent: true,
      },
      { source: '/about/ContactUs.asp', destination: '/about-us/contact-us', permanent: true },
      { source: '/about/index.htm', destination: '/about-us', permanent: true },
      { source: '/about/OtherOffices.asp', destination: '/about-us', permanent: true },
      {
        source: '/agepension',
        destination: '/individual/interested-in/planning-my-retirement-income/age-pension',
        permanent: true,
      },
      {
        source: '/agm',
        destination: '/about-us/shareholder-centre/shareholder-information/annual-general-meeting',
        permanent: true,
      },
      {
        source: '/annualreport2016',
        destination: '/about-us/shareholder-centre/financial-information',
        permanent: true,
      },
      {
        source: '/annualreport2018',
        destination: '/about-us/shareholder-centre/financial-information',
        permanent: true,
      },
      {
        source: '/annualreport2019',
        destination: '/about-us/shareholder-centre/financial-information',
        permanent: true,
      },
      {
        source: '/annualreport2020',
        destination: '/about-us/shareholder-centre/financial-information',
        permanent: true,
      },
      {
        source: '/annualreport2021',
        destination: '/about-us/shareholder-centre/financial-information',
        permanent: true,
      },
      {
        source: '/annualreport2022',
        destination: '/about-us/shareholder-centre/financial-information',
        permanent: true,
      },
      {
        source: '/annualreport2023',
        destination: '/about-us/shareholder-centre/financial-information',
        permanent: true,
      },
      {
        source: '/annualreview2016',
        destination: '/about-us/shareholder-centre/financial-information',
        permanent: true,
      },
      {
        source: '/annualreview2019',
        destination: '/about-us/shareholder-centre/financial-information',
        permanent: true,
      },
      {
        source: '/annualreview2022',
        destination: '/about-us/shareholder-centre/financial-information',
        permanent: true,
      },
      {
        source: '/annualreview2023',
        destination: '/about-us/shareholder-centre/financial-information',
        permanent: true,
      },
      {
        source: '/care',
        destination: '/individual/what-we-offer/income-for-aged-care',
        permanent: true,
      },
      {
        source: '/corporategovernance2019',
        destination: '/about-us/sustainability/corporate-governance',
        permanent: true,
      },
      {
        source: '/corporategovernance2020',
        destination: '/about-us/sustainability/corporate-governance',
        permanent: true,
      },
      {
        source: '/corporategovernance2021',
        destination: '/about-us/sustainability/corporate-governance',
        permanent: true,
      },
      {
        source: '/corporategovernance2022',
        destination: '/about-us/sustainability/corporate-governance',
        permanent: true,
      },
      {
        source: '/corporategovernance2023',
        destination: '/about-us/sustainability/corporate-governance',
        permanent: true,
      },
      {
        source: '/CRFretirementstrategy',
        destination: '/individual/what-we-offer/other-products/challenger-retirement-fund',
        permanent: true,
      },
      {
        source: '/fixedterm',
        destination: '/individual/what-we-offer/term-annuities',
        permanent: true,
      },
      {
        source: '/fixedtermdirect',
        destination: '/individual/what-we-offer/fixed-term-direct',
        permanent: true,
      },
      {
        source: '/funds/cgifibr/classes',
        destination: '/adviser/products/managed-investments/guaranteed-income-fund',
        permanent: true,
      },
      { source: '/general/disclaimer.asp', destination: '/disclaimer', permanent: true },
      { source: '/general/privacy.asp', destination: '/privacy', permanent: true },
      {
        source: '/general/PublicConditionofUse.asp',
        destination: '/conditions-of-use',
        permanent: true,
      },
      { source: '/investments', destination: 'https://www.challengerim.com.au/', permanent: true },
      {
        source: '/lifetime',
        destination: '/individual/what-we-offer/lifetime-annuities',
        permanent: true,
      },
      {
        source: '/modernslaverystatement2021',
        destination: '/about-us/sustainability',
        permanent: true,
      },
      {
        source: '/myepost',
        destination: '/individual/help-and-support/How-do-I/my-epost',
        permanent: true,
      },
      {
        source:
          '/personal/retirement-income/retirement-risks/share-market-volatility/sequencing-risk',
        destination: '/individual/learn/articles/sequencing-risk',
        permanent: true,
      },
      {
        source: '/personal/retirement/could-i-outlive-my-savings/retire-with-confidence',
        destination:
          '/individual/help-and-support/Tools-and-calculators/retire-with-confidence-tool',
        permanent: true,
      },
      {
        source: '/personal/term-rates',
        destination: '/individual/what-we-offer/view-rates',
        permanent: true,
      },
      {
        source: '/products/forms',
        destination: '/individual/help-and-support/Forms-PDS-TMD',
        permanent: true,
      },
      {
        source: '/secure/resources/tools/age-pension-calculator',
        destination: '/individual/help-and-support/Tools-and-calculators',
        permanent: true,
      },
      {
        source: '/share/agm',
        destination: '/about-us/shareholder-centre/shareholder-information/annual-general-meeting',
        permanent: true,
      },
      {
        source: '/share/keydates',
        destination: '/about-us/shareholder-centre/shareholder-information#dates',
        permanent: true,
      },
      {
        source: '/shareholder/shareholder-information/share-price',
        destination: '/about-us/shareholder-centre/shareholder-information',
        permanent: true,
      },
      {
        source: '/sustainabilityreport2019',
        destination: '/about-us/sustainability',
        permanent: true,
      },
      {
        source: '/sustainabilityreport2020',
        destination: '/about-us/sustainability',
        permanent: true,
      },
      {
        source: '/sustainabilityreport2021',
        destination: '/about-us/sustainability',
        permanent: true,
      },
      {
        source: '/sustainabilityreport2022',
        destination: '/about-us/sustainability',
        permanent: true,
      },
      {
        source: '/sustainabilityreport2023',
        destination: '/about-us/sustainability',
        permanent: true,
      },
      {
        source: '/annualreport2021',
        destination:
          'https://www.challenger.com.ai/about-us/shareholder-centre/financial-information',
        permanent: true,
      },
      {
        source: '/annualreview2021',
        destination:
          'https://www.challenger.com.ai/about-us/shareholder-centre/financial-information',
        permanent: true,
      },
      {
        source: '/annualreview2023',
        destination:
          'https://www.challenger.com.ai/about-us/shareholder-centre/financial-information',
        permanent: true,
      },

      {
        source:
          '/about-us/media-centre/retirement-income-research/super-is-delivering-for-people-about-to-retire',
        destination: '/individual/learn',
        permanent: true,
      },
      {
        source:
          '/about-us/media-centre/retirement-income-research/the-yin-and-yang-of-retirement-income-philosophies',
        destination: '/individual/learn',
        permanent: true,
      },

      {
        source: '/AnnualReview2020/challenger.com.au',
        destination: '/about-us/shareholder-centre/financial-information',
        permanent: true,
      },
      {
        source: '/corporategovernance',
        destination: '/about-us/sustainability/corporate-governance',
        permanent: true,
      },

      {
        source: '/personal/insights/wealth-no-guarantee-of-a-comfortable-retirement',
        destination: '/institutional',
        permanent: true,
      },
      { source: '/share', destination: '/about-us/shareholder-centre', permanent: true },
      {
        source: '/shareholder/shareholder-information/www.computershare.com.au/easyupdate/cgf',
        destination: '/about-us/shareholder-centre/shareholder-information',
        permanent: true,
      },
      { source: '/sustainabilityreport', destination: '/about-us/sustainability', permanent: true },
      {
        source:
          '/adviser/campaigns/resilient-portfolios/a-resilient-portfolio-is-different-in-retirement',
        destination:
          '/adviser/knowledge-hub/Articles/a-resilient-portfolio-is-different-in-retirement',
        permanent: true,
      },
      {
        source:
          '/adviser/adviser-resources/retirement-income-and-aged-care-strategies/retirement-income-strategies/means-test-overview',
        destination: '/adviser/knowledge-hub/Articles/means-test-overview',
        permanent: true,
      },
      {
        source: '/adviser/campaigns/solutions-for-income',
        destination: '/adviser',
        permanent: true,
      },
      {
        source: '/adviser/tools',
        destination: '/adviser/adviser-resources/tools-and-calculators',
        permanent: true,
      },
      {
        source: '/ftdosapplications',
        destination: '/individual/what-we-offer/fixed-term-direct/ftdosapplication',
        permanent: true,
      },
      {
        source: '/personal/campaigns/inflation-protection',
        destination: '/individual/inflation-protection',
        permanent: true,
      },
      {
        source: '/personal/campaigns/investing-for-income',
        destination: '/individual/learn/articles/investing-for-income',
        permanent: true,
      },
      {
        source: '/personal/campaigns/investing-for-retirement-through-high-inflation',
        destination: '/individual/learn/articles/Investing-for-retirement-through-high-inflation',
        permanent: true,
      },
      {
        source: '/personal/campaigns/resilient-portfolios',
        destination: '/individual/campaigns/resilient-portfolios',
        permanent: true,
      },
      {
        source: '/personal/campaigns/solutions-for-income',
        destination: '/individual',
        permanent: true,
      },
      {
        source: '/personal/how-to-log-in-to-investoronline',
        destination: '/individual/help-and-support/How-to-log-in-to-InvestorOnline',
        permanent: true,
      },
      {
        source: '/personal/melbourne-international-flower-and-garden-show',
        destination: '/individual/campaigns/melbourne-international-flower-and-garden-show',
        permanent: true,
      },
      {
        source: '/personal/notice-of-annual-member-meeting',
        destination: '/individual/what-we-offer/other-products/notice-of-annual-member-meeting',
        permanent: true,
      },
      {
        source: '/personal/pga-partnership',
        destination: '/individual/campaigns/PGA-Campaign-page',
        permanent: true,
      },
      {
        source: '/personal/retirement/insights/how-to-create-a-retirement-plan',
        destination: '/individual/learn/articles/how-to-create-a-retirement-plan',
        permanent: true,
      },
      {
        source: '/personal/tips-for-staying-safe-online',
        destination: '/individual/help-and-support/tips-for-staying-safe-online',
        permanent: true,
      },
      {
        source: '/institutional/alpha-and-beta-solutions',
        destination: '/institutional/investment-solutions',
        permanent: true,
      },
      {
        source:
          '/institutional/alpha-and-beta-solutions/challenger-solutions-liquid-alternatives-balanced-fund',
        destination: '/institutional/Investment-solutions/spectrum-fund',
        permanent: true,
      },
      {
        source:
          '/institutional/alpha-and-beta-solutions/challenger-solutions-liquid-alternatives-balanced-fund/market-commentary',
        destination: '/institutional/Investment-solutions/spectrum-fund',
        permanent: true,
      },
      {
        source:
          '/about-us/media-centre/media-releases/csc-announces-its-retirement-income-solution-with-challenger',
        destination: '/about-us/media-releases',
        permanent: true,
      },
      {
        source:
          '/about-us/media-centre/media-releases/pga-tour-of-australasia-launches-new-era-with-challenger',
        destination: '/about-us/media-releases',
        permanent: true,
      },
      {
        source: '/adviser/adviser-resources/tools/challenger-retirement-calculator',
        destination: '/adviser/adviser-resources/tools-and-calculators',
        permanent: true,
      },
      {
        source: '/adviser/products/guaranteed-pension-fund',
        destination: '/adviser/products/Other-products#closedproducts',
        permanent: true,
      },
      {
        source: '/adviser/adviser-resources/webinars-and-learning-modules',
        destination: '/adviser/knowledge-hub/webinars',
        permanent: true,
      },
      {
        source:
          '/annualreview2021/2021-highlights/operational-highlights/increase-the-use-of-secure-retirement-income-streams',
        destination: '/about-us/shareholder-centre/financial-information',
        permanent: true,
      },
      {
        source:
          '/annualreview2021/2021-highlights/operational-highlights/lead-the-retirement-income-market-and-be-the-partner-of-choice',
        destination: '/about-us/shareholder-centre/financial-information',
        permanent: true,
      },
      {
        source:
          '/annualreview2021/2021-highlights/operational-highlights/maintain-leading-operational-and-people-practices',
        destination: '/about-us/shareholder-centre/financial-information',
        permanent: true,
      },
      {
        source:
          '/annualreview2021/2021-highlights/operational-highlights/provide-our-customers-with-excellent-funds-management-solutions',
        destination: '/about-us/shareholder-centre/financial-information',
        permanent: true,
      },
      {
        source: '/annualreview2021/about-challenger/our-businesses/bank-acquisition',
        destination: '/about-us/shareholder-centre/financial-information',
        permanent: true,
      },
      {
        source: '/annualreview2021/about-challenger/our-businesses/funds-management',
        destination: '/about-us/shareholder-centre/financial-information',
        permanent: true,
      },
      {
        source: '/annualreview2021/about-challenger/our-businesses/life',
        destination: '/about-us/shareholder-centre/financial-information',
        permanent: true,
      },
      {
        source: '/personal/investoronline-faqs',
        destination: '/individual/help-and-support/frequently-asked-questions#investoronline',
        permanent: true,
      },
      {
        source: '/personal/iol-help',
        destination: '/individual/help-and-support/How-to-log-in-to-InvestorOnline',
        permanent: true,
      },
      {
        source: '/personal/retirement/annuity/challenger-annuities',
        destination: '/individual/learn/what-is-an-annuity',
        permanent: true,
      },
      {
        source:
          '/shareholder/market-announcements/2023-annual-general-meeting-chair-and-ceo-addresses',
        destination: '/about-us/shareholder-centre/market-announcements',
        permanent: true,
      },
      {
        source: '/shareholder/market-announcements/2024-financial-calendar',
        destination: '/about-us/shareholder-centre/market-announcements',
        permanent: true,
      },
      {
        source: '/shareholder/market-announcements/aasb-17-investor-briefing',
        destination: '/about-us/shareholder-centre/market-announcements',
        permanent: true,
      },
      {
        source: '/shareholder/market-announcements/aasb-17-update',
        destination: '/about-us/shareholder-centre/market-announcements',
        permanent: true,
      },
      {
        source: '/shareholder/market-announcements/challenger-announces-1h24-result',
        destination: '/about-us/shareholder-centre/market-announcements',
        permanent: true,
      },
      {
        source:
          '/shareholder/market-announcements/challenger-expands-strategic-relationship-with-apollo',
        destination: '/about-us/shareholder-centre/market-announcements',
        permanent: true,
      },
      {
        source:
          '/shareholder/market-announcements/first-quarter-aum-annuity-sales-and-net-flows-2023',
        destination: '/about-us/shareholder-centre/market-announcements',
        permanent: true,
      },
      {
        source: '/institutional/alpha-and-beta-solutions/challenger-index-plus',
        destination: '/institutional/Investment-solutions/Index-Plus',
        permanent: true,
      },
      {
        source: '/personal/macquarie-university-research',
        destination: '/individual/campaigns/macquarie-university-research',
        permanent: true,
      },
      {
        source: '/-/media/Shared/Challenger/Document/FIDA/platform_WHT_est_components',
        destination: 'https://www.challenger.com.au/platform_WHT_est_components',
        permanent: true,
      },
      {
        source: '/-/media/challenger/documents/pds/ga-platform-fixed-term-pds.pdf',
        destination: 'https://www.challenger.com.au/ga-platform-fixed-term-pds',
        permanent: true,
      },
      {
        source: '/-/media/challenger/documents/guides/poa-guide.pdf',
        destination: 'https://www.challenger.com.au/poa-guide',
        permanent: true,
      },
    ];
  },
};

module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};
module.exports = withImages();

module.exports = () => {
  // Run the base config through any configured plugins
  return Object.values(plugins).reduce((acc, plugin) => plugin(acc), nextConfig);
};
