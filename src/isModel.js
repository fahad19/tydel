export default function isModel(model) {
  try {
    return model.constructor.name === 'Model';
  } catch (e) {
    return false;
  }
}
