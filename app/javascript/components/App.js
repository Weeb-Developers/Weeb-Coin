import React, { Component } from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

//Components
import Header from './components/Header.js';
import Footer from "./components/Footer.js";

//Pages
import Home from './pages/Home'
import Coin from "./pages/Coin.js";
import AboutUs from "./pages/AboutUs.js";
import CryptoInfo from "./pages/CryptoInfo.js";
import Portfolio from "./pages/Portfolio.js";
import NotFound from "./pages/NotFound";

class App extends Component {
  constructor(){
    super()
      this.state = { 
        coins: []
      }
  }
  componentDidMount() {
    this.getCoins()
  }

  getCoins = () => {
    fetch("/coins")
    .then(response => {
      return response.json()
    })
    .then(payload => {
      // set the state with the data from the backend into the empty array
      this.setState({ coins: payload })
    })
    .catch(errors => {
      console.log("index errors:", errors)
    })
  }
  
  render () {
    const {
      logged_in,
      current_user,
      new_user_route,
      sign_in_route,
      sign_out_route
    } = this.props
    console.log(this.state.coins)
    return (
      <Router>
        <Header
          logged_in={logged_in}
          sign_in_route={sign_in_route}
          sign_out_route={sign_out_route}
        />
        <Switch>
          <Route path='/' render={ (props) => {
            <Home coins={ this.state.coins } />}}/>

          <Route path='/aboutus' component={ AboutUs }/>
          <Route path='/coin' component={ Coin }/>
          <Route path='/cryptoinfo' component={ CryptoInfo }/>
          <Route path='/portfolio' component={ Portfolio }/>
          <Route component={ NotFound }/>
        </Switch>
        <Footer 
          logged_in
        />
      </Router>
    );
  }
}

export default App;
