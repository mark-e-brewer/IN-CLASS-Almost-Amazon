import { getAuthors, getFavAuthor } from '../api/authorData';
import { signOut } from '../utils/auth';
import { booksOnSale, getBooks } from '../api/bookData';
import { showBooks, emptyBooks } from '../pages/books';
import { showAuthors, emptyAuthors } from '../pages/authors';
import viewBook from '../pages/viewBook';

// navigation events
const navigationEvents = (user) => {
  // LOGOUT BUTTON
  document.querySelector('#logout-button')
    .addEventListener('click', signOut);

  // TODO: BOOKS ON SALE
  document.querySelector('#sale-books').addEventListener('click', () => {
    booksOnSale(user.uid).then(showBooks);
  });

  // TODO: ALL BOOKS
  document.querySelector('#all-books').addEventListener('click', () => {
    getBooks(user.uid).then((data) => {
      if (data.length === 0) {
        emptyBooks();
        showBooks(data);
      } else {
        showBooks(data);
      }
    });
  });

  // FIXME: STUDENTS Create an event listener for the Authors
  // 1. When a user clicks the authors link, make a call to firebase to get all authors
  // 2. Convert the response to an array because that is what the makeAuthors function is expecting
  // 3. If the array is empty because there are no authors, make sure to use the emptyAuthor function
  document.querySelector('#authors').addEventListener('click', () => {
    getAuthors(user.uid).then((data) => {
      if (data.length === 0) {
        emptyAuthors();
        showAuthors(data);
      } else {
        showAuthors(data);
      }
    });
  });

  // Favorite Authors
  document.querySelector('#authors-fav').addEventListener('click', () => {
    getFavAuthor(user.uid).then(showAuthors);
  });

  // STRETCH: SEARCH
  document.querySelector('#search').addEventListener('keyup', (e) => {
    const searchValue = document.querySelector('#search').value.toLowerCase();
    console.warn(searchValue);

    // WHEN THE USER PRESSES ENTER, MAKE THE API CALL AND CLEAR THE INPUT
    if (e.keyCode === 13) {
      getBooks(user.uid).then((data) => {
        const searchItem = Object.values(data).filter((items) => items.title.includes(`${searchValue}`));
        viewBook(searchItem);
      });
      // MAKE A CALL TO THE API TO FILTER ON THE BOOKS
      // IF THE SEARCH DOESN'T RETURN ANYTHING, SHOW THE EMPTY STORE
      // OTHERWISE SHOW THE STORE

      document.querySelector('#search').value = '';
    }
  });
};

export default navigationEvents;
