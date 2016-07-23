# Collection

Instance properties and methods listed below.

Collections also expose a few more methods for the built-in event system, which is explained in [Watcher](../guides/watcher.md) section.

### length

> length

Property returning the length of the collection as an integer.

### at

> at(n)

Returns the model at specific index.

### push

> push(model)

Pushes the model, and adds it to the end of the collection.

### every

> every(iteratorFn)

Tests whether all models in the collection pass the test implemented by the provided function.

### filter

> filter(iteratorFn)

Creates a new array with all models that pass the test implemented by the provided function.

### find

> find(iteratorFn)

Returns a model in the collection, if a model in the array satisfies the provided testing function. Otherwise `undefined` is returned.

### forEach

> forEach(iteratorFn)

Executes provided function once per model in the collection.

### includes

> includes(model)

Determines whether colelction includes a certain model, returning `true` or `false` as appropriate.

### indexOf

> indexOf(model)

Returns the first index at which a given model can be found in the collection, or -1 if it is not present.

### map

> map(fn)

Creates a new array with the results of calling the provided function on every model in this collection.

### reduce

> reduce(fn, initialValue)

Applies the function against an accumulator and each model of the collection (from left-to-right) to reduce it to a single value.

### some

> some(iteratorFn)

Tests whether some model in the collection passes the test implemented by the provided function.

### pop

> pop()

Removes the last model from the collection and returns that model. This method changes the length of the collection.

### shift

> shift()

Removes the first model from the collection and returns that model. This method changes the length of the collection.

### unshift

> unshift(model)

Adds one or more models to the beginning of the collection and returns the new length of the collection.

### remove

> remove(model)

Removes model from the collection.

### removeFrom

> removeFrom(n)

Removes model from the given `n` index.

### difference

> difference(models)

Creates an array of unique models not included in the other given models array.

### findIndex

> findIndex(model)

This method is like `find()`, except that it returns the index of the first model.

### first

> first()

Gets the first model of the collection.

### last

> last()

Gets the last model of the collection.

### nth

> nth(n = 0)

Gets the model at `n` index of the collection. If `n` is negative, the nth element from the end is returned.

### take

> take(n = 1)

Creates a slice of array with `n` models taken from the beginning.

### takeRight

> takeRight(n = 1)

Creates a slice of array with `n` models taken from the end.

### destroy

> destroy()

Destroys the collection and its watchers.

### toJS

> toJS()

Converts the collection to an plain array, and also converting the models into plain objects recursively.
