import React, { Component, PropTypes } from 'react';
import { connect } from 'tydel-react';

import Header from '../components/Header';
import MainSection from '../components/MainSection';

class App extends Component {
  static propTypes = {
    todos: PropTypes.object.isRequired // Collection
  };

  render() {
    const { todos } = this.props;

    return (
      <div>
        <Header addTodo={todos.addTodo} />
        <MainSection todos={todos} />
      </div>
    );
  }
}

function mapModelToProps(appState) {
  return {
    todos: appState.todos
  };
}

export default connect(mapModelToProps)(App);
