// http://2ality.com/2015/08/es6-map-json.html

function mapToJson(map:any) {
  return JSON.stringify([...map]);
}

function jsonToMap(jsonStr:string) {
  return new Map(JSON.parse(jsonStr));
}

function strMapToObj(strMap:any) {
  let obj = Object.create(null);
  for (let [k,v] of strMap) {
    // We don’t escape the key '__proto__'
    // which can cause problems on older engines
    obj[k] = v;
  }
  return obj;
}

function objToStrMap(obj:any) {
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  return strMap;
}

export function strMapToJson(strMap:any) {
  return JSON.stringify(strMapToObj(strMap));
}

export function jsonToStrMap(jsonStr:string) {
  return objToStrMap(JSON.parse(jsonStr));
}