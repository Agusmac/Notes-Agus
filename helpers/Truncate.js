export function truncateString(str, maxLength) {
    if (str.length > maxLength) {
      return str.slice(0, maxLength - 2) + "...";
    } else {
      return str;
    }
  }