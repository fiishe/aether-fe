/*  Returns an action creator like below:
 *  (args) => { type: type, arg1: arg1, arg2: arg2, ... }
 */
const makeActionCreator = (type, ...argNames) => {
  return (...args) => {
    const action = { type }
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index]
    })
    return action
  }
}

export default makeActionCreator
