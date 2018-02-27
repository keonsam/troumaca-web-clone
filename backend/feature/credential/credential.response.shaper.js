module.exports =  function ResponseShaper() {
  return {
    shapeUsernameValidResponse: function (valid) {
      return {
        valid:valid
      }
    },

    shapePasswordValidResponse: function (valid) {
      return {
        valid:valid
      }
    }
  }
};
