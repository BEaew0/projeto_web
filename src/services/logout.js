export const logoutUser = () => {
  // Limpe todos os dados de autenticação
  localStorage.removeItem('accessToken');
  localStorage.removeItem('userData');
  
  // Redirecione para a página inicial com recarregamento
  window.location.href = '/'; // Usando href para garantir recarregamento completo
};