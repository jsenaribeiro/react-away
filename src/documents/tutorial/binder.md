# React Away

### [#](./index.md) | [i18n](./global.md) | [Storing](./storer.html) | [Routing](./router.md) | [Fetching](./syncer.md) | **Binding** | [Handling](./broker.md) | [Directive](./proper.md) | [CSS](./styler.md)

<hr />

This is the stardard unidirectional way in read-write form elements.

````html
<input value={store.hello.who} onInput={e => store.hello.who = e.target.value}/>
````

## String Two-Way data binding

Two-way data binding with bind field path for store object.

```html
<input bind="hello.who" /> 
```

## Lambda Two-Way data binding

The lambda syntax alternative as type-checking alternative (only field path). 

```html
<input bind={(s:Domain) => s.hello.who} /> 

<!-- exception: only supports field path -->
<input bind={(s:Domain) => s.hello.who.toLowerCase()}> 
```

## Local state Two-Way data binding

With local property the bind will get the local state.

````tsx
export const Hello = (props: any, state: any) => <>
   <input local bind="hello" /> 
</>
````

## Form dual binding

Two-way data binding for uncontrolled components (WIP).

````tsx
export const Form = (props: any) => <>
   <form bind="profile" onCommit={handle}>
      Name: <input id="name" name="name" />
      Date: <input type="date" name="date" />
      Work: <input pattern="dev|test" name="work" />    
      <button>Submit</button>
   </form>
</>
````

## Custom validation

Custom validation with **validate** props integrated to HTML Validation API.

````tsx
const custom = mode =>      
   ! mode ? "is required"
   ? mode.length < 3
   ? 'Too short' 
   : true  

const ex = () => <input validate={custom} name="date" />  
````

## onCommit handler

The onSubmit is replaced by onCommit replaces (WIP).

````tsx
function handleSubmit(errors: Validation[]) {
   if (errors.length > 0) 
      // handling errors
   else 
      // submiting to api
}
````