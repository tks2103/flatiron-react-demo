/**
 * @jsx React.DOM
 */

var ENTER_KEY = 13;

var TodoHeader = React.createClass({
  render: function() {
    return (
      <h2>
        My Todo List
      </h2>
    );
  }
});

var TodoInput = React.createClass({

  handleKeyDown: function(event) {
    if(event.which === ENTER_KEY) {
      this.props.addTodo(event.target.value);
    }
  },


  render: function() {
    return (
      <input onKeyDown={this.handleKeyDown}>
      </input>
    );
  }
});

var TodoItem = React.createClass({
  render: function() {
    return (
      <div>{this.props.todoText}</div>
    );
  }
});

var TodoItems = React.createClass({
  render: function() {
    return (
      <div> this is a list item </div>
    );
  }
});

var TodoSummary = React.createClass({
  render: function() {
    return (
      <div> This is the summary </div>
    );
  }
});

var App = React.createClass({

  getInitialState: function () {
    return {
      todos: [ "Go to the Mall", "Go to the Movies" ]
    }
  },

  addTodo: function(todoText) {
    this.setState({ todos: [todoText].concat(this.state.todos) });
  },

  render: function() {
    var todos = this.state.todos.map(function(todoText) {
      return <TodoItem todoText={todoText}/>;
    });

    return (
      <div>
        <TodoHeader />
        <TodoInput addTodo={this.addTodo}/>
        {todos}
      </div>
    );
  }
});


React.renderComponent(
  <App />,
  document.getElementById("todolist")
);
