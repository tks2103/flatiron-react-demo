/**
 * @jsx React.DOM
 */

var ENTER_KEY = 13;

var Todo = React.createClass({
  handleDestroy: function() {
    this.props.destroyTodo(this.props.todoText);
  },

  handleComplete: function() {
    this.props.completeTodo(this.props.todoText);
  },

  render: function() {
    var classes = "todo-item";
    if(this.props.completed === true) { classes += " todo-item-completed"; }

    return (
      <div className={classes}>{this.props.todoText}
        <button onClick={this.handleDestroy} className="todo-item-destroy"> </button>
        <button onClick={this.handleComplete} className="todo-item-complete"> </button>
      </div>
    );
  }
});


var TodoPrompt = React.createClass({
  getInitialState: function() {
    return {
      value: ''
    };
  },

  clearPrompt: function() {
    this.setState({ value: '' });
  },

  handleKeyDown: function(event) {
    if(event.which === ENTER_KEY) {
      this.props.createTodo(event.target.value);
      this.clearPrompt();
    }
  },

  handleChange: function(event) {
    this.setState({ value: event.target.value });
  },

  render: function() {
    return (
      <input onKeyDown={this.handleKeyDown}
             onChange={this.handleChange}
             value={this.state.value}
             className="todo-prompt"
             placeholder="What need doing?"></input>
    );
  }
});


var TodoStats = React.createClass({
  render: function() {
    var remainingTodos = this.props.totalTodos - this.props.completedTodos,
        remainingText  = remainingTodos > 1 ? " items remaining" : " item remaining";

    return (
      <div className="todo-stats">
        {remainingTodos > 0 ? remainingTodos + remainingText : null}
      </div>
    );
  }
});


var TodoList = React.createClass({
  getInitialState: function() {
    return {
      todos: [],
      completedTodos: [],
    };
  },

  createTodo: function(todoText) {
    this.setState({ todos: [todoText].concat(this.state.todos) });
  },

  destroyTodo: function(todoText) {
    this.state.todos.splice(this.state.todos.indexOf(todoText), 1);
    if(this.state.completedTodos.indexOf(todoText) >= 0) {
      this.state.completedTodos.splice(this.state.completedTodos.indexOf(todoText), 1);
    }
    this.setState({ todos: this.state.todos, completedTodos: this.state.completedTodos });
  },

  completeTodo: function(todoText) {
    this.setState({ completedTodos: [todoText].concat(this.state.completedTodos) });
  },

  render: function() {
    var todos = this.state.todos.map(function(text) {
      var isCompleted = this.state.completedTodos.indexOf(text) >= 0;
      return <Todo destroyTodo={this.destroyTodo} completeTodo={this.completeTodo} todoText={text} completed={isCompleted}/>;
    }.bind(this));

    return (
      <div>
        <div className="todo-list">
          <TodoPrompt createTodo={this.createTodo}/>
          {todos}
        </div>
        <TodoStats completedTodos={this.state.completedTodos.length}
                   totalTodos={this.state.todos.length} />
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
