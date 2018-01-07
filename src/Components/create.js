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
    axios.post(`http://localhost:3000/books/create`, {title:title, author:author, genre:genre})
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
        <form>
          <input type="text" name="title" onChange={this.handleChange} placeholder="title"/>
          <input type="text" name="author" onChange={this.handleChange} placeholder="author"/>
          <input type="text" name="genre" onChange={this.handleChange} placeholder="genre"/>
          <button onClick={this.createBook} type="submit">Submit</button>

        </form>
      </div>
    );
  }

}



export default Create;
