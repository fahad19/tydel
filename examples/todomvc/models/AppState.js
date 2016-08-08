import { Types, createModel } from 'tydel';
import logger from 'tydel-logger';

import Todos from '../collections/Todos';

export default createModel({
  todos: Types.collection.of(Todos)
}, {}, [
  logger
]);
