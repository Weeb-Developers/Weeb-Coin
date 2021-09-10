import React, { Component } from "react";
import { Card, Row, Col, CardText, CardTitle, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
class Portfolio extends Component {
  constructor(){
    super();
    this.state = {
      isOpen: false
    }
  }
  getTotalWorth = () => {
    let sum = 0
    this.props.portfolios.forEach(portfolio => {
      sum += portfolio.coin.price * portfolio.current_quantitiy
    })
    return sum
  }

  toggle = () => {
    let newOpenState = !this.state.isOpen
    this.setState({isOpen: newOpenState})};

  handleClick = () => {this.state.submitted && <Redirect to='/apartmentindex'/>}

  render() {
    console.log("coins", this.props.coins)
    return (
      <>
        <h1>
          Hello {this.props.logged_in && this.props.current_user.username}
        </h1>
        <h3>Total Worth: {this.getTotalWorth()}</h3>
        <Dropdown isOpen={this.state.isOpen} toggle={this.toggle}>
          <DropdownToggle caret>
            Add Coins:
          </DropdownToggle>
          <DropdownMenu>
            {this.props.coins && this.props.coins.map((coin) => {
            return <DropdownItem onClick={this.handleClick}>{coin.name}</DropdownItem>})}
          </DropdownMenu>
        </Dropdown>
        <div>
          Current Crypto Curriences
          {this.props.portfolios.map((portfolio) =>{
              return (
                <Row key={portfolio.id}>
                  <Col sm="6">
                    <Link to={`/coin/${portfolio.coin.id}`}>
                      <Card body>
                        <CardTitle tag="h5">Name: {portfolio.coin.name} </CardTitle>
                        <CardText>Symbol: {portfolio.coin.symbol} </CardText>
                        <CardText>Price: {portfolio.coin.price} </CardText>
                        <CardText>Holdings: {portfolio.current_quantitiy} </CardText>
                        <CardText>Amount: ${portfolio.coin.price * portfolio.current_quantitiy} </CardText>
                        <img src={portfolio.coin.logo} width="300px" height="auto" />
                      </Card>
                    </Link>
                  </Col>
                </Row>
              );
            })}
          {console.log(this.props.portfolio && this.props.portfolio)}
        </div>
      </>
    );
  }
}

export default Portfolio;
