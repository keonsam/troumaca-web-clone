module.exports =  function ResponseShaper() {
  return {
    shapeAssetsResponse:function (data, pageNumber, pageSize, items, totalItems, sort) {
      return {
        assets:data,
        page:{
          number:pageNumber,
          size:pageSize,
          items:items,
          totalItems:totalItems
        },
        sort:sort
      }
    },
    shapeAssetsResponse2: function(dataName, data) {
      return {
        [dataName]: data,
        page: {},
        sort: {}
      }
    }
  }
};
