# React Away

### [#](./index.md) | [i18n](./global.md) | [Storing](./storer.html) | [Routing](./router.md) | [Fetching](./syncer.md) | **Binding** | [Handling](./broker.md) | [Directive](./proper.md) | [CSS](./styler.md)

<hr />

The unidirectional way to implement a read-write elements is like bellow. Two-way data binding allows define both properties with just one attribute directive, reducing this very recurrent implementation.

````html
<input value={store.who} onInput={e => store.who = e.target.value}/>
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

<!-- exception: only supports field pathing -->
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

Two-way data binding for uncontrolled components (onCommit replaces onSubmit).

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

Also supports custom validation in **validate** property integrated to HTML Validation API.

````tsx
const custom = mode =>      
   ! mode ? "is required"
   ? mode.length < 3
   ? 'Too short' 
   : true  

const ex = () => <input validate={custom} name="date" />  
````

## onCommit handler

The onCommit replaces onSubmit in form bind receiving a list of errors.

````tsx
function handleSubmit(errors: Validation[]) {
   if (errors.length > 0) 
      // handling errors
   else 
      // submiting to api
}
````