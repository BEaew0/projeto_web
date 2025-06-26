/**
 * Realiza o logout do usuário com limpeza completa da sessão
 * @returns {void}
 */
export const logoutUser = () => {
  try {
    // 1. Limpeza de todos os dados de autenticação
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('refreshToken'); // Se existir no futuro
    
    // 2. Limpeza dos headers do axios
    delete api.defaults.headers.common['Authorization'];
    
    // 3. Limpeza de qualquer cache de sessão
    if (navigator.serviceWorker) {
      navigator.serviceWorker.getRegistrations().then(registrations => {
        registrations.forEach(registration => registration.unregister());
      });
    }
    
    // 4. Limpar cookies relacionados à sessão
    document.cookie.split(';').forEach(cookie => {
      const [name] = cookie.split('=');
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
    
    // 5. Redirecionamento com recarregamento completo
    window.location.href = '/'; // Ou '/' conforme sua necessidade
    window.location.reload(); // Garante recarregamento
    
  } catch (error) {
    console.error('Erro durante o logout:', error);
    // Fallback básico se algo der errado
    window.location.href = '/login?force=true';
  }
};