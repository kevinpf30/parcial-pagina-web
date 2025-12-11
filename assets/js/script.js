let form = document.querySelector("#formLogin");
let btnLogin = document.querySelector("#btnLogin");


async function loginUser(email, password) {
    try {
        let request = {
            email: email,
            password: password
        };

        let response = await fetch("https://apertum.danydev.co/api/shoplite/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(request)
        });

        let data = await response.json();

        
        if (response.ok) {
            
            localStorage.setItem("token", data.data.token);
            localStorage.setItem("user", JSON.stringify(data.data.user));


            alert("Login exitoso");
            window.location.href = "dashboard.html";
        }else{
            alert("Verfica usuario y/o contraseña");
            btnLogin.textContent = "Sign in";
            btnLogin.removeAttribute("disabled")

        }

    } catch (error) {
        console.error("Error:", error);
    }

}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    let username = form.username.value;
    let password = form.password.value;

    if (username.length < 3 || password.length < 3) {
        alert("Verfique que los campos esten correctos");
        return;
    }

    btnLogin.innerHTML = "Cargardo...";
    btnLogin.disable = true
    btnLogin.setAttribute("disabled", "true");

    loginUser(username, password);

});


token = localStorage.getItem("token");
if(token){
    alert("Ya estas logeado");
    window.location.href = "dashboard.html";
}
let rememberMe = document.querySelector("#rememberMe");




