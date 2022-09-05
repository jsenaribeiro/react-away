# React Away

### [#](./index.md) | [i18n](./global.md) | [Storing](./storer.html) | [Routing](./router.md) | [Fetching](./syncer.md) | [Binding](./binder.md) | [Handling](./broker.md) | [Directive](./proper.md) | **CSS**

<hr />

React has some known CSS issues like:

* imported CSS is not component-scoped 
* verbosity in className property
* restricted conditional styling

## CSS suggar syntax

As a tiny improvement, the new css property could work as a className.

```html
<button className="active">Original</button>
<button css="active">Alternative</button>
```

## Component-scoped CSS

The scoped CSS is achieved using the class component Name as CSS class.

```css
button { color:white  }      
button.App { color:black }
```

```tsx
const App = () => <><button>white</button></>
const Hello = () => <><button>black</button></>
```

## Styled routing

The onRoute elements in current route could be styled.

```html
<a onRoute="/hello">Hello</a> 
<a onRoute="/counter">Counter</a> 
```

```css
/* selected link behavior as current route  */
a.routed { color: white; background: black; }
```