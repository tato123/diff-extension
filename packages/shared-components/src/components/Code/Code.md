Code Block

```js
<Code label="Javascript">
  <Code.Label>
    <pre>
      <code>
        {`function() {
  console.log('hello-world')
}`}
      </code>
    </pre>
  </Code.Label>
</Code>
```

Properties based highlighting

```js
<Code label="CSS">
  <Code.PropertyList
    properties={[
      {
        name: "border-radius",
        from: "10px",
        to: "5px"
      },
      {
        name: "border",
        from: "1px solid #fff",
        to: "2px solid #fff"
      }
    ]}
  />
</Code>
```

```js
<Code label="HTML">
  {"...<a>"}
  <Code.Label type="from" inline>
    Get Started
  </Code.Label>
  <Code.Label type="to" inline>
    Continue
  </Code.Label>
  {"</a>"}
</Code>
```
