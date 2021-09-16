import React, { Component } from "react";
import { Card, Row, Col, CardText, CardTitle } from "reactstrap";

class Coin extends Component {
  constructor() {
    super();
  }

  formatLastUpdated = (updateTime) => {

    let current_datetime = new Date(updateTime)
    let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds()
    return formatted_date
  }

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
            <CardText>Last Updated: {this.formatLastUpdated(coin.last_updated)} </CardText>
            <CardText>Market Cap: {coin.market_cap} </CardText>
            <CardText>Total Supply: {coin.total_supply} </CardText>
            <CardText>Volume in last 24H: {coin.volume_24h} </CardText>

            <img src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.api_id}.png`}
              height='64px' width='64px'/>
          </Card>
        </Col>
      </Row>
    );
  }
}
export default Coin;
