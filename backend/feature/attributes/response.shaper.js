module.exports =  function ResponseShaper() {
  return {
    shapeAttributesResponse:function (data, pageNumber, pageSize, items, totalItems, sort) {
      return {
        attributes:data,
        page:{
          number:pageNumber,
          size:pageSize,
          items:items,
          totalItems:totalItems
        },
        sort:sort
      }
    }
  }
};
