// Función para mostrar el formulario de login
const login = document.querySelector('#btn_login');
login.addEventListener("click", function() {
  window.location.href = "login.html";
});



// URL de la API de productos
const url = "https://664e32a3fafad45dfadf5c22.mockapi.io/api/productos";

// Selecciona el elemento con la clase 'cards'
const aplicacion = document.querySelector('.cards');

// Función asíncrona para obtener datos de la API
const obtenerData = async () => {
  try { // Usamos try...catch para manejar errores
    // Realiza una solicitud a la API
    const response = await fetch(url);

    // Convierte la respuesta en un objeto JSON
    const data = await response.json();

    // Muestra los datos en la consola para verificar que se obtuvieron correctamente
    console.log(data);

    // Limpia el contenedor antes de agregar nuevas tarjetas
    aplicacion.innerHTML = '';

    // Itera sobre cada elemento en los datos obtenidos de la API
    data.forEach(elementoApi => {
      // Crea una plantilla de tarjeta con los datos de cada elemento
      const cardHTML = `
        <div class="card">
          <img src="${elementoApi.url}" class="card_img" alt="">
          <h2 class="card_nombre">${elementoApi.name}</h2>
          <h3 class="card_precio">${elementoApi.precio}</h3>
          <div class="card_botones">
            <input type="button" class="btn_editar" id="btn_editar_${elementoApi.id}" value="Editar">
            <input type="button" class="btn_eliminar" id="btn_eliminar_${elementoApi.id}" value="Eliminar">
          </div>
        </div>
      `;

      // Inserta la tarjeta generada al final del contenedor
      aplicacion.insertAdjacentHTML('beforeend', cardHTML);
    });

  } catch (error) {
    // Muestra un mensaje de error en la consola si ocurre un problema
    console.error('Error al obtener los datos:', error.message);
  }
};

// Llama a la función para obtener los datos cuando la página se carga
obtenerData();



// Función para guardar un nuevo producto
const guardarProducto = async (e) => {
  e.preventDefault(); // Evitar que el formulario se envíe de manera predeterminada

  // Obtener los valores de los campos del formulario
  const nombre = document.getElementById('nombre').value.trim();
  const urlImagen = document.getElementById('url').value.trim();
  const titulo = document.getElementById('titulo').value.trim();
  const precio = document.getElementById('precio').value.trim();

  // Verificar que todos los campos estén completos
  if (!nombre || !urlImagen || !titulo || !precio) {
    alert('Por favor, complete todos los campos');
    return;
  }

  // Crear un objeto con los datos del nuevo producto
  const nuevoProducto = {
    name: nombre,
    url: urlImagen,
    titulo: titulo,
    precio: precio
  };

  try {
    // Enviar la solicitud para guardar el nuevo producto
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevoProducto)
    });

    // Verificar si la solicitud fue exitosa
    if (!response.ok) {
      throw new Error('Error al guardar el producto');
    }

    // Mostrar un mensaje de éxito
    alert('Producto guardado exitosamente');

    // Recargar la lista de productos después de crear uno nuevo
    obtenerData();

    // Limpiar los campos del formulario
    document.getElementById('producto_form').reset();
  } catch (error) {
    // Mostrar un mensaje de error en caso de que ocurra un problema
    console.error(error);
    alert('Ocurrió un error al guardar el producto');
  }
};

// Agregar un event listener al formulario para manejar el evento de envío
document.getElementById('producto_form').addEventListener('submit', guardarProducto);


//************************************************************
//editar producto

// Agregamos un event listener al documento
document.addEventListener('click', function(event) {
  // Verificamos si el elemento clickeado tiene la clase 'btn_editar'
  if (event.target.classList.contains('btn_editar')) {
      // Si el clic fue en un botón de editar, mostramos una alerta
      alert("Botón editar presionado");
  }
});



/////////////////////////////////ELIMINAR/////

// Función para eliminar un producto
const eliminarProducto = async (id) => {
  try {
      // Construye la URL para eliminar el producto con el ID específico
      const urlEliminar = `${url}/${id}`;

      // Realiza una solicitud para eliminar el producto
      const response = await fetch(urlEliminar, {
          method: 'DELETE'
      });

      // Verifica si la solicitud fue exitosa
      if (!response.ok) {
          throw new Error('Error al eliminar el producto');
      }

      // Muestra un mensaje de éxito
      alert('Producto eliminado exitosamente');

      // Recarga la lista de productos después de eliminar uno
      obtenerData();
  } catch (error) {
      // Muestra un mensaje de error en caso de que ocurra un problema
      console.error(error);
      alert('Ocurrió un error al eliminar el producto');
  }
};

// Agregar un event listener al documento para delegación de eventos
document.addEventListener('click', function(event) {
  // Verificamos si se presionó un botón de eliminar
  if (event.target.classList.contains('btn_eliminar')) {
      // Obtenemos el ID del producto desde el ID del botón de eliminar
      const id = event.target.id.split('_')[2];
    alert(id);
      // Confirmamos si realmente quiere eliminar el producto
      if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
          // Llamamos a la función para eliminar el producto
          eliminarProducto(id);
      }
  }
});

