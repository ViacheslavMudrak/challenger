export interface StorybookType {
  control?: string;
  options?: string[];
  table?: object;
  description?: string;
}

export class mappedObjects implements StorybookType {
  originalPath = '';
  fieldName = '';
  control?: string = '';
  options?: string[] = [];
  table?: object = {};
  description?: string = '';
}

export interface SbArgsType {
  [name: string]: StorybookType;
}
