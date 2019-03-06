import React from 'react';
import PropTypes from 'prop-types';
import paginationFactory from 'react-bootstrap-table2-paginator';
import
{
  Row,
  Col,
  Card,
  CardText,
  CardBody,
  CardHeader,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import ErrorMessages from '../../constants/errors';
import Loading from './Loading';
import Error from './Error';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import { Button } from 'reactstrap';
import StickyModalForm from 'modal-form/sticky';
 
class WithSticky extends React.Component {
  render() {
    return <span>
      <button type="button" onClick={this.openTooltip}>I have a tooltip.</button>
      {this.state.tooltipIsOpen
        ? <StickyModalForm onCancel={this.closeTooltip}>
            <p>Here it is.</p>
          </StickyModalForm>
        : <small>But it’s hidden.</small>}
    </span>;
  }
}

const RecipeView = ({
  error,
  loading,
  recipes,
  recipeId,
}) =>
{
  debugger;
  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  // Get this Recipe from all recipes
  let recipe = null;
  // if (recipeId && recipes) {
  //   recipe = recipes.find(item => parseInt(item.id, 10) === parseInt(recipeId, 10));
  // }

  // // Recipe not found
  // if (!recipe) return <Error content={ErrorMessages.recipe404} />;

  // Build Ingredients listing
  // const ingredients = recipe.ingredients.map(item => (
  //   <ListGroupItem key={`${item}`}>
  //     {item}
  //   </ListGroupItem>
  // ));

  // // Build Method listing
  // const method = recipe.method.map(item => (
  //   <ListGroupItem key={`${item}`}>
  //     {item}
  //   </ListGroupItem>
  // ));






  const columns = [
    {
      dataField: 'id',
      text: 'Product ID'
    },

    {
      dataField: 'date',
      text: 'Date',
      formatter: (cell) =>
      {
        let dateObj = cell;
        if (typeof cell !== 'object')
        {
          dateObj = new Date(cell);
        }
        return `${('0' + dateObj.getDate()).slice(-2)}/${('0' + (dateObj.getMonth() + 1)).slice(-2)}/${dateObj.getFullYear()}`;
      },
      editor: {
        type: Type.DATE
      }
    },
    {
      dataField: 'price',
      text: 'Price'
    },];

  const products = [
    { id: 2, date: 2 / 1 / 2013, price: 3 },
    { id: 2, date: 2 / 1 / 2013, price: 3 },
    { id: 2, date: 2 / 1 / 2013, price: 3 },
    { id: 2, date: 2 / 1 / 2013, price: 3 },
    { id: 2, date: 2 / 1 / 2013, price: 3 },
    { id: 2, date: 2 / 1 / 2013, price: 3 },
    { id: 2, date: 2 / 1 / 2013, price: 3 },
    { id: 2, date: 2 / 1 / 2013, price: 3 },
    { id: 2, date: 2 / 1 / 2013, price: 3 },
    { id: 2, date: 2 / 1 / 2013, price: 3 }];










  return (
    <div>
      <Helmet>
        {/* <title>{recipe.title}</title> */}
        <title>"sshshs"</title>
      </Helmet>
      <BootstrapTable keyField='id'
        data={products}
        columns={columns}
        pagination={ paginationFactory() }
        cellEdit={cellEditFactory({
          mode: 'click',
          onStartEdit: (row, column, rowIndex, columnIndex) => { console.log('start to edit!!!'); },
          beforeSaveCell: (oldValue, newValue, row, column) => { console.log('Before Saving Cell!!'); },
          afterSaveCell: (oldValue, newValue, row, column) => { console.log('After Saving Cell!!'); }
        })} />
      <div style={{ textAlign: "center" }}>
        <Button color="success"  onClick={() => this.setState({showModal: true})}>Add</Button>
      </div>
    </div>
  );
};

RecipeView.propTypes = {
  error: PropTypes.string,
  // loading: PropTypes.bool.isRequired,
  recipeId: PropTypes.string.isRequired,
  // recipes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

RecipeView.defaultProps = {
  error: null,
};

export default RecipeView;
