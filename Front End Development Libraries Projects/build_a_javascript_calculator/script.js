class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstNum: 0,
      operator: '',
      lastNum: '',
      result: '',
      displayResult: false,
    };
    window.addEventListener('click', (e) => updateDisplay(e));

    let updateDisplay = (e) => {
      switch (e.target.className) {
        case 'button number':
          this.updateNum(e);
          break;
        case 'button math':
          this.doMath(e);
          break;
        case 'button decimal':
          this.addDecimal(e);
          break;
        case 'button clear':
          this.clearDisplay(e);
          break;
        case 'button equals':
          this.result();
          break;
      }
    };
  }

  updateNum = (e) => {
    if (this.state.displayResult === false) {
      if (document.getElementById('display').innerText === '0') {
        this.setState({
          firstNum: '' + e.target.innerText,
        });
      } else if (
        this.state.firstNum !== '0' &&
        this.state.operator === '' &&
        this.state.displayResult === false
      ) {
        this.setState({
          firstNum: this.state.firstNum + e.target.innerText,
        });
      } else {
        if (this.state.lastNum === '0' && e.target.innerText === '0') {
          return;
        } else {
          this.setState({
            lastNum: this.state.lastNum + e.target.innerText,
          });
        }
      }
    } else if (this.state.operator !== '') {
      this.setState({
        lastNum: this.state.lastNum + e.target.innerText,
      });
    }
  };

  doMath = (e) => {
    let isLastCharOfFirstNumDecimal = this.state.firstNum + '';
    if (
      this.state.operator === '' &&
      isLastCharOfFirstNumDecimal.slice(-1) !== '.' &&
      this.state.operator.slice(-1) !== e.target.innerText
    ) {
      this.setState({
        operator: this.state.operator + e.target.innerText,
      });
    } else if (
      isLastCharOfFirstNumDecimal.slice(-1) !== '.' &&
      this.state.lastNum.slice(-1) !== e.target.innerText
    ) {
      console.log('cacca');
      this.setState({
        lastNum: this.state.lastNum + e.target.innerText,
      });
    }
  };

  addDecimal = () => {
    let firstNumToStr = this.state.firstNum + '';
    let secondNumToStr = this.state.lastNum + '';

    if (
      this.state.firstNum !== '' &&
      firstNumToStr.indexOf('.') === -1 &&
      this.state.operator === ''
    ) {
      this.setState({
        firstNum: this.state.firstNum + '.',
      });
    }
    if (this.state.lastNum !== '' && secondNumToStr.indexOf('.') === -1) {
      this.setState({
        lastNum: this.state.lastNum + '.',
      });
    }
  };

  clearDisplay = () => {
    this.setState({
      result: '',
      firstNum: 0,
      operator: '',
      lastNum: '',
      displayResult: false,
    });
  };

  result = () => {
    if (this.state.operator !== '') {
      let filtered = document
        .getElementById('display')
        .innerText.match(/(\*|\+|\/|-)?(\.|\-)?\d+/g)
        .join('');
      this.setState({
        result: (this.state.result = eval(filtered)),
        firstNum: '',
        operator: '',
        lastNum: '',
        displayResult: true,
      });
    }
  };

  render() {
    return (
      <div>
        <div id="calculator">
          <div className="display" id="display">
            {this.state.result}
            {this.state.firstNum}
            {this.state.operator}
            {this.state.lastNum}
          </div>
          <div className="button clear" id="clear">
            C
          </div>
          <div className="button number" id="one">
            1
          </div>
          <div className="button number" id="two">
            2
          </div>
          <div className="button number" id="three">
            3
          </div>
          <div className="button math" id="add">
            +
          </div>
          <div className="button number" id="four">
            4
          </div>
          <div className="button number" id="five">
            5
          </div>
          <div className="button number" id="six">
            6
          </div>
          <div className="button math" id="subtract">
            -
          </div>
          <div className="button number" id="seven">
            7
          </div>
          <div className="button number" id="eight">
            8
          </div>
          <div className="button number" id="nine">
            9
          </div>
          <div className="button math" id="multiply">
            *
          </div>
          <div className="button decimal" id="decimal">
            .
          </div>
          <div className="button number" id="zero">
            0
          </div>
          <div className="button equals" id="equals">
            =
          </div>
          <div className="button math" id="divide">
            /
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Calculator />, document.getElementById('root'));
