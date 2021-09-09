import React, { Component } from 'react';
import { Card, Row , Col, CardText, CardTitle} from 'reactstrap';

class Home extends Component {
    render() {
        return (
            <>
                <h1>Hello {this.props.logged_in && this.props.current_user.username}</h1>
                <div>Current Crypto Curriences 
                    {this.props.coins && this.props.coins.map(coin => {
                        return (
                            <Row key={ coin.id } >
                                <Col sm='6'>
                                    <Card body>
                                        <CardTitle tag="h5">Crypto { coin.id }</CardTitle>
                                        <CardText>Name: {coin.name} </CardText>
                                        <CardText>Symbol: { coin.symbol } </CardText>
                                        <CardText>Price: { coin.price } </CardText>
                                        <CardText>Last Updated: { coin.last_updated } </CardText>
                                        <img src={ coin.logo } width='300px' height='auto' />
                                    </Card>
                                </Col>
                            </Row>
                        )    
                    })}
                </div>
            </>
        );
    }
}

export default Home;