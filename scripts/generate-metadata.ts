import { generateMetadata } from '@sitecore-content-sdk/core/tools';

/*
  METADATA GENERATION
  Generates the /src/temp/metadata.json file which contains application
  configuration metadata that is used for Sitecore XM Cloud integration.
*/
generateMetadata({ destinationPath: 'src/temp/metadata.json' })().catch((e: unknown) => {
  console.error('Error generating metadata', e);
  process.exit(1);
});
