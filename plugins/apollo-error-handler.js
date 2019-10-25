// plugins/apollo-error-handler.js
export default (error, context) => {
  // eslint-disable-next-line
  console.log(error)
  context.error({ statusCode: 304, message: 'Server error' })
}
