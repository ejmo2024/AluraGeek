
document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('.loggin');
  
    form.addEventListener('submit', function(event) {
      event.preventDefault(); // Evita que el formulario se envíe normalmente
  
  
      //const form_productos=document.querySelector(".product_form")
      
      // Obtener los valores de usuario y contraseña
      const usuario = document.getElementById('usuario').value;
      const password = document.getElementById('password').value;
  
      // Aquí puedes agregar la lógica para verificar el usuario y la contraseña
      // Si la verificación es exitosa, puedes redirigir al usuario a index.html
      // Por ahora, simplemente redireccionamos sin ninguna verificación
      if (usuario==="admin" && password==="admin") {
       
        window.location.href = "index.html";
        //document.getElementById("boton_guardar").disabled = false;
        //document.getElementById("boton_guardar").style.color = "orange";
  
        
      } else {
        alert("Por favor, ingresa un usuario y contraseña válidos.");
        // Limpiar los campos del formulario
        //document.getElementById("b_ingresar").style.color = "orange";
        document.querySelector('.loggin').reset();
      }
    });
  });