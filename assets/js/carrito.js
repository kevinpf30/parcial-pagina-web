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


        window.location.href = "../index.html";

    }, 600);
});

// carrito.js
document.addEventListener("DOMContentLoaded", () => {

    const tbody = document.querySelector("#carrito-body");
    const btnVaciar = document.querySelector("#vaciar-carrito");

    cargarCarrito();

    function cargarCarrito() {
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        tbody.innerHTML = "";

        carrito.forEach((producto, index) => {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td><img src="${producto.imagen}" width="80"></td>
                <td>${producto.nombre}</td>
                <td>${producto.precio}</td>
                <td><button class="eliminar" data-index="${index}">X</button></td>
            `;

            tbody.appendChild(tr);
        });
    }

    tbody.addEventListener("click", (e) => {
        if (e.target.classList.contains("eliminar")) {
            eliminarProducto(e.target.dataset.index);
        }
    });

    function eliminarProducto(index) {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        carrito.splice(index, 1);

        localStorage.setItem("carrito", JSON.stringify(carrito));
        cargarCarrito();
    }

    btnVaciar.addEventListener("click", (e) => {
        e.preventDefault();

        localStorage.removeItem("carrito");
        cargarCarrito();
    });
});


