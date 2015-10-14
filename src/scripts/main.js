import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

const ListItem = React.createClass({

  handleClick: function() {
    // console.log(`You clicked ${this.props.name}!`);
    this.props.onRemoveName(this.props.name.index);  //onRemoveName is now a property (see below)
                                                    // index is added as prop also that allows the removeName function to remove the name
                                                    //that was clicked on.
  },
    render: function() {
    return (
      <li onClick={this.handleClick}>{this.props.name}</li>
    );
  }
});

const ListForm = React.createClass({

  saveComment: function (event) {
    event.preventDefault();
    this.props.onSaveComment(this.refs.name.value);
  },

  render: function() {
    return (<form onSubmit={this.saveComment}>
      <input type="text" ref="name" />
      <button type="submit">Save </button>
    </form>);
  }
});

const ListMaker = React.createClass({
  getInitialState: function () {
    return {
      names: this.props.names
    }
  },

  addName: function (newName) {
    let names = this.state.names.slice();
    names.push(newName);
    this.setState({
      names: names
    });
  },

  removeName: function (index, i) {
    let names = this.state.names.slice();
    names.splice(index, 1);
    this.setState({
      names: names
    });
  },

  render: function() {
    let listItems = this.state.names.map((item, i) => {
      return <ListItem key={i} index={i} name={item} onRemoveName={this.removeName} />    //add removeName function as a prop
    });                                                                         // so that it can be added to the handleClick function
    return (<div>
      <h1>List Maker</h1>
      <ul>
        {listItems}
      </ul>
      <ListForm onSaveComment={this.addName} />
    </div>);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <ListMaker names={["Jason", "Jason", "Sandra", "Mark"]} /> ,
    document.querySelector('.app')
  );
});
