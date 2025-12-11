
const userData = JSON.parse(localStorage.getItem("user"));

token = localStorage.getItem("token");
if (!token) {
    window.location.href = "index.html";
}

if (userData && userData.name) {
    document.querySelector(".header-title").textContent = `Bienvenido ${userData.name}`;
} else {
    document.querySelector(".header-title").textContent = "Bienvenido";
}



async function logout() {
  const token = localStorage.getItem("token");

  await fetch("https://apertum.danydev.co/api/shoplite/auth/logout", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  localStorage.removeItem("token");
  window.location.href = "index.html";
}
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", logout);
 
}
const btnLogout = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", function (event) {
    event.preventDefault();

  
    logoutBtn.innerHTML = "Cerrando...";
    logoutBtn.setAttribute("disabled", "true");

  
    setTimeout(() => {

    
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        alert("Sesión cerrada");

     
        window.location.href = "index.html";

    }, 600);
});
