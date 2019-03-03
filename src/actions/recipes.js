import { Firebase, FirebaseRef } from '../lib/firebase';

/**
  * Get this User's Favourite Recipes
  */
export function getFavourites(dispatch)
{
  if (Firebase === null) return () => new Promise(resolve => resolve());

  const UID = Firebase.auth().currentUser.uid;
  if (!UID) return false;

  const ref = FirebaseRef.child(`favourites/${UID}`);

  return ref.on('value', (snapshot) =>
  {
    const favs = snapshot.val() || [];

    return dispatch({
      type: 'FAVOURITES_REPLACE',
      data: favs,
    });
  });
}

/**
  * Reset a User's Favourite Recipes in Redux (eg for logou)
  */
export function resetFavourites(dispatch)
{
  return dispatch({
    type: 'FAVOURITES_REPLACE',
    data: [],
  });
}

/**
  * Update My Favourites Recipes
  */
export function replaceFavourites(newFavourites)
{
  if (Firebase === null) return () => new Promise(resolve => resolve());

  const UID = Firebase.auth().currentUser.uid;
  if (!UID) return false;

  return () => FirebaseRef.child(`favourites/${UID}`).set(newFavourites);
}

/**
  * Get Meals
  */
export function getMeals()
{
  debugger;

  const UID = (
    FirebaseRef
    && Firebase
    && Firebase.auth()
    && Firebase.auth().currentUser
    && Firebase.auth().currentUser.uid
  ) ? Firebase.auth().currentUser.uid : null;

  if (!UID) return false;



  return dispatch => new Promise(async (resolve, reject) =>
  {


    const ref = FirebaseRef.child(`users/${UID}`);

    return ref.on('value', (snapshot) =>
    {
      const userData = snapshot.val() || [];
      debugger;
      return dispatch({
        type: 'USER_DETAILS_UPDATE',
        data: userData,
      });
    });

  })


}

/**
  * Set an Error Message
  */
export function setError(message)
{
  return dispatch => new Promise(resolve => resolve(dispatch({
    type: 'RECIPES_ERROR',
    data: message,
  })));
}

/**
  * Get Recipes
  */
export function getRecipes()
{
  if (Firebase === null) return () => new Promise(resolve => resolve());

  return dispatch => new Promise(resolve => FirebaseRef.child('recipes')
    .on('value', (snapshot) =>
    {
      const recipes = snapshot.val() || [];
      

      return resolve(dispatch({
        type: 'RECIPES_REPLACE',
        data: recipes,
      }));
    })).catch(e => console.log(e));
}
