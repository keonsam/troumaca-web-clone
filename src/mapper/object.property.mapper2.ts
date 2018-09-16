export function mapObjectProps2(fromObject, toObject) {
  if (fromObject == null) {
    return toObject;
  }

  if (toObject == null) {
    return toObject;
  }

  for (const toKey in toObject) {
    for (const fromKey in fromObject) {
      if (toKey == fromKey) {

        const fromObject2 = fromObject[fromKey];

        if (typeof fromObject2 == 'function') {

          break;

        } else if (typeof fromObject2 == 'object') {

          if (Array.isArray(fromObject2)) {
            if (fromObject2.length <= 0) {
              toObject[toKey] = fromObject2;
            } else {
              // iterate array
              // copy value
              // copy object
            }
          } else if (fromObject2 instanceof Date) {
            // copy object
          } else {

          }

        } else {
          //noinspection JSUnfilteredForInLoop
          toObject[toKey] = fromObject2;
        }

      }
    }
  }

  return toObject;
}
