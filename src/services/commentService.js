import { app } from "../utils/firebaseInit";
let rootRef = app.database().ref().child("reviews");

export function saveData(review, userID) {
  rootRef
    .push()
    .set({
      comment: review.comment,
      username: review.username,
      movieID: review.movieID,
      userID: userID,
    })
    .catch((err) => {
      console.log("err ->", err);
    });
}

export function deleteReview(id) {
  rootRef
    .child(id)
    .remove()
    .catch((err) => {
      console.log("err ->", err);
    });
}

// saving user's favorite movies in firebase
export function saveUsersFavMovie(userID, movieID){
  app.database().ref(`/favoriteMovies/${userID}/${movieID}`).set({
    movieId: movieID
  }).catch(err => {
    console.log('err ->', err);
  });
}
export function removeFavoriteMovie(userID, movieID){
  app.database().ref(`/favoriteMovies/${userID}/${movieID}`).remove().catch(err => {
    console.log('err -> ', err);
  });
}
