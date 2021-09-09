import React, { Component } from "react";
import { Card, Row, Col, CardText, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";
class Portfolio extends Component {


  render() {
    return (
      <>
        <h1>
          Hello {this.props.logged_in && this.props.current_user.username}
        </h1>
        <h3>Total Worth: ${this.props.total_worth && this.props.total_worth}</h3>
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
