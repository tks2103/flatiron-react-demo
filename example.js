/**
 * @jsx React.DOM
 */

var ENTER_KEY = 13;

var Todo = React.createClass({
  getInitialState: function() {
    return {
      completed: false
    };
  },

  handleDestroy: function() {
    this.props.destroyTodo(this.props.todoText);
  },

  handleComplete: function() {
    this.setState({ completed: true });
  },

  render: function() {
    var classes = "todo-item";
    if(this.state.completed === true) { classes += " todo-item-completed"; }

    return (
      <div className={classes}>{this.props.todoText}
        <button onClick={this.handleDestroy} className="todo-item-destroy"> </button>
        <button onClick={this.handleComplete} className="todo-item-complete"> </button>
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
