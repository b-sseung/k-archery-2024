export const isNullOrEmpty = (data) => {
  if (data == null || data == undefined) {
    return true;
  }

  const type = typeof data;
  if (type == 'object' || type == 'array') {
    if (data.length == 0) {
      return true;
    }
  } else if (type == 'map') {
    if (data.size == 0) {
      return true;
    }
  }

  return false;
};
