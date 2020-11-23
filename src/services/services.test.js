import { app } from "../utils/firebaseInit";
import { saveUserId, getUserId, logoutUser, isNewUser } from './authService';
import { getAllMovies, getPopularMovies, getMovie,getMoviesByGenre, getRelatedMovies } from './movieService';
import "babel-polyfill";
//import { saveData, deleteReview, saveUsersFavMovie, removeFavoriteMovie } from './commentService';

describe("AuthServiceTest", () =>{
    it("saveUserId", () => {
    saveUserId(1);
    jest.spyOn(window.localStorage.__proto__, 'setItem');
  });
  it("getUserId", () => {
    getUserId();
    jest.spyOn(window.localStorage.__proto__, 'getItem');
  });
  it("logoutUser", () => {
    logoutUser();
    jest.spyOn(window.localStorage.__proto__, 'removeItem');
  });
  it("isNewUser", () => {
    isNewUser();
    jest.spyOn(window.localStorage.__proto__, 'getItem');
    jest.spyOn(window.localStorage.__proto__, 'removeItem');
  });
})
describe("movieService", () =>{
it('getAllMovies', async () => {
    let {data: movies} = await getAllMovies(); 
    expect(movies.length).toBeGreaterThan(0);
});
it('getPopularMovies', async () => {
    let {data: movies} = await getPopularMovies(); 
    expect(movies.length).toBeGreaterThan(0);
});
it('getMovie', async () => {
    const object = {
    "_id": "5f6369a77d6e5c42e045c177",
    "title": "#Saraitda ",
    "year": "2020",
    "duration": "1h 38min ",
    "rating": 6.2,
    "description": "The rapid spread of an unknown infection has left an entire city in ungovernable chaos, but one survivor remains alive in isolation. It is his story.\n EN",
    "director": "Il Cho",
    "actors": [
        {
            "_id": "5f6369a77d6e5c42e045c178",
            "fullName": "Ah-In Yoo"
        },
        {
            "_id": "5f6369a77d6e5c42e045c179",
            "fullName": "Shin-Hye Park"
        },
        {
            "_id": "5f6369a77d6e5c42e045c17a",
            "fullName": "Hyun-Wook Lee"
        },
        {
            "_id": "5f6369a77d6e5c42e045c17b",
            "fullName": "Bae-soo Jeon"
        },
        {
            "_id": "5f6369a77d6e5c42e045c17c",
            "fullName": "Hye-Won Oh"
        }
    ],
    "trailerUrl": "https://www.imdb.com/video/imdb/vi3115958553?playlistId=tt10",
    "coverImage": "https://m.media-amazon.com/images/M/MV5BMGNiYjk1ZTItZGMwOS00MTNlLWE3NGItZWJmYWUxNTk5Njg4XkEyXkFqcGdeQXVyODA4ODIwNDM@._V1_UY883_CR2,0,600,883_AL_.jpg",
    "genres": [],
    "boxOffice": "",
    "__v": 0
}
    let {data: movie} = await getMovie("5f6369a77d6e5c42e045c177"); 
    expect(movie).toMatchObject(object);
});
it('getMoviesByGenre', async () => {
    let {data: movies} = await getMoviesByGenre("Drama"); 
    expect(movies.length).toBeGreaterThan(0);
});
it('getRelatedMovies', async () => {
    let {data: movies} = await getRelatedMovies("5f6369a77d6e5c42e045c177"); 
    expect(movies.length).toBeGreaterThan(0);
});
});
// jest.mock('./commentService', () => {
//   const set = jest.fn();
 
//   return {
//     database: jest.fn(() => ({
//       ref: jest.fn(() => ({
//         push: jest.fn(() => ({
//           set,
//         })),
//       })),
//     })),
//   };
// });
// describe("commentService", () =>{
//     it("saveData", () => {
//         const set = app
//       .database()
//       .ref()
//       .push().set;
//       const review ={
//           comment: "comment",
//           username: "username",
//           movieID: "movieId"
//       }
 
//     const result = saveData(
//       review,
//       '123456789'
//     );
 
//     expect(result).resolves.toEqual(true);
 
    // expect(set).toHaveBeenCalledTimes(1);
 
    // expect(set).toHaveBeenCalledWith({
    //   courseId: 'THE_ROAD_TO_GRAPHQL',
    //   packageId: 'STUDENT',
    //   invoice: {
    //     createdAt: 'TIMESTAMP',
    //     amount: 0,
    //     licensesCount: 1,
    //     currency: 'USD',
    //     paymentType: 'FREE',
    //   },
    // });
//     })
// })