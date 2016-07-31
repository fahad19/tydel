import React, { Component, PropTypes } from 'react';

import TodoItem from './TodoItem';
import Footer from './Footer';

const SHOW_ALL = 'SHOW_ALL';
const SHOW_COMPLETED = 'SHOW_COMPLETED';
const SHOW_ACTIVE = 'SHOW_ACTIVE';

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.completed,
  [SHOW_COMPLETED]: todo => todo.completed
};

export default class MainSection extends Component {
  static propTypes = {
    todos: PropTypes.object.isRequired // Collection
  };

  constructor(props, context) {
    super(props, context);

    this.state = { filter: SHOW_ALL };
  }

  handleClearCompleted = () => {
    this.props.todos.clearCompletedTodos();
  };

  handleShow = (filter) => {
    this.setState({ filter });
  };

  renderToggleAll(completedCount) {
    const { todos } = this.props;

    if (todos.length === 0) {
      return;
    }

    return (
      <input
        className="toggle-all"
        type="checkbox"
        checked={completedCount === todos.length}
        onChange={todos.completeAllTodos}
      />
    );
  }

  renderFooter(completedCount) {
    const { todos } = this.props;
    const { filter } = this.state;
    const activeCount = todos.length - completedCount;

    if (todos.length === 0) {
      return;
    }

    return (
      <Footer
        completedCount={completedCount}
        activeCount={activeCount}
        filter={filter}
        onClearCompleted={this.handleClearCompleted}
        onShow={this.handleShow}
      />
    );
  }

  render() {
    const { todos } = this.props;
    const { filter } = this.state;

    const filteredTodos = todos.filter(TODO_FILTERS[filter]);
    const completedCount = todos.reduce((count, todo) =>
      todo.completed ? count + 1 : count,
      0
    );

    return (
      <section className="main">
        {this.renderToggleAll(completedCount)}

        <ul className="todo-list">
          {filteredTodos.map(todo =>
            <TodoItem
              key={todo.id}
              todo={todo}
            />
          )}
        </ul>

        {this.renderFooter(completedCount)}
      </section>
    );
  }
}
