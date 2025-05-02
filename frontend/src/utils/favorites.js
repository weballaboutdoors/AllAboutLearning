const FAVORITES_KEY = 'favorites';

export function getFavorites() {
  return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
}

export function isFavorite(id) {
  const favorites = getFavorites();
  return favorites.some(item => item.id === id);
}

export function addFavorite(item) {
  const favorites = getFavorites();
  if (!favorites.some(fav => fav.id === item.id)) {
    favorites.push(item);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
}

export function removeFavorite(id) {
  const favorites = getFavorites().filter(item => item.id !== id);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}
