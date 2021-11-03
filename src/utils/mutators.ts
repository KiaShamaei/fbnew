export const update = {
  update: ([fieldName, value]: [string, any], state: any, utils: any) => {
    if (typeof fieldName === 'object') {
      const newState = fieldName;
      return Object.keys(fieldName).forEach(key => {
        return utils.changeValue(state, key, () => newState[key]);
      })
    }
    if (fieldName)
      return utils.changeValue(state, fieldName, () => value)
  }
}
