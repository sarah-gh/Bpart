const statusCodes = {
    INTERNAL_SERVER_ERROR: 500
  };
  
  const contentTypes = {
    JSON: 'application/json'
  };
  
  const errors = {
    internalServerError: {
      title: 'internalServerError',
      message: 'Internal server error!'
    }
  };
  
  module.exports = {
    statusCodes,
    contentTypes,
    errors
  };