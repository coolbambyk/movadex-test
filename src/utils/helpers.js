/*
  Put helper functions here. If you notice that there are few functions with the same domain,
  there is no better time than now to move them to a separate file
*/

export const wait = (timeout = 3000) =>
  new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });

export const formatCurrency = (() => {
  const formatter = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });
  return (number) => {
    const parts = formatter.formatToParts(number);
    const strArray = [];
    // filter out the decimal part
    parts.forEach((part) => {
      if (['decimal', 'fraction'].includes(part.type)) return;
      strArray.push(part.value);
    });
    return strArray.join('');
  };
})();
