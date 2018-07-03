Standard Property List with multiple Items

```js
<List>
  <List.Item>
    <Image avatar src="https://d3iw72m71ie81c.cloudfront.net/male-20.jpg" />
    <List.Content>
      <List.Header>Comment</List.Header>
      <List.SubHeader>Thursday, May 9, 2018 - 3:41 PM</List.SubHeader>
      <List.Description>
        "Looking good! One small change. The border radius should be 3px. Diff
        makes this so much easier to track"
      </List.Description>
    </List.Content>
  </List.Item>
  <List.Item>
    <Image avatar src="https://d3iw72m71ie81c.cloudfront.net/female-60.jpg" />
    <List.Content>
      <List.Header>Comment</List.Header>
      <List.SubHeader>Thursday, May 9, 2018 - 3:41 PM</List.SubHeader>
      <List.Description>
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
      </List.Description>
    </List.Content>
  </List.Item>
</List>
```
