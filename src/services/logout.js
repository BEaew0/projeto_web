// services/logout.js
export const logoutUser = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('userData');
  window.location.href = '/login'; // Força recarregamento para limpar estados
};