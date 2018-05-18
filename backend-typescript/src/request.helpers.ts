export function jsonRequestHeaderMap(options: any) {
  let headerMap = new Map();
  headerMap.set("Content-Type", "application/json");
  if (options && options.correlationId) {
    headerMap.set("correlationId", options.correlationId);
  }
  return headerMap;
}

export function postJsonOptions(uri: any, headers: any, json: any) {

  if (!uri) {
    throw new Error('A \"uri\" is required to make a post request');
  }

  let headerMap = new Map();
  headerMap.set("uri", uri);
  headerMap.set("method", "POST");
  if (headers) {
    headerMap.set("headers", headers);
  }

  if (headers) {
    headerMap.set("json", json);
  }

  return headerMap;
}
