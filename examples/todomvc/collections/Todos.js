import _ from 'lodash';
import { createCollection } from 'tydel';

import Todo from '../models/Todo';

export default createCollection(Todo, {
  addTodo(text) {
    const todo = new Todo({
      id: Number(_.uniqueId()),
      text,
      completed: false
    });

    this.push(todo);
  },

  completeAllTodos() {
    const areAllMarked = this.every(todo => todo.completed);

    this.forEach(todo => todo.setCompleted(!areAllMarked));
  },

  clearCompletedTodos() {
    this
      .filter(todo => todo.completed)
      .forEach(todo => todo.destroy());
  }
});
