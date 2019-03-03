import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Card,
  Form,
  Label,
  Alert,
  Input,
  Button,
  CardBody,
  FormGroup,
  CardHeader,
} from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import Loading from './Loading';
import logo from '../../images/launch.png';


class CreditCard extends React.Component {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  }

  static defaultProps = {
    error: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      cardType: 'Visa',
      lastFourDigits: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { onFormSubmit, history } = this.props;
    let formData = {
      cardType: this.state.cardType,
      lastFourDigits:this.state.lastFourDigits,
      member:this.props.member
    }
    onFormSubmit(formData)
      .then(() => history.push('/'))
      .catch(e => console.log(`Error: ${e}`));
  }

  render() {
    const { loading, error } = this.props;
    const {
      cardType,
      lastFourDigits
    } = this.state;

    // Loading
    if (loading) return <Loading />;

    return (
      <div>
        <Row>
          <Col lg={{ size: 6, offset: 3 }}>
            <Card>
              <CardHeader>
                Add a new credit card
              </CardHeader>
              <CardBody>
                {!!error && (
                  <Alert color="danger">
                    {error}
                  </Alert>
                )}
                <Form onSubmit={this.handleSubmit}>
                
                  <FormGroup>
                    <Label for="cardType">
                      Card type
                    </Label>
                   
                    <Input type="select" name="cardType" id="cardType"
                    onChange={this.handleChange}>
                      <option value="Visa">Visa</option>
                      <option value="Master card">Master card</option>
                      <option value="American express"> American express</option>
                      <option value="Dinerss">Dinerss</option>
                      <option value="Other">Other</option>
                    </Input>
                  </FormGroup>

                  <FormGroup>
                    <Label for="lastFourDigits">
                      Last 4 digits
                    </Label>
                    <Input
                      type="text"
                      name="lastFourDigits"
                      id="lastFourDigits"
                      placeholder="1234"
                      value={lastFourDigits}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
  


                  <Button color="primary">
                    Submit
                  </Button>
                </Form>
                <hr />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(CreditCard);
