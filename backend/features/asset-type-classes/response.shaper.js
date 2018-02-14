module.exports =  function ResponseShaper() {
  return {
    shapeAssetTypeClasssResponse:function (dataName, data, pageNumber, pageSize, items, totalItems, sort) {
      return {
        [dataName]:data,
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
