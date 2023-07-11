// Agregar un evento de escucha al cargar la página
window.addEventListener("load", function() {
  // Obtener la referencia al elemento de la imagen del logo después de que se haya cargado completamente
  const logoImage = document.getElementById("logo");

  // Agregar un controlador de eventos al hacer clic en la imagen del logo
  logoImage.addEventListener("click", function() {
    // Redirigir a la página "pacientes.html"
    window.location.href = "index.html";
  });
});
