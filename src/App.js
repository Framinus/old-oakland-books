import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Book from './Components/book';
import Create from './Components/create';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      create: false
    };
  }

  componentWillMount() {
    axios.get('http://localhost:3000/books')
      .then((booklist) => {
        const books = booklist.data;
        this.setState({
          books:books
         })
        console.log(this.state.books);
      })
  }

  addBook(books) {
    this.setState({
      books: books
    })
  }

  openForm() {
    this.setState({
      create: true
    })
  }

  closeCreateForm() {
    this.setState({
      create: false
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

    let createForm

    if (!this.state.create) {
      console.log('this state create', this.state.create);
      createForm = (
        <button onClick={this.openForm.bind(this)}>Create a Book!</button>
      );
    } else {
      createForm = (
        <Create books={this.state.books} addBook={this.addBook.bind(this)} closeCreateForm={this.closeCreateForm.bind(this)}/>
      )
    }


    return (
      <div className="App">
        <h1>Books!</h1>
          {createForm}
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
