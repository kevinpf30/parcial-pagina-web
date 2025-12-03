// Ejemplo conceptual en Node.js/Express
app.get('/admin', (req, res) => {
  // Aquí verificas si el usuario está logueado y es admin
  if (usuarioEsAdmin(req)) {
    res.render('admin/dashboard', { titulo: 'Panel de Administración' });
  } else {
    res.redirect('/auth/login');
  }
});
app.get('/auth/login', (req, res) => {
  res.render('auth/login', { titulo: 'Iniciar Sesión' });
});

app.get('/auth/registro', (req, res) => {
  res.render('auth/registro', { titulo: 'Registrarse' });
});
