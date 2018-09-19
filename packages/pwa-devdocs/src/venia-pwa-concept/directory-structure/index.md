---
title: Venia directory structure
---

This topic is an overview of the directory structure for the Venia theme project.
It provides information about the different directories and files in the project.

## The root directory

The majority of files and directories in the Venia root directory are boilerplate directories and files for a standard Magento theme.

### Notable Magento theme files

`theme.xml`

: This file contains the basic theme meta-information, such as the name and parent, for the Venia theme.

`registration.php`

: This file registers Venia as a Magento theme.

`Magento_Theme/templates/root.phtml`

: This file is a template override for the default `root.phtml` file.
  In a standard Magento theme, the `root.phtml` file is the base template on which every page is built upon.

  In Venia, this file provides the bare, skeleton HTML that the PWA theme populates on page load.

`etc/view.xml`

: This file exists to make Venia compatible with the Magento 2 theme system.
  The content is mostly a copy of the original file from the Magento source.

For more information on basic theme structure, see: [Magento theme structure][]

## The `src` directory

The `src` directory contains all the PWA code for the Venia theme.

### `src/RootComponents`

This directory contains directories for all Venia root components.
Root components provide the main React component entry point for the different page types.

Examples of page types include:

* CMS
* Category
* Product

When a page is requested, the [Peregrine router][] determines which root component to use based on the URL path.

### `src/actions`

The `src/actions` directory contains all [Redux][] action creator definitions.
The files in this directory group the action creators together based on the application feature they affect.

action creator
: As its name suggests, an action creator is a function that returns an **action** object.

action
: An action object is a JavaScript object that contains information about the activity being performed. 
  It is used by [reducers][] to update the PWA application state through the [Store][].

For more information on actions, see the [official documentation for Redux actions][].

### `src/components`

The `src/components` directory contains the project-specific components used in the Venia theme.

Components in the Venia theme are React components.
They define the structure and render the visual elements of the different pieces on a page.

React components are generally written to be small and re-usable, so
you will find multiple component definition files in a single feature directory.

For more information on components, see the [official documentation for React components][].

### `src/reducers`

### `src/shared`

### `src/util`

[Magento theme structure]: https://devdocs.magento.com/guides/v2.3/frontend-dev-guide/themes/theme-structure.html
[Peregrine router]: {{ site.baseurl }}{% link peregrine/reference/router/index.md %}
[official documentation for Redux actions]: https://redux.js.org/basics/actions
[Redux]: https://redux.js.org/
[Store]: https://redux.js.org/basics/store
[reducers]: #srcreducers
[official documentation for React components]: https://reactjs.org/docs/react-component.html
