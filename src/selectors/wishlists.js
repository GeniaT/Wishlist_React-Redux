function getWishlist(arr, id) {
  return arr.find(obj => obj.id === id);
}

export { getWishlist };
