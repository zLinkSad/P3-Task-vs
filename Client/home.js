document.getElementById('clickMeBtn').addEventListener('click', function() {
    alert('¡Has hecho clic en el botón!');
});

document.getElementById('logoutBtn').addEventListener('click', function() {
    // Aquí podrías agregar más lógica para cerrar sesión, como limpiar cookies o redirigir a otra página.
    swal({
        title: "Estas seguro?",
        text: "Estas seguro que deseas cerrar sesion?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("Sesion Cerrada correctamente", {
            icon: "success",
          })
          .then(data => {
            window.location = './index.html';
          });
        }
      });
});