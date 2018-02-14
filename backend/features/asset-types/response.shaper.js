module.exports =  function ResponseShaper() {
  return {
    shapeAssetTypesResponse:function (data, pageNumber, pageSize, items, totalItems, sort) {
      return {
        assetTypes:data,
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
