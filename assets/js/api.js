
const API_URL = "https://apertum.danydev.co/api/shoplite";


async function apiRequest(endpoint, method = "GET", body = null, auth = false) {
    let headers = {
        "Content-Type": "application/json"
    };


    if (auth) {
        let token = localStorage.getItem("token");
        if (token) {
            headers["Authorization"] = "Bearer " + token;
        }
    }

    let options = {
        method: method,
        headers: headers
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        let response = await fetch(API_URL + endpoint, options);
        let data = await response.json().catch(() => ({}));

        return { ok: response.ok, data };

    } catch (error) {
        console.error("Error general en apiRequest:", error);
        return { ok: false, data: { message: "Error de conexión con el servidor." } };
    }
}
function checkAuth() {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'index.html';
  }
}
export { apiRequest, checkAuth };
async function safeFetch(url, options = {}) {
  try {
    const resp = await fetch(url, options);


    const text = await resp.text();              
    let data;
    try {
      data = JSON.parse(text);            
    } catch (e) {
  
      return { ok: resp.ok, status: resp.status, data: null, raw: text };
    }

    return { ok: resp.ok, status: resp.status, data, raw: null };
  } catch (err) {
  
    return { ok: false, status: 0, data: null, raw: null, error: err };
  }
}
export { safeFetch };