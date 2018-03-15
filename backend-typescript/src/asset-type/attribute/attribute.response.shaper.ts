export function shapeAttributeResponse(dataName:string, data:any, pageNumber:number, pageSize:number, items:any, totalItems:number, sort:string) {
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
