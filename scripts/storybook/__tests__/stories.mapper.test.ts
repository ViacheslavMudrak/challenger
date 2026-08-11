/* eslint-disable  @typescript-eslint/no-explicit-any */

import {
  ComponentParams,
  ComponentRendering,
  Field,
  ImageField,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import TestDataSample from '../__tests__/Mocks/TestDataSample.json';
import { StorybookToSitecore } from '../stories.mapper';
import { mappedObjects } from '../storybook.sitecore.types';

describe('Storybook | Mapper', () => {
  describe('StorybookToSitecore', () => {
    // define an Sitecore Test Interface
    interface Fields {
      CardTitle: Field<string>;
      CardContent: Field<string>;
      CardLink: LinkField;
      CardImage: ImageField;
    }

    interface SitecoreTestProps {
      rendering: ComponentRendering & { params: ComponentParams } & { fields: Fields };
    }

    test('Sitecore Unwanted Fields get deleted from Storybook Item', () => {
      const propertiesToRemove: string[] = [];
      type SimplifiedProps = Partial<SitecoreTestProps>;
      const fieldMapping: mappedObjects[] = [];

      const jsonForSCControl = TestDataSample as SitecoreTestProps;
      const converter = new StorybookToSitecore<SitecoreTestProps, SimplifiedProps>(
        jsonForSCControl,
        fieldMapping,
        propertiesToRemove
      );

      /*
        on constructor call the properties that should be removed are:
            'rendering.uid',
            'rendering.componentName',
            'rendering.dataSource',
            'rendering.params',
         */
      expect(converter.sbItem.rendering?.uid).toEqual(undefined);
      expect(converter.sbItem.rendering?.componentName).toEqual(undefined);
      expect(converter.sbItem.rendering?.dataSource).toEqual(undefined);
      expect(converter.sbItem.rendering?.params).toEqual(undefined);

      // fields should exists
      expect(converter.sbItem.rendering?.fields).not.toEqual(undefined);
    });

    test('Sitecore Image Fields alt text get deleted from Storybook Item', () => {
      const propertiesToRemove: string[] = [];
      type SimplifiedProps = Partial<SitecoreTestProps>;
      const fieldMapping: mappedObjects[] = [];

      const jsonForSCControl = TestDataSample as SitecoreTestProps;
      const converter = new StorybookToSitecore<SitecoreTestProps, SimplifiedProps>(
        jsonForSCControl,
        fieldMapping,
        propertiesToRemove
      );

      /*
          on constructor call the properties that should be removed on ImageField:
              'value.alt',
           */
      expect((converter.sbItem.rendering?.fields.CardImage.value as any).alt).toEqual(undefined);
      expect((converter.scItem.rendering?.fields.CardImage.value as any).alt).not.toEqual(
        undefined
      );

      // fields should exists
      expect(converter.sbItem.rendering?.fields).not.toEqual(undefined);
    });

    test('Sitecore Link Fields   "anchor","linktype","title","class","target","querystring","id", "href", text get deleted from Storybook Item', () => {
      const propertiesToRemove: string[] = [];
      type SimplifiedProps = Partial<SitecoreTestProps>;
      const fieldMapping: mappedObjects[] = [];

      const jsonForSCControl = TestDataSample as SitecoreTestProps;
      const converter = new StorybookToSitecore<SitecoreTestProps, SimplifiedProps>(
        jsonForSCControl,
        fieldMapping,
        propertiesToRemove
      );

      /*
          on constructor call the properties that should be removed on ImageField:
            'anchor',
            'linktype',
            'title',
            'class',
            'target',
            'querystring',
            'id',
            'href',
             */
      expect((converter.sbItem.rendering?.fields.CardLink.value as any).anchor).toEqual(undefined);
      expect((converter.sbItem.rendering?.fields.CardLink.value as any).linktype).toEqual(
        undefined
      );
      expect((converter.sbItem.rendering?.fields.CardLink.value as any).title).toEqual(undefined);
      expect((converter.sbItem.rendering?.fields.CardLink.value as any).class).toEqual(undefined);
      expect((converter.sbItem.rendering?.fields.CardLink.value as any).target).toEqual(undefined);
      expect((converter.sbItem.rendering?.fields.CardLink.value as any).querystring).toEqual(
        undefined
      );
      expect((converter.sbItem.rendering?.fields.CardLink.value as any).id).toEqual(undefined);
      expect((converter.sbItem.rendering?.fields.CardLink.value as any).href).toEqual(undefined);

      expect((converter.scItem.rendering?.fields.CardLink.value as any).anchor).not.toEqual(
        undefined
      );
      expect((converter.scItem.rendering?.fields.CardLink.value as any).linktype).not.toEqual(
        undefined
      );
      expect((converter.scItem.rendering?.fields.CardLink.value as any).title).not.toEqual(
        undefined
      );
      expect((converter.scItem.rendering?.fields.CardLink.value as any).class).not.toEqual(
        undefined
      );
      expect((converter.scItem.rendering?.fields.CardLink.value as any).target).not.toEqual(
        undefined
      );
      expect((converter.scItem.rendering?.fields.CardLink.value as any).querystring).not.toEqual(
        undefined
      );
      expect((converter.scItem.rendering?.fields.CardLink.value as any).id).not.toEqual(undefined);
      expect((converter.scItem.rendering?.fields.CardLink.value as any).href).not.toEqual(
        undefined
      );

      // fields should exists
      expect(converter.sbItem.rendering?.fields).not.toEqual(undefined);
    });

    test('Specific fields defined by user get deleted from Storybook Item', () => {
      const propertiesToRemove: string[] = ['rendering.fields.CardImage'];
      type SimplifiedProps = Partial<SitecoreTestProps>;
      const fieldMapping: mappedObjects[] = [];

      const jsonForSCControl = TestDataSample as SitecoreTestProps;
      const converter = new StorybookToSitecore<SitecoreTestProps, SimplifiedProps>(
        jsonForSCControl,
        fieldMapping,
        propertiesToRemove
      );

      /*
        on constructor call the rendering.fields.CardImage properties should be removed from sbItem but present in scItem
         */
      expect(converter.sbItem.rendering?.fields.CardImage).toEqual(undefined);
      // fields should exists
      expect(converter.scItem.rendering?.fields.CardImage).not.toEqual(undefined);
    });

    test('Simplified fields from mapping get Populated based on the original SC item value', () => {
      const propertiesToRemove: string[] = [];
      interface SimplifiedProps extends Partial<SitecoreTestProps> {
        SbCardImage?: string;
      }
      const fieldMapping: mappedObjects[] = [
        {
          fieldName: 'SbCardImage',
          originalPath: 'rendering.fields.CardImage.value.src',
          description: 'CardImage',
          control: 'select',
          options: ['sample1.jpg', 'sample1.jpg', 'sample2.jpg', 'none'],
        },
      ];

      const jsonForSCControl = TestDataSample as SitecoreTestProps;
      const converter = new StorybookToSitecore<SitecoreTestProps, SimplifiedProps>(
        jsonForSCControl,
        fieldMapping,
        propertiesToRemove
      );

      /*
        getSBFields will convert the complex field from SC object into the simplified properties SbCardImage
         */
      expect(converter.getSBFields(jsonForSCControl).SbCardImage).not.toEqual(undefined);
    });

    test('Simplified fields from wrong mapping will not get Populated based on the original SC item value', () => {
      const propertiesToRemove: string[] = [];
      interface SimplifiedProps extends Partial<SitecoreTestProps> {
        SbCardImage?: string;
      }
      const fieldMapping: mappedObjects[] = [
        {
          fieldName: 'SbCardImage',
          originalPath: 'rendering.fields.CardImage.value.notexisting',
          description: 'CardImage',
          control: 'select',
          options: ['sample1.jpg', 'sample2.jpg', 'none'],
        },
      ];

      const jsonForSCControl = TestDataSample as SitecoreTestProps;
      const converter = new StorybookToSitecore<SitecoreTestProps, SimplifiedProps>(
        jsonForSCControl,
        fieldMapping,
        propertiesToRemove
      );

      /*
        getSBFields will not convert the complex field from SC object into the simplified properties as the mapping is incorrect
         */
      expect(converter.getSBFields(jsonForSCControl).SbCardImage).toEqual(undefined);
    });

    test('Sitecore Props fields from mapping will get updated when SB item changes', () => {
      const propertiesToRemove: string[] = [];
      interface SimplifiedProps extends Partial<SitecoreTestProps> {
        SbCardImage?: string;
      }
      const fieldMapping: mappedObjects[] = [
        {
          fieldName: 'SbCardImage',
          originalPath: 'rendering.fields.CardImage.value.src',
          description: 'CardImage',
          control: 'select',
          options: ['sample1.jpg', 'sample1.jpg', 'sample2.jpg', 'none'],
        },
      ];

      const jsonForSCControl = TestDataSample as SitecoreTestProps;
      const converter = new StorybookToSitecore<SitecoreTestProps, SimplifiedProps>(
        jsonForSCControl,
        fieldMapping,
        propertiesToRemove
      );

      // original object on loading SB
      const args = converter.getSBFields(jsonForSCControl);

      // change on the ARGS from storybook editor
      args.SbCardImage = 'sample2.jpg';

      /*
        getSCFields will not convert the simplified properties into the complex SC structure based on the mapping
         */
      expect(converter.getSCFields(args).rendering.fields.CardImage.value?.src).toEqual(
        'sample2.jpg'
      );
    });

    test('Sitecore Props fields will not reflect SB args change from wrong mapping', () => {
      const propertiesToRemove: string[] = [];
      interface SimplifiedProps extends Partial<SitecoreTestProps> {
        SbCardImage?: string;
      }
      const fieldMapping: mappedObjects[] = [
        {
          fieldName: 'SbCardImage',
          originalPath: 'rendering.fields.CardImage.value.notexisting',
          description: 'CardImage',
          control: 'select',
          options: ['sample1.jpg', 'sample2.jpg', 'none'],
        },
      ];

      const jsonForSCControl = TestDataSample as SitecoreTestProps;
      const converter = new StorybookToSitecore<SitecoreTestProps, SimplifiedProps>(
        jsonForSCControl,
        fieldMapping,
        propertiesToRemove
      );

      // original object on loading SB
      const args = converter.getSBFields(jsonForSCControl);

      // change on the ARGS from storybook editor
      args.SbCardImage = 'sample2.jpg';

      /*
        getSCFields will not convert the simplified properties into the complex SC structure based on the mapping
         */
      expect(converter.getSCFields(args).rendering.fields.CardImage.value?.src).not.toEqual(
        'sample2.jpg'
      );
    });
  });
});
