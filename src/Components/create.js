import React, { Component } from 'react';
import axios from 'axios';

class Create extends Component {
  constructor(props) {
    super(props);

    this.createBook = this.createBook.bind(this)

    this.state = {
      title: this.props.title,
      author: this.props.author,
      genre: this.props.genre
    };
  }

  createBook(event) {
    event.preventDefault()
    const { title, author, genre } = this.state
    axios.post(`https://simple-bookstore-api.herokuapp.com/books/create`, {title:title, author:author, genre:genre})
    .then((newBook) => {
      this.props.books.push(newBook.data)
      this.props.addBook(this.props.books)
      this.props.closeCreateForm()
    })
  }


  handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: event.target.value
    })
  }

  render () {
    return (
      <div>
        <form className="create-book-form">
        <div className="input-fields">
          <input type="text" name="title" onChange={this.handleChange} placeholder="title"/>
          <input type="text" name="author" onChange={this.handleChange} placeholder="author"/>
          <input type="text" name="genre" onChange={this.handleChange} placeholder="genre"/>
        </div>
        <div className="create-form-btns">
          <button className="create-btn" onClick={this.createBook} type="submit">Submit</button>
          <button className ="go-back-btn" onClick={this.props.closeCreateForm} type="button">Go Back</button>
        </div>

        </form>
      </div>
    );
  }

}



export default Create;
