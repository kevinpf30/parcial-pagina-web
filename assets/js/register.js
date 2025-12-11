const form = document.getElementById("registerForm");
const btn = document.getElementById("btnRegister");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    let name = form.name.value.trim();
    let email = form.email.value.trim();
    let password = form.password.value.trim();
    let password_confirm = form.password_confirm.value.trim();

    if (password !== password_confirm) {
        alert("Las contraseñas no coinciden");
        return;
    }

    btn.innerHTML = "Creando cuenta...";
    btn.setAttribute("disabled", "true");

    let data = {
        name,
        email,
        password,
        password_confirmation: password_confirm
    };

    try {
        const response = await fetch("https://apertum.danydev.co/api/shoplite/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await response.json();


        if (!response.ok) {
            alert("Error: " + (result.message || "No se pudo crear el usuario"));
            btn.innerHTML = "Registrarse";
            btn.removeAttribute("disabled");
            return;
        }

        alert("Cuenta creada con éxito " + name + ". Por favor, inicia sesión.");
        window.location.href = "index.html";

    } catch (error) {
        alert("Ocurrió un error en la petición");
    }
     btnRegister.innerHTML = "Registrarse";
    btnRegister.removeAttribute("disabled");
});
