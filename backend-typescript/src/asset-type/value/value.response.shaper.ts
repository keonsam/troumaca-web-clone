export function shapeValuesResponse(data:any, pageNumber:number, pageSize:number, items:any, totalItems:number, sort:any) {
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

export function shapeValuesResponse2(dataName:string, data:any) {
  return {
    [dataName]: data,
    page: {},
    sort: {}
  }
}
