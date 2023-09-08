# React ScrollBox

React ScrollBox is a customizable and easy-to-use React component that provides a scrollable container for your content. It allows you to create scrollable areas with various customization options and exposes a `scrollHandler` for programmatic control.

## Installation

To use React ScrollBox in your project, follow these steps:

1. Install the package via npm:

```bash
npm install react-scrollbox --save
```

2. Run a demo:

```bash
npm start
```
then open `localhost:3000`` in your browser

## Basic Usage

Here's a basic example of how to use the `ScrollBox` component:

```javascript
import ScrollBox from 'react-scrollbox';

const MyComponent = () => {
  const alwaysShowScrollBar = true; /* specify whether to always show the scroll bar */
  const content = 'Lorem ipsum dolor sit amet, cu vel rebum graece.'; /* your content to be scrolled */

  let scrollHandler;

  const handleScroll = () => {
    console.log('scrolled');
  };

  return (
    <div style={{ height: '200px', width: '100%', background: '#313131', color: '#fff'}}>
      <ScrollBox
        alwaysShowScrollBar={alwaysShowScrollBar}
        onClick={(e) => alert('clicked me')}
        onMounted={(h) => scrollHandler = h}
        onScroll={handleScroll}
      >
        <div>
          {content}
        </div>
      </ScrollBox>
    </div>
  );
};
```

If `alwaysShowScrollBar` is not defined or set to `false`, the vertical scroll bar with only appear when overflow

## Programmatic Control

The `scrollHandler` object, obtained through the `onMounted` prop, allows you to control the scroll box programmatically. It provides three methods:

- `scrollHandler.scrollToBottom()`: Scrolls to the bottom of the scrollable content.
- `scrollHandler.scrollToTop()`: Scrolls to the top of the scrollable content.
- `scrollHandler.rerenderScrollBar()`: Forces the scroll bar to re-render.

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).