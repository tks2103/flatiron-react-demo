/**
 * @jsx React.DOM
 */

var ENTER_KEY = 13;



var Todo = React.createClass({

  handleClick: function() {
    this.props.destroyTodo(this.props.todoText);
  },


  render: function() {
    return (
      <div className="todo-item">{this.props.todoText}
        <button onClick={this.handleClick} className="todo-item-destroy"> </button>
      </div>
    );
  }
});



var TodoPrompt = React.createClass({
  handleKeyDown: function(event) {
    if(event.which === ENTER_KEY) {
      this.props.createTodo(event.target.value);
    }
  },


  render: function() {
    return (
      <input onKeyDown={this.handleKeyDown}
             className="todo-prompt"
             placeholder="What need doing?"></input>
    );
  }
});



var TodoList = React.createClass({
  getInitialState: function() {
    return {
      todos: [ 'on' ]
    };
  },


  createTodo: function(todoText) {
    this.setState({ todos: [todoText].concat(this.state.todos) });
  },


  destroyTodo: function(todoText) {
    this.state.todos.splice(this.state.todos.indexOf(todoText), 1);
    this.setState({ todos: this.state.todos });
  },


  render: function() {
    var todos = this.state.todos.map(function(text) {
      return <Todo destroyTodo={this.destroyTodo} todoText={text}/>;
    }.bind(this));

    return (
      <div className="todo-list">
        <TodoPrompt createTodo={this.createTodo}/>
        {todos}
      </div>
    );
  }
});



var App = React.createClass({
  render: function() {
    return (
      <div>
        <h2>My Todo App</h2>
        <TodoList />
      </div>
    );
  }
});



React.renderComponent(
  <App />,
  document.getElementById("todolist")
);
