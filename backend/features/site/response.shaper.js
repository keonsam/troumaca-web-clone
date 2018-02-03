module.exports =  function ResponseShaper() {
  return {
    shapePhonesResponse:function (data, pageNumber, pageSize, items, totalItems, sort) {
      return {
        phones:data,
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