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

  render() {
    const {
      logged_in,
      current_user,
      new_user_route,
      sign_in_route,
      sign_out_route,
    } = this.props;

    return (
      <Router>
        <Header
          logged_in={logged_in}
          sign_in_route={sign_in_route}
          sign_out_route={sign_out_route}
        />
        <Switch>
          {/* <Route exact path='/' component={ <Home />}/> */}

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
                  coins={this.state.coins.filter((coin) => coin.id === this.state.portfolios.coin_id)}
                  portfolios={this.state.portfolios.filter(
                      (portfolio) => portfolio.user_id === current_user.id)}
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
