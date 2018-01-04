import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Book from './Components/book';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3000/books')
      .then((booklist) => {
        const books = booklist.data;
        this.setState({ books:books })
      })
  }

  deleteBook = (id, index) => {
    const self = this;
    axios.delete(`http://localhost:3000/books/delete/${id}`)
      .then(function(deleted) {
        const books = [...self.state.books];
        books.splice(index, 1);
        self.setState({
          books: books
        })
      })
  }

  render() {

    return (
      <div className="App">
        <h1>Books!</h1>
        <ul>
          {this.state.books.map((book, index) =>
            <Book
              click={() => this.deleteBook(book.id, index)}
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              genre={book.genre}
            />
          )}
        </ul>
      </div>
    );
  }
}

export default App;
