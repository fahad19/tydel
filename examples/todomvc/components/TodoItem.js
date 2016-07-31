import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import TodoTextInput from './TodoTextInput';

export default class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      editing: false
    };
  }

  handleDoubleClick = () => {
    this.setState({ editing: true });
  };

  handleSave = (id, text) => {
    const { todo } = this.props;

    if (text.length === 0) {
      todo.destroy();
    } else {
      todo.setText(text);
    }

    this.setState({ editing: false });
  };

  render() {
    const { todo } = this.props;

    let element;

    if (this.state.editing) {
      element = (
        <TodoTextInput
          text={todo.text}
          editing={this.state.editing}
          onSave={(text) => this.handleSave(todo.id, text)}
        />
      );
    } else {
      element = (
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.completed}
            onChange={() => todo.toggleCompleted()}
          />

          <label onDoubleClick={this.handleDoubleClick}>
            {todo.text}
          </label>

          <button
            className="destroy"
            onClick={() => todo.destroy()}
          />
        </div>
      );
    }

    return (
      <li className={classnames({
        completed: todo.completed,
        editing: this.state.editing
      })}>
        {element}
      </li>
    );
  }
}
