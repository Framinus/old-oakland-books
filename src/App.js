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
      searchedBooks : [],
      searchMode: false,
      create: false,
      search: '',
      showListBtn: false,
      radioValue: false,
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
          searchMode: false,
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
    this.setState({
      [search]: event.target.value,
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
    axios.post(`http://localhost:3000/books/search/${radioValue}`, { search })
      .then((searchResults) => {
        const matches = searchResults.data.map((result) => {
          return this.state.books.filter((book) => {
            return book.id === result.id;
          })
        })
        console.log('this state books', this.state.books);
        this.setState({
          searchedBooks: matches[0],
          searchMode: true,
          search: '',
          showListBtn: true,
          radioValue: false,
          radioBtnChecked: false
        })
      })
  }

  render() {

    let createForm

    if (!this.state.create) {
      createForm = (
        <button className="open-create-btn" onClick={this.openForm.bind(this)}>Create a Book!</button>
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

    let bookList

    if (this.state.searchMode) {
      bookList = (
      <ul>
        {this.state.searchedBooks.map((book, index) =>
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
    )
    } else {
      bookList = (
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
    )
    }

    return (
      <div className="App">
        <p className="grand-title">Fancy Bookstore</p>
        <ul>
          <li className="controls-container">
              {showList}
              <form className="search-form">
                <input className="search-field" type="text" name="search" onChange={this.handleChange} value={this.state.search}/>
                <span className="radio-btns">
                  <span className="btn-and-label">
                    <input type="radio" id="title-choice" name="radioValue"   onChange={this.handleChange} value="title" checked={this.state.radioValue === 'title'} />
                    <label htmlFor="title-choice">By Title</label>
                  </span>
                  <span className="btn-and-label">
                    <input type="radio" id="title-choice" name="radioValue" onChange={this.handleChange} value="author" checked={this.state.radioValue === 'author'}/>
                    <label htmlFor="title-choice">By Author</label>
                  </span>
                  <span className="btn-and-label">
                    <input type="radio" id="title-choice" name="radioValue" onChange={this.handleChange} value="genre" checked={this.state.radioValue ==='genre'}/>
                    <label htmlFor="title-choice">By Genre</label>
                  </span>
                </span>
                <span>
                  <button className="search-btn" onClick={this.searchBooks} type="submit">Search</button>
                </span>
              </form>
              {createForm}
          </li>
        </ul>
        <div className="booklist-container">
          {bookList}
        </div>
      </div>
    );
  }
}

export default App;
