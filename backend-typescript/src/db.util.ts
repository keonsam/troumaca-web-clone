export function calcSkip(pageNumber, pageSize, defaultPageSize) {
    if (!pageNumber) {
      return 0;
    }

    if (pageNumber <= 1) {
      return 0;
    }

    if (!pageSize) {
      pageSize = defaultPageSize;
    }

    return (pageNumber - 1) * pageSize;
}