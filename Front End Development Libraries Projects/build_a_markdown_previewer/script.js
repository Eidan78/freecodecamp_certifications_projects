const initialState = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/500px-React-icon.svg.png)
`;
class App extends React.Component {
  state = {
    text: initialState,
  };

  handleChange = (e) => {
    this.setState({
      text: e.target.value,
    });
  };

  render() {
    const { text } = this.state;
    const markdown = marked(text, { breaks: true });
    return (
      <div>
        <h2 className="text-center m-4">MARKDOWN PREVIEWER</h2>
        <div className="row">
          <div className="col-6">
            <h6 className="text-center title">Type your markdown here</h6>
            <textarea
              id="editor"
              className="form-control"
              value={text}
              onChange={this.handleChange}
            />
          </div>
          <div className="col-6">
            <h6 className="text-center title">Markdown result</h6>
            <div
              className="preview"
              dangerouslySetInnerHTML={{ __html: markdown }}
              id="preview"
            />
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
