const generateSearchString = (searchObjects) => {
  let searchString = '';
  let column;
  Object.keys(searchObjects).forEach((keyItem) => {
    if (typeof (searchObjects[keyItem]) !== 'undefined' && keyItem !== 'minPrice' && keyItem !== 'maxPrice') {
      
      switch (keyItem) {
        case 'bodyType':
          column = 'body_type';
          break;
        default:
          column = keyItem;
      }

      searchString += `AND "${column}" = '${searchObjects[keyItem].toLowerCase()}'`;
    }
  });
  if (!searchString) {
    searchString = '';
  }
  return searchString;
};

export default generateSearchString;
