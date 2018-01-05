import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Book from './Components/book';
import Create from './Components/create';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this)

    this.state = {
      books: [],
      create: false,
      search: '',
      showListBtn: false,
      radioValue: ''
    };
  }

  componentWillMount() {
    this.showAllBooks()
  }

  showAllBooks() {
    axios.get('http://localhost:3000/books')
      .then((booklist) => {
        const books = booklist.data;
        this.setState({
          books:books,
          showListBtn: false
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

  handleChange = (event) => {
    const target = event.target;
    const search = target.name;
    const radioValue = target.name;
    this.setState({
      [search]: event.target.value,
      [radioValue]: event.target.value
    })
    console.log('event target value', event.target.value);
    console.log('search', search)
    // console.log('this state search', this.state.search);
    console.log('this state radioValue', this.state.radioValue);
  }

  searchBooks = (event) => {
    event.preventDefault()
    const { search } = this.state
    const { radioValue } = this.state
    console.log('radioValue', radioValue);
    axios.post(`http://localhost:3000/books/search/title`, { search })
      .then((searchResults) => {
        const matches = searchResults.data.map((result) => {
          return this.state.books.filter((book) => {
            return book.id === result.id;
          })
        })
        this.setState({
          books: matches[0],
          search: '',
          showListBtn: true
        })
      })
  }

  render() {

    let createForm

    if (!this.state.create) {
      createForm = (
        <button onClick={this.openForm.bind(this)}>Create a Book!</button>
      );
    } else {
      createForm = (
        <Create books={this.state.books} addBook={this.addBook.bind(this)} closeCreateForm={this.closeCreateForm.bind(this)}/>
      )
    }

    let showList

    if (this.state.showListBtn) {
      showList = (
        <button type="submit" onClick={this.showAllBooks.bind(this)}>Show Full List</button>
      )
    }


    return (
      <div className="App">
        <h1>Books!</h1>
          {createForm}
          {showList}
          <form>
            <input type="text" name="search" onChange={this.handleChange} value={this.state.search}/>
            <input type="radio" id="title-choice" name="radioValue" onChange={this.handleChange} value="title"/>
            <label htmlFor="title-choice">By Title</label>
            <button onClick={this.searchBooks} type="submit">Search</button>
          </form>
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
