function CustomException(message) {
  const error = new Error(message)
  error.code = 'THIS_IS_A_CUSTOM_ERROR_CODE'
  return error
}

CustomException.prototype = Object.create(Error.prototype)

const _CustomException = CustomException
export { _CustomException as CustomException }
