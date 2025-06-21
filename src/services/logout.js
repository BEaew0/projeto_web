// services/logout.js
export const logoutUser = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('userData');
  window.location.href = '/'; // Força recarregamento para limpar estados
};