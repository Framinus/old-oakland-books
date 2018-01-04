import React, { Component } from 'react';

class Book extends Component {
  constructor(props) {
    super(props);

    this.editBook = this.editBook.bind(this)

    this.state = {
      editMode: false,
    };
  }

  editBook = () => {
    this.setState({
      editMode: true
    })
  }

  render() {

    let book = null;

    if (this.state.editMode) {
      book = (
        <li>
          <form>
            <input type="text" name="title" value={this.props.title} />
            <input type="text" name="author" value={this.props.author} />
            <input type="text" name="genre" value={this.props.genre} />
            <button type="submit">Save</button>
          </form>
        </li>
      );
    } else {
      book = (
        <li>
          {this.props.title}
          {this.props.author}
          {this.props.genre}
          <button onClick={this.editBook}>Edit</button>
          <button onClick={this.props.deleteBook}>Delete</button>
        </li>
      )
    }

    return (
      <div>
        {book}
      </div>
    );
  }
}

export default Book;
