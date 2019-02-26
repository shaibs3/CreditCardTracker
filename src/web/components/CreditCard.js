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
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      password2: '',
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
    onFormSubmit(this.state)
      .then(() => history.push('/login'))
      .catch(e => console.log(`Error: ${e}`));
  }

  render() {
    const { loading, error } = this.props;
    const {
      firstName,
      lastName,
      email,
      password,
      password2,
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
                   
                    <Input type="select" name="select" id="exampleSelect">
                      <option  >Visa</option>
                      <option className="icon-home">Master card</option>
                      <option className="icon-notebook">American express</option>
                      <option>Diners</option>
                      <option>Other</option>
                    </Input>
                  </FormGroup>

                  <FormGroup>
                    <Label for="cardType">
                      Last 4 digits
                    </Label>
                    <Input
                      type="text"
                      name="cardType"
                      id="cardType"
                      placeholder="1234"
                      value={firstName}
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
