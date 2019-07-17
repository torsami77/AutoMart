/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
const getCookie = (cname) => {
    const name = `${cname}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
  
    return '';
  };
  
  const token = getCookie('token');
  const username = getCookie('username');

  /* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
const stringDate = (time) => {
    const value = new Date(time).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    return value;
  };
  
  // eslint-disable-next-line no-unused-vars
  const timeDifference = (date1) => {
    let result;
    const date2 = new Date();
    const difference = date2.getTime() - new Date(date1).getTime();
  
    const minute = 60000;
    result = Math.round(difference / minute);
    if (result < 1) {
      return 'some few seconds ago';
    }
    if (result === 1) {
      return '1 minute ago';
    }
    if (result < 61) {
      return `${result} minutes ago`;
    }
  
    const hour = minute * 60;
    result = Math.round(difference / hour);
    if (result === 1) {
      return '1 hour ago';
    }
    if (result < 25) {
      return `${result} hours ago`;
    }
  
    const day = hour * 24;
    result = Math.round(difference / day);
    if (result === 1) {
      return '1 day ago';
    }
    if (result < 31) {
      return `${result} days ago`;
    }
  
    const month = day * 30;
    result = Math.round(difference / month);
    if (result === 1) {
      return '1 month ago';
    }
    if (result < 13) {
      return `${result} months ago`;
    }
  
    const year = month * 12;
    result = Math.round(difference / year);
    if (result === 1) {
      return '1 year ago';
    }
    return `${result} years ago`;
  };
  
  