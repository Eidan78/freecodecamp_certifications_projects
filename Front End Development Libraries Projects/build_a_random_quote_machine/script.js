const API =
  'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

class RandomQuoteMachine extends React.Component {
  state = {
    quotes: [
      {
        quote: '',
        author: '',
      },
    ],
    index: 0,
    currentColor: 0,
    colors: [
      '#F44336',
      '#E91E63',
      '#9C27B0',
      '#673AB7',
      '#3F51B5',
      '#2196F3',
      '#03A9F4',
      '#00BCD4',
      '#009688',
      '#4CAF50',
      '#8BC34A',
      '#CDDC39',
      '#FFC107',
      '#FF9800',
      '#FF5722',
    ],
  };

  componentDidMount() {
    fetch(API)
      .then((res) => res.json())
      .then((res) => {
        this.setState(
          {
            quotes: res.quotes,
          },
          this.getRandomIndex
        );
      });
  }

  getRandomIndex = () => {
    const { quotes } = this.state;

    if (quotes.length > 0) {
      const index = Math.floor(Math.random() * quotes.length);
      this.setState({
        index,
      });
    }
  };

  changeColor = () =>
    this.setState({
      currentColor: Math.floor(Math.random() * this.state.colors.length),
    });

  render() {
    const { quotes, index } = this.state;

    const quote = quotes[index];

    const tweetURL = `https://twitter.com/intent/tweet?text=${quote.quote} -${quote.author}`;

    return (
      <div
        className="container"
        style={{ backgroundColor: this.state.colors[this.state.currentColor] }}
      >
        <div id="wrapper">
          <div id="quote-box">
            <i className="fas fa-quote-left"></i>
            {quote && (
              <div>
                <p id="text">{quote.quote}</p>
                <p id="author">- {quote.author}</p>
              </div>
            )}
            <div id="buttons">
              <a id="tweet-quote" target="_blank" href={tweetURL}>
                <i className="fab fa-twitter"></i>
              </a>

              <button
                id="new-quote"
                className="fa fa-random"
                onClick={() => {
                  this.getRandomIndex();
                  this.changeColor();
                }}
              ></button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<RandomQuoteMachine />, document.getElementById('app'));
