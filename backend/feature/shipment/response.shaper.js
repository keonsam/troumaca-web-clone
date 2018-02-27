module.exports =  function ResponseShaper() {
  return {
    shapeShipmentsResponse:function (data, pageNumber, pageSize, items, totalItems, sort) {
      return {
        shipments:data,
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
