import React from 'react';
import PropTypes from 'prop-types';
import paginationFactory from 'react-bootstrap-table2-paginator';
import {
  Row,
  Col,
  Card,
  CardText,
  CardBody,
  CardHeader,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';
import {
  Helmet
} from 'react-helmet';
import {
  Link
} from 'react-router-dom';
import ErrorMessages from '../../constants/errors';
import Loading from './Loading';
import Error from './Error';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, {
  Type
} from 'react-bootstrap-table2-editor';
import {
  Button
} from 'reactstrap';

import AddNewBill from './AddNewBill'
import {
  Firebase,
  FirebaseRef
} from '../../lib/firebase';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
var results = [];

function getResults(param) {
  var results = [];
  Object.keys(param).forEach(function (year) {
    Object.keys(param[year]).forEach(function (month) {
      Object.keys(param[year][month]).forEach(function (day) {
        Object.keys(param[year][month][day]).forEach(function (id) {

          let item = {
            id: id,
            date: "" + year + "-" + month + "-" + day,
            price: param[year][month][day][id].price,
            title: param[year][month][day][id].title
          }

          results.push(item);
        });
      });
    });
  });

  return results;
}
const MyExportCSV = (props) => {
  const handleClick = () => {
    props.onExport();
  };
  return ( < div >
    <button className = "btn btn-success"
    onClick = {
      handleClick
    } > Export to CSV </button> </div >
  );
};

class RecipeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };

  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
  }

  handleSave(expanseTitle, date, price) {

    let uid = this.props.member.uid;
    let card = this.props.recipeId;
    var res = date.split("-");
    var year = res[0];
    var month = res[1];
    var day = res[2];

    //Send user details to Firebase database
    let ref = FirebaseRef.child(`users/${uid}/cards/${card}/dates/${year}/${month}/${day}`)
    return ref.push({
      price: price,
      title: expanseTitle,
    }) //.then(() => statusMessage(dispatch, 'loading', false).then(resolve));

  }
  handleDelete(id, date) {

    let uid = this.props.member.uid;
    let card = this.props.recipeId;
    var res = date.split("-");
    var year = res[0];
    var month = res[1];
    var day = res[2];

    //    //Send user details to Firebase database
    // let ref = FirebaseRef.child(`users/${uid}/cards/${card}/dates/${year}/${month}/${day}`)
    // return ref.push({
    //   price: price,
    //   title: expanseTitle,
    // })//.then(() => statusMessage(dispatch, 'loading', false).then(resolve));

  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    // Loading
    if (this.props.loading) return <Loading/> ;

    // Error
    if (this.props.error) return <Error content = {
      this.props.error
    }
    />;

    // Get this Recipe from all recipes
    let recipe = null;
    const selectRow = {
      mode: 'checkbox',
      clickToSelect: true,
      bgColor: '#00BFFF'
    };
    const columns = [{
        dataField: 'id',

        hidden: true
      },

      {
        dataField: 'date',
        text: 'Date',
        formatter: (cell) => {
          let dateObj = cell;
          if (typeof cell !== 'object') {
            dateObj = new Date(cell);
          }
          return `${('0' + dateObj.getDate()).slice(-2)}/${('0' + (dateObj.getMonth() + 1)).slice(-2)}/${dateObj.getFullYear()}`;
        },
        editor: {
          type: Type.DATE
        }
      },
      {
        dataField: 'title',
        text: 'Title',
      },
      {
        dataField: 'price',
        text: 'Price'
      },
    ];

    const products = getResults(this.props.recipes.recipes)

    return ( <div>
      <Helmet> {
        /* <title>{recipe.title}</title> */
      } <title> "sshshs" </title> </Helmet>


      <ToolkitProvider keyField = "id"
      data = {products}
      columns = {columns}
      exportCSV selectRow = {selectRow}
      pagination = {paginationFactory()}
      cellEdit = {cellEditFactory({
          mode: 'click',
          onStartEdit: (row, column, rowIndex, columnIndex) => {
            console.log('start to edit!!!');
          },
          beforeSaveCell: (oldValue, newValue, row, column) => {
            console.log('Before Saving Cell!!');
          },
          afterSaveCell: (oldValue, newValue, row, column) => {
            console.log('After Saving Cell!!');
          }
        })}
> 
{

  props => (<div>
    {/* <MyExportCSV {...props.csvProps}
    /> <hr/> */}
    <BootstrapTable {...props.baseProps}
    /> </div >
  )
}
       </ToolkitProvider>


      <div style = {
        {
          textAlign: "center"
        }
      } >
      <AddNewBill handleSave = {
        this.handleSave.bind(this)
      }
      handleDelete = {
        this.handleDelete.bind(this)
      }
      /> </div >
      </div>
    );
  }
}

RecipeView.propTypes = {
  //error: PropTypes.string,
  // loading: PropTypes.bool.isRequired,
  //  recipeId: PropTypes.string.isRequired,
  // recipes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

RecipeView.defaultProps = {
  error: null,
};

export default RecipeView;
