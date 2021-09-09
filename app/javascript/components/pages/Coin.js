import React, { Component } from "react";
import { Card, Row, Col, CardText, CardTitle } from "reactstrap";

class Coin extends Component {
  render() {
    const { coin } = this.props;
    return (
      <Row key={coin.id}>
        <Col sm="6">
          <Card body>
            <CardTitle tag="h5">Crypto {coin.id}</CardTitle>
            <CardText>Name: {coin.name} </CardText>
            <CardText>Symbol: {coin.symbol} </CardText>
            <CardText>Price: {coin.price} </CardText>
            <CardText>Last Updated: {coin.last_updated} </CardText>
            <CardText>Market Cap: {coin.market_cap} </CardText>
            <CardText>Total Supply: {coin.total_supply} </CardText>
            <CardText>Volume in last 24H: {coin.volume_24h} </CardText>

            <img src={coin.logo} width="300px" height="auto" />
          </Card>
        </Col>
      </Row>
    );
  }
}
export default Coin;
