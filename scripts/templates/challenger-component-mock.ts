/**
 * Generates React boilerplate for a component under `src/components`
 * @param componentName - the component name
 * @returns component src boilerplate as a string
 */
function generateComponentMock(componentName: string): string {
  return `
  {
    "rendering": {
        "uid": "52e8394e-6250-432f-8d2f-e2e9126f625b",
        "componentName": "${componentName}",
        "dataSource": "",
        "params": {
            "CacheClearingBehavior": "Clear on publish"
        },
        "fields": {
            "Title": {
                "value": "Static storybook Test Title"
            }
        }
    }
}`;
}

export default generateComponentMock;
