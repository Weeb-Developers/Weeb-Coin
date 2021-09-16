import React, { Component } from "react";
import {
  Card,
  Row,
  Col,
  CardText,
  CardTitle,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { Link, Redirect } from "react-router-dom";

class Portfolio extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      modal: false,
      addRemoveModal: false,
      form: {
        coin_id: "",
        current_quantity: "",
        initial_quantity: 0,
      },
      holding: "",
    };
  }
  getTotalWorth = () => {
    let sum = 0;
    this.props.portfolios.forEach((portfolio) => {
      sum += portfolio.coin.price * portfolio.current_quantity;
    });
    return sum;
  };

  toggle = () => {
    let newOpenState = !this.state.isOpen;
    this.setState({ isOpen: newOpenState });
  };

  toggleModal = (id) => {
    let newOpenModal = !this.state.modal;
    this.setState({
      modal: newOpenModal,
      form: { ...this.state.form, coin_id: id },
    });
  };
  handleChange = (e) => {
    let { form } = this.state;
    form[e.target.name] = e.target.value;
    this.setState({ form: form });
  };
  handleSubmit = () => {
    this.props.createNewPortfolio(this.state.form);
    let newOpenModal = !this.state.modal;
    this.setState({ modal: newOpenModal });
  };

  toggleUpdateModal = (id, holding) => {
    let updateModal = !this.state.addRemoveModal;
    this.setState({
      addRemoveModal: updateModal,
      form: { ...this.state.form, coin_id: id },
      holding: holding,
    });
  };

  handleUpdateSubmit = (portfolio_id) => {
    this.props.updatePortfolio(this.state.form, portfolio_id);
    let updateModal = !this.state.addRemoveModal;
    this.setState({ addRemoveModal: updateModal });
  };

  render() {
    console.log("coin", this.props.coins);
    console.log("portfolio coins", this.props.portfolios);
    return (
      <>
        <h1>
          Hello {this.props.logged_in && this.props.current_user.username}
        </h1>
        <h3>Total Worth: {this.getTotalWorth()}</h3>
        <Dropdown isOpen={this.state.isOpen} toggle={this.toggle}>
          <DropdownToggle caret>Add Coins:</DropdownToggle>
          <DropdownMenu>
            {this.props.coins &&
              this.props.coins.map((coin) => {
                return (
                  <DropdownItem onClick={() => this.toggleModal(coin.id)}>
                    {coin.name}
                  </DropdownItem>
                );
              })}
          </DropdownMenu>
        </Dropdown>

        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Adding Value</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="current_quantity">Quantity</Label>
                <Input
                  type="number"
                  name="current_quantity"
                  placeholder="0"
                  onChange={this.handleChange}
                  value={this.state.form.current_quantity}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleSubmit}>
              Submit
            </Button>{" "}
            <Button color="secondary" onClick={this.toggleModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        {/*update modal  */}
        {this.props.portfolios &&
          this.props.portfolios.map((portfolio) => {
            return (
              <Modal
                isOpen={this.state.addRemoveModal}
                toggle={this.toggleUpdateModal}
              >
                <ModalHeader toggle={this.toggleUpdateModal}>
                  changing Value
                </ModalHeader>
                <ModalBody>
                  Current holdings: {this.state.holding}
                  <Form>
                    <FormGroup>
                      <Label for="current_quantity">Quantity</Label>
                      <Input
                        type="number"
                        name="current_quantity"
                        onChange={this.handleChange}
                        value={this.state.form.current_quantity}
                      />
                    </FormGroup>
                  </Form>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="primary"
                    onClick={() => this.handleUpdateSubmit(portfolio.id)}
                  >
                    Submit
                  </Button>

                  <Button color="secondary" onClick={this.toggleUpdateModal}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
            );
          })}

        <div>
          Current Crypto Curriences
          {this.props.portfolios &&
            this.props.portfolios.map((portfolio) => {
              return (
                <>
                  <Row key={portfolio.id}>
                    <Col sm="6">
                      <Card body>
                        <Link to={`/coin/${portfolio.coin.id}`}>
                          <CardTitle tag="h5">
                            Name: {portfolio.coin.name}{" "}
                          </CardTitle>
                        </Link>
                        <CardText>Symbol: {portfolio.coin.symbol} </CardText>
                        <CardText>Price: {portfolio.coin.price} </CardText>
                        <CardText>
                          Holdings: {portfolio.current_quantity}
                        </CardText>
                        <CardText>
                          Amount: $
                          {portfolio.coin.price * portfolio.current_quantity}{" "}
                        </CardText>
                        <Link to={`/coin/${portfolio.coin.id}`}>
                          <img src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${portfolio.coin.api_id}.png`}
                            height='64px' width='64px'/>
                        </Link>
                        <Button
                          onClick={() =>
                            this.toggleUpdateModal(
                              portfolio.coin_id,
                              portfolio.current_quantity
                            )
                          }
                        >
                          Add/Remove Coins
                        </Button>
                        <Button
                          onClick={() =>
                            this.props.deletePortfolio(portfolio.id)

                          }
                        >
                          Delete Coin
                        </Button>
                      </Card>
                    </Col>
                  </Row>
                </>
              );
            })}
        </div>
      </>
    );
  }
}

export default Portfolio;
