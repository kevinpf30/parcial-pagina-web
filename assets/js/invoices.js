const token = localStorage.getItem("token");


if (!token) {
    window.location.href = "index.html";
}

async function loadDashboardStats() {
    try {

        const resCategories = await fetch("https://apertum.danydev.co/api/shoplite/categories", {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        const dataCategories = await resCategories.json();

        
        const resProducts = await fetch("https://apertum.danydev.co/api/shoplite/products", {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        const dataProducts = await resProducts.json();

       
        const resInvoices = await fetch("https://apertum.danydev.co/api/shoplite/invoices", {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        const dataInvoices = await resInvoices.json();


       
        let totalVentas = 0;
        if (dataInvoices.data) {
            dataInvoices.data.forEach(f => {
                totalVentas += f.total;
            });
        }

        document.getElementById("statCategories").textContent = dataCategories.data.length;
        document.getElementById("statProducts").textContent = dataProducts.data.length;
        document.getElementById("statInvoices").textContent = dataInvoices.data.length;
        document.getElementById("statSales").textContent = "$" + totalVentas;

    } catch (error) {
        console.error("Error cargando estadísticas:", error);
    }
}

loadDashboardStats();
