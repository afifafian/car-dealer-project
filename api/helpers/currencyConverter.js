function converter(price) {
  const priceFormatted = parseInt(price);
  return priceFormatted.toLocaleString('id-ID', {
    style: 'currency', currency: 'IDR'
  });
}

module.exports = converter;
