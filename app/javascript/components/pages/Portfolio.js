import React, { Component } from "react";
import { Card, Row, Col, CardText, CardTitle, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
// import { Modal, Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
class Portfolio extends Component {
  constructor(){
    super();
    this.state = {
      isOpen: false,
      modal: false,
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

  // handleClose = () => {
  //   this.setState({show: false})
  // }

  // handleShow = () => {
  //   this.setState({show: !this.state.show})
  // }

  toggleModal = () => {
    let newOpenModal = !this.state.modal
    this.setState({modal: newOpenModal})
  }


  // handleClick = () => {this.state.submitted && <Redirect to='/apartmentindex'/>}

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
            return <DropdownItem onClick={this.toggleModal()}>{coin.name}</DropdownItem>})}
          </DropdownMenu>
        </Dropdown>

        <Modal isOpen={this.state.modal} toggle={this.toggleModal()}>
          <ModalHeader toggle={this.toggleModal()}>Modal title</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggleModal()}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggleModal()}>Cancel</Button>
          </ModalFooter>
        </Modal>

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
