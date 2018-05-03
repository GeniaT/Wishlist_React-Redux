function getWishlist(arr, id) {
  console.log('arr:', arr);
  console.log('id:', id);
  return arr.find(obj => obj.id === id);
}

export { getWishlist };
