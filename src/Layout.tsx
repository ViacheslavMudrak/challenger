/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * This Layout is needed for Starter Kit.
 */
import React, { useEffect } from 'react';
import Head from 'next/head';
import { Placeholder, LayoutServiceData, Field, HTMLLink } from '@sitecore-content-sdk/nextjs';
import Scripts from 'src/Scripts';
import { DESKTOP_MAX_WIDTH } from 'components/constants';
import classNames from 'classnames';
import { useSitecore } from 'lib/challenger/hooks';
import { getCookie } from 'cookies-next';
import { COOKIE_USER_TYPE_NAME, PERSONA_LINKS } from './constants';
import { useRouter } from 'next/router';
import config from 'sitecore.config';
import {
  CATEGORY_NAME_SEARCH_PREFIX,
  CATEGORY_NAME_SEARCH_WORD_SEPARATOR,
} from 'components/Blog/Blog.constants';
import Script from 'next/script';
const getPublicUrl = () => process.env.PUBLIC_URL || '';
import generateProductSchema from 'scripts/generate-product-schema';
import { usePathname } from 'next/navigation';
// Prefix public assets with a public URL to enable compatibility with Sitecore Experience Editor.
// If you're not supporting the Experience Editor, you can remove this.
const publicUrl = config.publicUrl;

interface LayoutProps {
  layoutData: LayoutServiceData;
  headLinks: HTMLLink[];
}

type LinkType = {
  value: {
    href: string;
  };
};

type ImageType = {
  value: {
    src: string;
  };
};

type MetaKeywordType = {
  displayName: string;
};

interface RouteFields {
  [key: string]: unknown;
  Title?: Field;
  MetaTitle?: Field;
  MetaDescription?: Field;
  MetaKeywords?: MetaKeywordType[];
  SocialImage?: Field;
  CanonicalUrl?: LinkType;
  NavigationTitle?: Field;
  SearchDescription?: Field;
  SearchTitle?: Field;
  CreatedDate?: Field;
  ArticleTitle?: Field;
  ArticleCategories?: Field;
  ArticleDescription?: Field;
  Category?: MetaKeywordType[];
  ArticleLink?: LinkType;
  ArticleImageUrl?: ImageType;
  ReadInMins?: Field;
  PublishedDate?: Field;
  ArticleType?: Field;
  HidefromSearch?: Field<boolean>;
}

const Layout = ({ layoutData, headLinks }: LayoutProps): React.JSX.Element => {
  const { route } = layoutData.sitecore;
  const fields = route?.fields as RouteFields;
  const isPageEditing = (layoutData.sitecore.context as any).pageEditing; //@typescript-eslint/no-explicit-any
  const mainClassPageEditing = isPageEditing ? 'editing-mode' : 'prod-mode';
  const { isHomePage, getPersona, isEditMode, isPreviewMode, getUrlRelativePath } = useSitecore();
  const userCookie = getCookie(COOKIE_USER_TYPE_NAME) || '';
  const router = useRouter();
  const url = `${publicUrl}${getUrlRelativePath()}`;

  useEffect(() => {
    // only redirect to specific persona page if it is home page or base url
    if (isHomePage() && !isEditMode && !isPreviewMode) {
      const persona = getPersona(PERSONA_LINKS, userCookie);

      if (persona) {
        router.push(persona.url);
      }
    }
  }, [getPersona, isEditMode, isHomePage, isPreviewMode, router, userCookie]);

  let metaKeywords = '';
  if (fields.MetaKeywords && fields.MetaKeywords.length > 0) {
    metaKeywords = fields.MetaKeywords.map((m) => m.displayName).join(', ');
  }

  let categories = '';
  if (fields.Category && fields.Category.length > 0) {
    categories = fields.Category.map((m) => m.displayName).join(', ');
  }

  let articleCategories = '';
  if (fields.Category && fields.Category.length > 0) {
    articleCategories = fields.Category.map(
      (m) =>
        CATEGORY_NAME_SEARCH_PREFIX +
        m.displayName?.toLowerCase()?.replaceAll(' ', CATEGORY_NAME_SEARCH_WORD_SEPARATOR)
    ).join(', ');
  }

  let articleImageUrl = '';
  if (fields.ArticleImageUrl && fields.ArticleImageUrl.value) {
    articleImageUrl = fields.ArticleImageUrl.value.src;
  }

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Challenger Limited',
    legalName: 'Challenger Limited',
    url: 'https://www.challenger.com.au/',
    logo: 'https://edge.sitecorecloud.io/challengerg66c7-challengerprod-prod-4c11/media/Project/Challenger/Challenger/Images/Logos/challenger_logo.svg',
    sameAs: [
      'https://www.linkedin.com/company/challenger-limited',
      'https://www.facebook.com/ChallengerLtd',
      'https://www.instagram.com/challenger_retirement',
      'https://www.youtube.com/channel/UC4f0hwnRf3uUk8mxHKI29fQ',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: '5 Martin Place',
      addressLocality: 'Sydney',
      addressRegion: 'NSW',
      postalCode: '2000',
      addressCountry: 'AU',
    },
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': getPublicUrl() + fields.ArticleLink?.value.href,
    },
    headline: fields.ArticleTitle?.value,
    image: [fields.ArticleImageUrl?.value.src],
    datePublished: fields.PublishedDate?.value,
    author: {
      '@type': 'Organization',
      name: 'Challenger Limited',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Challenger Limited',
      logo: {
        '@type': 'ImageObject',
        url: 'https://edge.sitecorecloud.io/challengerg66c7-challengerprod-prod-4c11/media/Project/Challenger/Challenger/Images/Logos/challenger_logo.svg',
      },
    },
    description: fields.ArticleDescription?.value,
  };

  const productSchema = generateProductSchema(usePathname());

  const path = usePathname();
  let schemaName = 'product_schema';
  if (path.toLowerCase().includes('knowledge-hub/economic-updates')) {
    schemaName = 'person_schema';
  }

  return (
    <>
      <Scripts />
      <Head>
        <title>{fields?.MetaTitle?.value?.toString() || route?.displayName || ''}</title>
        <meta name="title" content={fields?.MetaTitle?.value?.toString() || ''} />
        <meta name="description" content={fields?.MetaDescription?.value?.toString() || ''} />
        <meta name="keywords" content={metaKeywords} />
        <link rel="canonical" href={fields?.CanonicalUrl?.value?.href.toString() || url || ''} />

        <meta
          property="og:title"
          content={fields?.Title?.value?.toString() || route?.displayName || ''}
        />
        <meta
          property="og:description"
          content={fields?.MetaDescription?.value?.toString() || ''}
        />
        <meta property="searchTitle" content={fields?.SearchTitle?.value?.toString() || ''} />
        <meta
          property="searchDescription"
          content={fields?.SearchDescription?.value?.toString() || ''}
        />
        <link rel="icon" href={`${publicUrl}/favicon.ico`} />
        {headLinks.map((headLink) => (
          <link rel={headLink.rel} key={headLink.href} href={headLink.href} />
        ))}

        <script
          id="organization_schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        ></script>

        {fields.ArticleLink?.value.href && (
          <script
            id="article_schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
          ></script>
        )}

        {productSchema ? (
          <script
            id={schemaName}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
          ></script>
        ) : (
          ''
        )}
      </Head>
      <Script id="abhide-script" strategy="beforeInteractive">
        {`
            var timeout = 3000; // Timeout value to remove the flicker (in milliseconds)
            !(function (h, i, d, e) {
              var t,
                n = h.createElement("style");
              (n.id = e),
                (n.innerHTML = "body{opacity:0}"),
                h.head.appendChild(n),
                (t = d),
                (i.rmfk = function () {
                  var t = h.getElementById(e);
                  t && t.parentNode.removeChild(t);
                }),
                setTimeout(i.rmfk, t);
            })(document, window, timeout, "abhide");
           `}
      </Script>
      <Script
        type="text/javascript"
        async
        src="https://cdn.mida.so/js/optimize.js?key=bJVGmqv2Yvk6vRlWgj9k3o"
      ></Script>

      {/* root placeholder for the app, which we add components to using route data */}
      <div
        className={`${mainClassPageEditing} relative flex h-screen w-full flex-col items-center`}
      >
        <header className="w-full">
          <div id="header">{route && <Placeholder name="headless-header" rendering={route} />}</div>
        </header>
        <main className={classNames('relative flex w-full flex-col shadow-md', DESKTOP_MAX_WIDTH)}>
          <div id="content">{route && <Placeholder name="headless-main" rendering={route} />}</div>
        </main>
        <footer className="relative mt-auto w-full">
          <div id="footer">{route && <Placeholder name="headless-footer" rendering={route} />}</div>
        </footer>
        <span id="createdDate" className="hidden">
          {fields.CreatedDate?.value.toString() || ''}
        </span>
        <span id="articleTitle" className="hidden">
          {fields.ArticleTitle?.value.toString() || ''}
        </span>
        <span id="articleDescription" className="hidden">
          {fields.ArticleDescription?.value.toString() || ''}
        </span>
        <span id="category" className="hidden">
          {categories || ''}
        </span>
        <span id="articleCategory" className="hidden">
          {articleCategories || ''}
        </span>
        <span id="articleLink" className="hidden">
          {fields.ArticleLink?.value?.href.toString() || ''}
        </span>
        <span id="readInMins" className="hidden">
          {fields.ReadInMins?.value.toString() || ''}
        </span>
        <span id="publishedDate" className="hidden">
          {fields.PublishedDate?.value.toString() || ''}
        </span>
        <span id="articleType" className="hidden">
          {fields.ArticleType?.value.toString() || ''}
        </span>
        <span id="articleImageUrl" className="hidden">
          {articleImageUrl}
        </span>
        <span id="hidefromSearch" className="hidden">
          {fields.HidefromSearch?.value?.toString()}
        </span>
      </div>
    </>
  );
};

export default Layout;
