// basic operations for performing update tasks on typically mutable objects
// within reducers
//
// https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns/

const insertItem = (array, action) => {
  let newArray = array.slice()
  newArray.splice(action.index, 0, action.item)
  return newArray
}

const removeItem = (array, action) => {
  let newArray = array.slice()
  newArray.splice(action.index, 1)
  return newArray
}

const updateObjectInArray = (array, index, updateObj) => {
  return array.map((item, i) => {
    if (i !== index) {
      // This isn't the item we care about - keep it as-is
      return item
    }

    // Otherwise, this is the one we want - return an updated value
    return {
      ...item,
      ...updateObj
    }
  })
}

export default {
  insertItem,
  removeItem,
  updateObjectInArray
}
