/* =========================================================
   Comportamiento dinámico del sitio (compartido por todas las páginas)
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* 1. Marcar en el menú la página actual */
  const paginaActual = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".menu a").forEach((enlace) => {
    if (enlace.getAttribute("href") === paginaActual) enlace.classList.add("activo");
  });

  /* 2. Botón de menú para pantallas pequeñas */
  const botonMenu = document.querySelector(".boton-menu");
  const menu = document.querySelector(".menu");
  if (botonMenu && menu) {
    botonMenu.addEventListener("click", () => menu.classList.toggle("abierto"));
  }

  /* 3. Palabra que cambia en la portada */
  const palabra = document.querySelector(".palabra-cambiante");
  if (palabra) {
    const palabras = ["software", "bases de datos", "páginas web", "soluciones"];
    let indice = 0;
    setInterval(() => {
      indice = (indice + 1) % palabras.length;
      palabra.textContent = palabras[indice];
    }, 2200);
  }

  /* 4. Aparición de elementos y barras de habilidades al hacer scroll */
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      entrada.target.classList.add("visible");
      entrada.target.querySelectorAll(".barra-relleno").forEach((barra) => {
        barra.style.width = barra.dataset.nivel + "%";
      });
      observador.unobserve(entrada.target);
    });
  }, { threshold: 0.15 });
  document.querySelectorAll(".aparecer").forEach((el) => observador.observe(el));

  /* 5. Validación del formulario de contacto antes de enviarlo (método GET) */
  const formulario = document.querySelector("#form-contacto");
  if (formulario) {
    formulario.addEventListener("submit", (evento) => {
      let valido = true;
      const nombre = formulario.nombre;
      const correo = formulario.correo;
      const mensaje = formulario.mensaje;

      const mostrarError = (campo, texto) => {
        document.querySelector("#error-" + campo.name).textContent = texto;
        if (texto) valido = false;
      };

      mostrarError(nombre, nombre.value.trim().length < 3 ? "Escribe tu nombre completo." : "");
      mostrarError(correo, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.value) ? "" : "Escribe un correo válido.");
      mostrarError(mensaje, mensaje.value.trim().length < 10 ? "El mensaje debe tener al menos 10 caracteres." : "");

      if (!valido) evento.preventDefault();   // si hay errores, no se envía
    });
  }

  /* 6. Página de agradecimiento: leer los datos que llegaron por GET */
  const resumen = document.querySelector("#resumen-envio");
  if (resumen) {
    const datos = new URLSearchParams(location.search);
    const nombre = datos.get("nombre") || "visitante";
    document.querySelector("#nombre-visitante").textContent = nombre;
    resumen.innerHTML = "";
    datos.forEach((valor, clave) => {
      const fila = document.createElement("tr");
      const celdaClave = document.createElement("td");
      const celdaValor = document.createElement("td");
      celdaClave.textContent = clave;
      celdaValor.textContent = valor;          // textContent evita inyectar HTML
      fila.append(celdaClave, celdaValor);
      resumen.appendChild(fila);
    });
  }

  /* 7. Año actual en el pie de página */
  const anio = document.querySelector("#anio");
  if (anio) anio.textContent = new Date().getFullYear();
});
