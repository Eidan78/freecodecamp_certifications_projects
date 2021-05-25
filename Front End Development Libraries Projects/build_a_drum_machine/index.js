const bank = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
  },
];

let keyPlaySound = (e) => {
  let audio = document.getElementById(e.key.toUpperCase());
  if (audio) {
    audio.play();
    audio.currentTime = 0;
    handleClassesKey(e);
    window.updateDisplayFromOutside.updateDisplayKey(e);
  }
};

let clickPlaySound = ({ letter }) => {
  let clickedButton = document.getElementById(letter.keyTrigger);
  if (clickedButton && clickedButton.paused) {
    clickedButton.play();
  } else if (clickedButton) {
    clickedButton.currentTime = 0;
  }
  handleClassesButton({ letter });
};

let handleClassesButton = ({ letter }) => {
  let clicked = document.getElementById(letter.keyTrigger).parentElement;
  clicked.classList.add('pressed');
  setTimeout(() => {
    clicked.classList.remove('pressed');
  }, 200);
};

let handleClassesKey = (e) => {
  let element = document.getElementById(e.key.toUpperCase()).parentElement;
  element.classList.add('pressed');
  setTimeout(() => {
    element.classList.remove('pressed');
  }, 100);
};

window.addEventListener('keypress', keyPlaySound, false);

class DrumMachine extends React.Component {
  constructor(props) {
    super(props);
    window.updateDisplayFromOutside = this;
    this.state = {
      displayText: 'Play a sound',
    };
  }

  updateDisplayButton({ letter }) {
    this.setState({
      displayText: 'Playing ' + letter.keyTrigger,
    });
  }

  updateDisplayKey(e) {
    this.setState({
      displayText: 'Playing ' + e.key.toUpperCase(),
    });
  }

  render() {
    return (
      <div id="container">
        <div id="display">
          <h1>{this.state.displayText}</h1>
        </div>
        <div id="drum-machine">
          {bank.map((letter) => {
            return (
              <div
                id="single-pad"
                className="drum-pad unpressed"
                key={letter.keyCode}
                onClick={() => {
                  clickPlaySound({ letter });
                  {
                    this.updateDisplayButton({ letter });
                  }
                }}
              >
                {letter.keyTrigger}
                <audio
                  src={letter.url}
                  className="clip"
                  id={letter.keyTrigger}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return <DrumMachine />;
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
