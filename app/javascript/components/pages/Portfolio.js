import React, { Component } from "react";
import { Card, Row, Col, CardText, CardTitle, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label} from "reactstrap";
import { Link, Redirect } from "react-router-dom";

class Portfolio extends Component {
  constructor(){
    super();
    this.state = {
      isOpen: false,
      modal: false,
      form: {
        coin_id: '',
        current_quantitiy: '',
        initial_quantity: 0,
      }
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

  toggleModal = (id) => {
    let newOpenModal = !this.state.modal
    this.setState({modal: newOpenModal, form: {...this.state.form, coin_id: id}})
  }
  handleChange = (e) => {
    let { form } = this.state
    form[e.target.name] = e.target.value
    this.setState({ form: form })
  }
  handleSubmit = () => {
    this.props.createNewPortfolio(this.state.form)
    let newOpenModal = !this.state.modal
    this.setState({modal: newOpenModal})
}

  render() {
    console.log("coin", this.props.coins)
    console.log("portfolio coins", this.props.portfolio.coin.id)
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

            return <DropdownItem onClick={() => this.toggleModal(coin.id)}>{coin.name}</DropdownItem>})}
          </DropdownMenu>
        </Dropdown>

        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Adding Value</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="current_quantitiy">Quantity</Label>
                <Input type="number" name="current_quantitiy" placeholder='0' onChange={this.handleChange} value={ this.state.form.current_quantitiy } />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleSubmit}>Submit</Button>{' '}
            <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
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
        </div>
      </>
    );
  }
}

export default Portfolio;
