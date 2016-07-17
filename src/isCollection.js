export default function isModel(model) {
  try {
    return model.constructor.name === 'Collection';
  } catch (e) {
    return false;
  }
}
