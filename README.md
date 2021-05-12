# Multi Select Webcomponent

[![GitHub](https://img.shields.io/github/license/honatas/multi-select-webcomponent?style=plastic)](https://github.com/Honatas/multi-select-webcomponent "View this project on GitHub")
[![npm](https://img.shields.io/npm/v/@honatas/multi-select-webcomponent?style=plastic)](https://npmjs.org/package/@honatas/multi-select-webcomponent "View this project on npm")
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg?style=plastic)](https://www.webcomponents.org/element/@honatas/multi-select-webcomponent)
[![typescript](https://img.shields.io/badge/made%20with-Typescript-blue?style=plastic)](https://www.typescriptlang.org/ "Try Typescript")
[![coffee](https://img.shields.io/badge/buy%20me%20a-coffee-brown?style=plastic)](https://ko-fi.com/honatas "Buy me a coffee")

A fully styleable multiselect with no polyfills.

[Live demo ↗](https://jsfiddle.net/Honatas/k2fsy4Lc/19/)

## Install

You can get it from npm:

    npm install @honatas/multi-select-webcomponent

Or you can get it from a CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/@honatas/multi-select-webcomponent/dist/multi-select-webcomponent.min.js" crossorigin="anonymous"></script>
```

If you use [Typescript](https://www.typescriptlang.org), add the definitions file to the includes section of your tsconfig.json:
```javascript
"include": [
  "node_modules/@honatas/multi-select-webcomponent/dist/multi-select-webcomponent.d.ts",
  ...
],
```

## Usage

At first, you'll have to register the component with your application. I chose to leave this to you because this allows for avoiding naming conflicts with other WebComponents you may be using. So, in order to register the component, execute the following code during the initialization of your application (eg. at the first lines of code):

```javascript
  window.customElements.define('multi-select', MultiselectWebcomponent);
```

After that you can use the newly defined tag **multi-select** wherever you want on your html. The tag works the same as the **select** tag:

```html
  <multi-select id="planetId">
    <option id="1">Mercury</option>
    <option id="2">Venus</option>
    <option id="3">Earth</option>
  </multi-select>
```

## But wait!

In order to be fully styleable, this WebComponent ships with **no style at all!** If you just copy/paste the code above, your component will look ... well, unstylish. Use the following tag attributes to add style to your component:  

Attribute                     | Target                                    |
------------------------------|-------------------------------------------|
**selected**                  | Selected items box                        |
**selecteditem**              | Selected item                             |
**dropdown**                  | Dropdown box                              |
**item**                      | Dropdown item                             |
**clearbutton**               | "Clear Selection" button                  |
**clearbuttonspan**           | "Clear Selection" button's inner span     |
**clearbuttontitle**          | "Clear Selection" button's title          |
**selectallbutton**           | "Select All" button                       |
**selectallbuttonspan**       | "Select All" button's inner span          |
**selectallbuttontitle**      | "Select All" button's title               |

With exception of **clearbuttontitle** and **selectallbuttontitle**, all other attributes values are transcribed to the **class** attribute of their targets. This means if you want to add classes to every item that shows when you click the component, add the attribute **item** to your tag and populate it with css classes of your own or from whichever lib you are using. You can see a fully styled example using [Bootstrap 5](https://getbootstrap.com/) on the [Live demo](https://jsfiddle.net/Honatas/k2fsy4Lc/19/).

## Older browsers warning

This WebComponent is created with pure Javascript, so no polyfills are being used. Do not use this component if the target browser is not listed in the compatibility list of the [WebComponents](https://www.webcomponents.org) website. At the time of writing of this documentation, all major browsers already have full support.

## Contributions

Feel free to open an issue or add a pull request. Anytime. Really, I mean it.  

Also, if you like my work, I'll let you know that I love [coffee](https://ko-fi.com/honatas).
