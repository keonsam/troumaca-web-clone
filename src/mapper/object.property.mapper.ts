export function mapObjectProps(fromObject, toObject) {
  if (fromObject == null) {
    return toObject;
  }

  if (toObject == null) {
    return toObject;
  }

  for (const toKey in toObject) {
    for (const fromKey in fromObject) {
      if (toKey == fromKey) {
        //noinspection JSUnfilteredForInLoop
        toObject[toKey] = fromObject[fromKey];
      }
    }
  }

  return toObject;
}
