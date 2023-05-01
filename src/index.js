import React from 'react';
import ReactDOM from 'react-dom';


const API =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

class App extends React.Component {
  state = {
    quotes: [],
    index: 0,
    color: {
      textColor: "#77B1A9",
      backgroundColor: "#77B1A9"
    },
    isClicked: false
  };

  componentDidMount() {
    // call the api and update state
    fetch(API)
      .then((res) => res.json())
      .then((res) => {
        this.setState(
          {
            quotes: res.quotes
          },
          () => {
            this.getRandomIndex;
            const body = document.querySelector("body");
            body.style.backgroundColor = this.state.color.backgroundColor;
          }
        );
      });
  }

  componentDidUpdate() {
    document.body.style.backgroundColor = this.state.color.backgroundColor;
    if(this.state.isClicked){
        setTimeout(()=>{
            this.setState({isClicked:false})
        }, 500)
    }
    document.body.style.transition = "background-color 1s ease-in-out"

  }

  

  getRandomIndex = () => {
    const { quotes } = this.state;

    if (quotes.length > 0) {
      const index = Math.floor(Math.random() * quotes.length);
      const colors = this.getRandomColor();
      this.setState({
        index,
        color: colors
      });
    }
  };

  getRandomColor = () => {
    const colors = [
      "#77B1A9",
      "#73A857",
      "#FF7171",
      "#0F97A0",
      "#E74C3C",
      "#39375B",
      "#2C3E50"
    ];

    const randomIndex = Math.floor(Math.random() * colors.length);
    const randomColor = colors[randomIndex];

    return {
      textColor: randomColor,
      backgroundColor: randomColor
    };
  };

  render() {
    const { quotes, index, color } = this.state;

    const quote = quotes[index];

    const url =
      quote &&
      `https://twitter.com/intent/tweet?text=${quote.quote} - ${quote.author}`;

    quote && console.log(quote.quote);

    return (
      <div
        className="wrapper d-flex align-items-center justify-content-center fade-in"
        style={{ backgroundColor: color.backgroundColor, transition: "background-color 1s ease-in-out"}} 
      >
        <div className="col-5 box p-5 rounded" id="quote-box">
          {quote && (
            <div className="mb-4">
              <p
                id="text"
                className="text-center"
                style={{ color: color.textColor, transition: "color 1s ease-in-out"  }}
              >
                {" "}
                <i class="fa-solid fa-quote-left fa-lg"></i>
                {quote.quote}
              </p>
              <cite
                id="author"
                className="d-block text-right"
                style={{ color: color.textColor, transition: "color 1s ease-in-out"}}
              >
                - {quote.author}
              </cite>
            </div>
          )}

          <div className="d-flex justify-content-between">
            <a
              className="btn opacity"
              target="_top"
              href={url}
              id="tweet-quote"
              style={{ backgroundColor: color.backgroundColor, color: "#fff", transition: "background-color 1s ease-in-out"  }}
            >
              <i className="fab fa-twitter"></i>Tweet
            </a>
            <button
              className="btn opacity"
              id="new-quote"
              onClick={ () =>{
                this.getRandomIndex();
                this.setState({isClicked:true})
              }

              }
              style={{ backgroundColor: color.backgroundColor, color: "#fff", transition: "background-color 1s ease-in-out" }}
            >
              <i className="fas fa-random"></i>
              New Quote
            </button>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));