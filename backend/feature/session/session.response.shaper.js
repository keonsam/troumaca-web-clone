module.exports =  function ResponseShaper() {
  return {
    shapeSessionResponse: function (session) {
      return {
        sessionId:session.sessionId,
        data:session.data
      }
    }
  }
};
