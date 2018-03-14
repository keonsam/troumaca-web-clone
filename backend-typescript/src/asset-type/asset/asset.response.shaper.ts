
export function shapeAssetsResponse(data, pageNumber, pageSize, items, totalItems, sort) {
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
}

export function shapeAssetsResponse2(dataName, data) {
  return {
    [dataName]: data,
    page: {},
    sort: {}
  }
}
