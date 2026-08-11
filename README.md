# Getting started

Coming soon

To run the project locally, please follow the instructions [here](https://challengerlimited.atlassian.net/wiki/spaces/FS/pages/232489427/XM+Cloud+dev+setup#Docker-Desktop-installation-steps).

## Storybook

To run storybook:

```console
npm run storybook
```

visit `http://localhost:6006/`

To run storybook with updated tests:

```console
npm run storybook:prebuild
npm run storybook
```

## Documents and designs

* [Confluence](https://challengerlimited.atlassian.net/wiki/spaces/FS/overview)
* [Figma](https://www.figma.com/file/9x6DbSOkrGdRHZqPv4jG4W/Challenger%3A-Website-Deliverable-File)

## CI/CD

* [Sonarqube](https://sonarqube.challenger.com.au/dashboard?id=Sitecore-XM-Cloud)

* [Repository](https://dev.azure.com/ChallengerCloud/_git/SitecoreCloud)


## Front end guidelines and practices

Coming soon

## Folder structures

Coming soon

## Branching Strategy

Coming soon

## Useful plugins for Front End development in VS Code
* [Tailwind CSS IntelliSense](vscode:extension/bradlc.vscode-tailwindcss)
* [Tailwind Docs](vscode:extension/austenc.tailwind-docs)
* [Code Spell Checker](vscode:extension/streetsidesoftware.code-spell-checker)
* [Color Highlight](vscode:extension/naumovs.color-highlight)
* [ESLint](vscode:extension/dbaeumer.vscode-eslint)
* [vscode-icons](vscode:extension/vscode-icons-team.vscode-icons)
* [Prettier-Code formatter](vscode:extension/esbenp.prettier-vscode)
* [Prettier ESLint](vscode:extension/rvest.vs-code-prettier-eslint)
* [SVG](vscode:extension/jock.svg)
* [SVG Editor](vscode:extension/henoc.svgeditor)


## Useful links

* [Documentation (Experience Platform)](https://doc.sitecore.com/xp/en/developers/hd/21/sitecore-headless-development/sitecore-javascript-rendering-sdk--jss--for-next-js.html).
* [Documentation (XM Cloud)](https://doc.sitecore.com/xmc/en/developers/xm-cloud/sitecore-javascript-rendering-sdk--jss--for-next-js.html)
* [Web photoshop](https://www.photopea.com/)
* [Polygon maker](https://bennettfeely.com/clippy/)
* [Storybook examples](https://storybook.js.org/#who)

## Troubleshoot

### Pixel rounding error
If there's an unexpected gap or white line when using flex, this is due to pixel rounding error in browsers (chrome, edge)
[Work around](https://stackoverflow.com/questions/34387441/pixel-wide-gaps-between-each-div-with-flexbox-due-to-pixel-rounding-error)

## Sitecore data serialization

### Make sure to login first in order to serialize Sitecore data

```console
dotnet sitecore login
```

### How to PULL Sitecore data

```console
dotnet sitecore ser pull -i tags:[content-deployment]
```

```console
 dotnet sitecore ser pull -i tags:[challenger-required]
```

### How to PUSH Sitecore data

```console
dotnet sitecore ser push -i tags:[content-deployment]
```

```console
 dotnet sitecore ser push -i tags:[challenger-required]
```


## OUTSYSTEMS How to PULL Sitecore data structure for Outsystems Site

```console
dotnet sitecore ser pull -i tags:[outsystems-content-deployment]
```

```console
 dotnet sitecore ser pull -i tags:[challenger-required]
```

## OUTSYSTEMS How to PUSH Sitecore data structure for Outsystems Site

```console
dotnet sitecore ser push -i tags:[outsystems-content-deployment]
```

```console
 dotnet sitecore ser push -i tags:[challenger-required]
```

## SHARED How to PULL Sitecore data structure for Shared Site - TMD questions

```console
dotnet sitecore ser pull -i tags:[shared-content-deployment]
```

```console
 dotnet sitecore ser pull -i tags:[challenger-required]
```

## SHARED How to PUSH Sitecore data structure for Shared Site - TMD questions

```console
dotnet sitecore ser push -i tags:[shared-content-deployment]
```

```console
 dotnet sitecore ser push -i tags:[challenger-required]
```
