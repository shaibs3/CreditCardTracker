import ErrorMessages from '../constants/errors';
import statusMessage from './status';
import { Firebase, FirebaseRef } from '../lib/firebase';


/**
  * Sign Up to Firebase
  */
export function createCreditCard(formData)
{

  const {
    cardType,
    lastFourDigits,
    member
  } = formData;

  return dispatch => new Promise(async (resolve, reject) =>
  {
    // Validation checks
    if (!cardType) return reject({ message: ErrorMessages.missingCardType });
    if (!lastFourDigits) return reject({ message: ErrorMessages.missingLast4Digits })
    await statusMessage(dispatch, 'loading', true);

    //Go to Firebase
    // Send user details to Firebase database
    let ref = FirebaseRef.child(`users/${member.uid}/cards/${cardType}_${lastFourDigits}`)
    return ref.set({
      cardType,
      lastFourDigits,
    }).then(() => statusMessage(dispatch, 'loading', false).then(resolve));


  }).catch(async (err) =>
  {
    await statusMessage(dispatch, 'loading', false);
    throw err.message;
  });

}


export function getCreditCards()
{

  if (Firebase === null) return () => new Promise(resolve => resolve());

  // Firebase.auth().onAuthStateChanged(function(user) {
  //   if (user) {
  //   const UID = user.uid;
  //   if (!UID) return false;
  //   const ref = FirebaseRef.child(`users/${UID}/`);

  //   return ref.on('value', (snapshot) => {
  //     const favs = snapshot.val() || [];
  //   })
  //     // User is signed in.
  //   } else {
  //     // No user is signed in.
  //   }
  //});


  //return dispatch => new Promise((resolve, reject) =>  {})
  // FirebaseRef.child('meals').once('value').then((snapshot) => {
  //   const meals = snapshot.val() || [];

  //   return resolve(dispatch({
  //     type: 'MEALS_REPLACE',
  //     data: meals,
  //   }));
  // }).catch(reject)).catch(e => console.log(e));

  //   });
}
