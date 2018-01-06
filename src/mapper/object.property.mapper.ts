export function mapObjectProps(fromObject, toObject) {
  if (fromObject == null) {
    return toObject;
  }

  if (toObject == null) {
    return toObject;
  }

  for(let toKey in toObject) {
    for(let fromKey in fromObject) {
      if(toKey == fromKey) {
        //noinspection JSUnfilteredForInLoop
        toObject[toKey] = fromObject[fromKey];
      }
    }
  }

  return toObject;
}