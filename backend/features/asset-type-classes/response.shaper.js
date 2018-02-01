module.exports =  function ResponseShaper() {
  return {
    shapeAssetTypeClasssResponse:function (data, pageNumber, pageSize, items, totalItems, sort) {
      return {
        assetTypeClasses:data,
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
