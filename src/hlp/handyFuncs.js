const generateSearchString = (searchObjects) => {
  let searchString = '';
  Object.keys(searchObjects).forEach((keyItem) => {
    if (typeof (searchObjects[keyItem]) !== 'undefined' && keyItem !== 'minPrice' && keyItem !== 'maxPrice') {
      searchString += `AND "${keyItem}" = '${searchObjects[keyItem].toLowerCase()}'`;
    }
  });
  if (!searchString) {
    searchString = '';
  }
  return searchString;
};

export default generateSearchString;
