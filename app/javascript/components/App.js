import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Components
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";

//Pages
import Home from "./pages/Home";
import Coin from "./pages/Coin.js";
import AboutUs from "./pages/AboutUs.js";
import CryptoInfo from "./pages/CryptoInfo.js";
import Portfolio from "./pages/Portfolio.js";
import NotFound from "./pages/NotFound";

class App extends Component {
  constructor() {
    super();
    this.state = {
      coins: [],
      portfolios: [],
    };
  }
  componentDidMount() {
    this.getCoins();
    this.getPortfolio();
    this.getAPI();
  }
  getAPI = () => {
    fetch("/api-data")
    }

  getCoins = () => {
    fetch("/coins")
      .then((response) => {
        return response.json();
      })
      .then((payload) => {
        // set the state with the data from the backend into the empty array
        this.setState({ coins: payload });
      })
      .catch((errors) => {
        console.log("index errors:", errors);
      });
  };

  getPortfolio = () => {
    fetch("/portfolios")
      .then((response) => {
        return response.json();
      })
      .then((payload) => {
        // set the state with the data from the backend into the empty array
        this.setState({ portfolios: payload });
      })
      .catch((errors) => {
        console.log("index errors:", errors);
      });
  };

  createNewPortfolio = (newPortfolio) => {
    fetch("/portfolios", {
      body: JSON.stringify(newPortfolio),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then((response) => {
        if (response.status === 422) {
          alert("Something is wrong with your submission.");
        }
        return response.json();
      })
      .then(() => this.getPortfolio())
      .catch((errors) => console.log("Create errors:", errors));
  };
  updatePortfolio = (updatePortfolio, id) => {
    fetch(`/portfolios/${id}`, {
      body: JSON.stringify(updatePortfolio),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
    })
      .then((response) => {
        if (response.status === 422) {
          alert("There is something wrong with your submission.");
        }
        return response.json();
      })
      .then(() => this.getPortfolio())
      .catch((errors) => console.log("edit errors:", errors));
  };
  deletePortfolio = (id) => {
    fetch(`/portfolios/${id}`, {
      headers: {
        "Content-Type" : "application/json"
      },
      method: "DELETE"
    })
    .then(response => response.json())
    .then(payload => this.getPortfolio())
    .catch(errors => console.log("Portfolio delete errors:", errors))
  }

  render() {
    const {
      logged_in,
      current_user,
      new_user_route,
      sign_in_route,
      sign_out_route,
    } = this.props;

    const API_KEY = process.env.REACT_APP_API_KEY
    console.log('key', API_KEY)

    return (
      <Router>
        <Header
          logged_in={logged_in}
          sign_in_route={sign_in_route}
          sign_out_route={sign_out_route}
        />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Home
                logged_in={logged_in}
                current_user={current_user}
                coins={this.state.coins}
              />
            )}
          />

          <Route path="/aboutus" component={AboutUs} />
          <Route
            path="/coin/:id"
            render={(props) => {
              let id = props.match.params.id;
              let coin = this.state.coins.find((coin) => coin.id === +id);
              return <Coin coin={coin} logged_in={logged_in} />;
            }}
          />

          <Route path="/cryptoinfo" component={CryptoInfo} />
          <Route
            path="/portfolio"
            render={(props) => {
              return (
                <Portfolio
                  logged_in={logged_in}
                  current_user={current_user}
                  portfolios={this.state.portfolios}
                  coins={this.state.coins}
                  createNewPortfolio={this.createNewPortfolio}
                  updatePortfolio={this.updatePortfolio}
                  deletePortfolio={this.deletePortfolio}
                />
              );
            }}
          />

          <Route component={NotFound} />
        </Switch>
        <Footer logged_in={logged_in} />
      </Router>
    );
  }
}

export default App;
