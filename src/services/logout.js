export const logoutUser = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userName"); 
    
    // redireciona para login 
    window.location.href = "/login"; 
  };
  