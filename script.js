/* ============================================================
   PAPAPROFE — script.js
   Un solo trabajo: detectar cuándo un elemento .reveal entra
   en pantalla y agregarle la clase .visible (el CSS hace el resto).
   ============================================================ */

// IntersectionObserver: API nativa del navegador que "vigila"
// elementos y avisa cuando entran al área visible. Es MUY eficiente:
// no se ejecuta en cada pixel de scroll como los métodos viejos.
const observador = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visible');
        // Ya apareció una vez: dejamos de vigilarlo (la animación
        // corre solo la primera vez, no cada vez que subís y bajás).
        observador.unobserve(entrada.target);
      }
    });
  },
  {
    threshold: 0.18,        // dispara cuando el 18% del elemento es visible
    rootMargin: '0px 0px -40px 0px' // un pequeño margen para que no dispare justo al borde
  }
);

// Vigilar todos los elementos marcados con la clase .reveal
document.querySelectorAll('.reveal').forEach((el) => observador.observe(el));

// Validación del correo en el formulario de lista de espera:
// el navegador ya bloquea el envío si falta el "@" o el "." del dominio
// (gracias al atributo pattern), pero acá mostramos un mensaje en español
// claro en vez del mensaje genérico del navegador.
const inputCorreo = document.querySelector('.formulario input[type="email"]');
if (inputCorreo) {
  inputCorreo.addEventListener('invalid', () => {
    inputCorreo.setCustomValidity(
      'Escribí un correo válido, con "@" y un punto en el dominio (ej: tucorreo@ejemplo.com)'
    );
  });
  inputCorreo.addEventListener('input', () => {
    inputCorreo.setCustomValidity('');
  });
}
