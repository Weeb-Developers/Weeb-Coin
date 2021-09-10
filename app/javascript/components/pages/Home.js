import React, { Component } from "react";
import { Card, Row, Col, CardText, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";

class Home extends Component {
  constructor() {
    super();
  }

  formatLastUpdated = (updateTime) => {
    
    let current_datetime = new Date(updateTime)
    let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds() 
    return formatted_date
  }

  render() {
    return (
      <section className="home-page">
        <div className="home-page-div">
          <h1>
            Hello {this.props.logged_in && this.props.current_user.username}
          </h1>
          Current Crypto Curriences
          {this.props.coins &&
            this.props.coins.map((coin) => {
              return (
                <Row key={coin.id}>
                  <Col sm="6">
                    <Link to={`/coin/${coin.id}`}>
                      <Card body>
                        <CardText>{coin.symbol} </CardText>
                        <img src={coin.logo} width="300px" height="auto" />
                        <CardText>{coin.name} </CardText>
                        <CardText>Price: ${coin.price} </CardText>
                        <CardText>Last Updated: {this.formatLastUpdated(coin.last_updated)} </CardText>
                      </Card>
                    </Link>
                  </Col>
                </Row>
              );
            })}
        </div>
      </section>
    );
  }
}

export default Home;
