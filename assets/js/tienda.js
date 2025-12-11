const userData = JSON.parse(localStorage.getItem("user"));

token = localStorage.getItem("token");
if (!token) {
    window.location.href = "../index.html";
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
  window.location.href = "../index.html";
}

const btnLogout = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", function (event) {
    event.preventDefault();

    logoutBtn.innerHTML = "Cerrando...";
    logoutBtn.setAttribute("disabled", "true");4

  
    setTimeout(() => {

       
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        alert("Sesión cerrada");

      
        window.location.href = "../index.html";

    }, 600);
});

// tienda.js
document.addEventListener("DOMContentLoaded", () => {

    const botonesAgregar = document.querySelectorAll(".agregar-carrito");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarProducto);
    });

    function agregarProducto(e) {
        e.preventDefault();
        
        const gameItem = e.target.closest(".game-item");

        const producto = {
            id: e.target.dataset.id,
            nombre: gameItem.querySelector(".game-title").textContent,
            precio: gameItem.querySelector(".game-price").textContent,
            imagen: gameItem.querySelector(".game-thumb").src
        };

        guardarEnLocalStorage(producto);
    }

    function guardarEnLocalStorage(producto) {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        carrito.push(producto);
        localStorage.setItem("carrito", JSON.stringify(carrito));

        console.log("Agregado al carrito:", producto);
        alert("Juego agregado al carrito");

    }
});
