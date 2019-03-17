import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';
import {
  connect
} from 'react-redux';

import {
  getRecipes,
  getMeals,
  setError
} from '../actions/recipes';

class RecipeListing extends Component {
  static propTypes = {
    //Layout: PropTypes.func.isRequired,
    // recipes: PropTypes.shape({
    //  loading: PropTypes.bool.isRequired,
    // error: PropTypes.string,
    // recipes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    //}).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({}),
    }),
    fetchRecipes: PropTypes.func.isRequired,
    fetchMeals: PropTypes.func.isRequired,
    showError: PropTypes.func.isRequired,
  }

  static defaultProps = {
    match: null,
  }

  componentDidMount() {
    this.fetchRecipes(this.props.location.pathname);
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.match.url !== this.props.match.url) {
      this.fetchRecipes(nextProps.match.url);
    }
  }

  /**
   * Fetch Data from API, saving to Redux
   */
  fetchRecipes = (path) => {
    const {
      fetchRecipes,
      fetchMeals,
      showError
    } = this.props;
    let uid = this.props.member.uid
    return fetchRecipes(path, uid)
      .then(() => console.log("conplete"))
      .catch((err) => {
        console.log(`Error: ${err}`);
        return showError(err);
      });
  }

  render = () => {
    const {
      Layout,
      recipes,
      match,
      member
    } = this.props;
    const id = (match && match.params && match.params.id) ? match.params.id : null;
    return ( <
      Layout recipeId = {
        id
      }
      // error={recipes.error}
      member = {
        member
      }
      // loading={recipes.loading}
      recipes = {
        this.props.recipes
      }
      cards = {
        this.props.member.cards
      }
      reFetch = {
        () => this.fetchRecipes()
      }
      />
    );
  }
}

const mapStateToProps = state => ({
  member: state.member || {},
  recipes: state.recipes
});

const mapDispatchToProps = {
  fetchRecipes: getRecipes,
  fetchMeals: getMeals,
  showError: setError,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeListing);
//export default RecipeListing;
