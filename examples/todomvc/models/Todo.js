import { Types, createModel } from 'tydel';

export default createModel({
  id: Types.number.isRequired,
  text: Types.string.isRequired,
  completed: Types.bool.isRequired
}, {
  setText(text) {
    this.text = text;
  },

  setCompleted(completed) {
    this.completed = completed;
  },

  toggleCompleted() {
    this.completed = !this.completed;
  }
});
