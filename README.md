# Multi Select Webcomponent

[![GitHub](https://img.shields.io/github/license/honatas/multi-select-webcomponent?style=plastic)](https://github.com/Honatas/multi-select-webcomponent "View this project on GitHub")
[![npm](https://img.shields.io/npm/v/@honatas/multi-select-webcomponent?style=plastic)](https://npmjs.org/package/@honatas/multi-select-webcomponent "View this project on npm")
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg?style=plastic)](https://www.webcomponents.org/element/@honatas/multi-select-webcomponent)
[![typescript](https://img.shields.io/badge/coded%20in-Typescript-blue?style=plastic)](https://www.typescriptlang.org/ "Try Typescript")
[![coffee](https://img.shields.io/badge/buy%20me%20a-coffee-brown?style=plastic)](https://ko-fi.com/honatas "Buy me a coffee")

A fully styleable multiselect with no polyfills.

[Live demo ↗](https://jsfiddle.net/Honatas/k2fsy4Lc/29)

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
  <multi-select id="planetIds">
    <option id="1">Mercury</option>
    <option id="2">Venus</option>
    <option id="3">Earth</option>
  </multi-select>
```

## Styling

In order to be fully styleable, this WebComponent ships with **no style at all!** If you just copy/paste the code above, your component will look ... well, unstylish.  

To add style to your component, you can either add attributes to your tag or create css classes:

Tag attribute             |CSS class                     | Target                                 |
--------------------------|------------------------------|----------------------------------------|
**selected**              |**.msw-selected**             | Selected items box                     |
**selecteditem**          |**.msw-selecteditem**         | Selected item                          |
**dropdown**              |**.msw-dropdown**             | Dropdown box                           |
**dropdownitem**          |**.msw-dropdownitem**         | Dropdown item                          |
**searchbox**             |**.msw-searchbox**            | Search input field                     |
**clearbutton**           |**.msw-clearbutton**          | "Clear Selection" button               |
**clearbuttonspan**       |**.msw-clearbuttonspan**      | "Clear Selection" button's inner span  |
**selectallbutton**       |**.msw-selectallbutton**      | "Select All" button                    |
**selectallbuttonspan**   |**.msw-selectallbuttonspan**  | "Select All" button's inner span       |
  
So, if you want to add classes to every item that shows when you click the component, you can either add the attribute **dropdownitem** to your tag and populate it with css classes of your own or from whichever lib you are using, or create the **.msw-dropdownitem** class on your own css file. You can see a neatly styled example using [Bootstrap 5](https://getbootstrap.com) on the [Live demo](https://jsfiddle.net/Honatas/k2fsy4Lc/29).

Also, if you need to change the default titles for the buttons, you can add the following tag attributes:

Tag attribute             | Target                            |
--------------------------|-----------------------------------|
**clearbuttontitle**      | "Clear Selection" button's title  |
**selectallbuttontitle**  | "Select All" button's title       |


## Options

You may realize that as soon as you render the component, your **option** tags will be removed from the DOM. This is desired, since other elements are going to be rendered in substitution to them. However, internal control is still made using those tags, so they are kept int memory and you can access them through javascript. In the example above we create another option and add it to the component:

```javascript
const pluto = document.createElement('option');
pluto.value = 9;
pluto.innerHTML = 'Pluto';

const msw = document.getElementById('planetIds');
msw.options.push(pluto);
msw.build();
```

## Properties

**value: string[]**  
&nbsp;&nbsp;&nbsp;&nbsp;
The value property of this component is an array of strings containing the values of the selected Option elements.  

**disabled: boolean**  
&nbsp;&nbsp;&nbsp;&nbsp;
Sets and reads the disabled property of this element.

**options: HTMLOptionElement[]**  
&nbsp;&nbsp;&nbsp;&nbsp;
Array of options. You can read or modify its contents at will, but changes will only apply after a call to **build()**.


## Methods

**build(): void**  
&nbsp;&nbsp;&nbsp;&nbsp;
Applies changes to the element.

**clear(): void**  
&nbsp;&nbsp;&nbsp;&nbsp;
Removes all options and calls **build()** immediately.


## Older browsers warning

This WebComponent is created with pure Javascript, so no polyfills are being used. Do not use this component if the target browser is not listed in the compatibility list of the [WebComponents](https://www.webcomponents.org) website. At the time of writing of this documentation, all major browsers already have full support.

## Contributions

Feel free to open an issue or add a pull request. Anytime. Really, I mean it.  

Also, if you like my work, I'll let you know that I love [coffee](https://ko-fi.com/honatas).
