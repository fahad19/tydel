import { Types, createModel } from 'tydel';

import Todos from '../collections/Todos';

export default createModel({
  todos: Types.collection.of(Todos)
});
