document.addEventListener("DOMContentLoaded", function() {
  marcarEnlaceActivo();
  agregarEventoIrArriba();
  cargaLazy();

  if (window.location.pathname.includes('index.html')) {
    iniciarCarruselCitas();
}
});

//Función para que aparezca subrayada/destacada la opción activa del menú
function marcarEnlaceActivo() {
  var enlaces = document.querySelectorAll('nav ul li a');
  var actual = window.location.pathname;

  enlaces.forEach(function(enlace) {
      if (enlace.pathname === actual) {
          enlace.classList.add('activo');
      }

      enlace.addEventListener('click', function() {
          marcarEnlaceActivo();
      });
  });
}

// Agregamos evento al botón
function agregarEventoIrArriba() {
  var botonesIrArriba = document.querySelectorAll('.irArriba');
  botonesIrArriba.forEach(function(boton) {
    boton.addEventListener('click', irArriba);
  });
}

//Función para desplazarse arriba de la web
function irArriba() {
  window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });
}

//Función para contraer/expandir los bloques de texto muy extensos en pantallas pequeñas
// Específicamente se aplica en la página presentación.html, solo en pantallas
function toggleSection(sectionId) {
  var section = document.getElementById(sectionId);
  var btn = section.querySelector('.toggle-btn');

  if (section.style.maxHeight === '300px' || section.style.maxHeight === '') {
    section.style.maxHeight = '';
    section.style.maxHeight = 'fit-content';
    section.style.height = 'fit-content';
    btn.textContent = 'Mostrar menos';
  } else {
    section.style.maxHeight = '300px';
    section.style.height = '300px';
    btn.textContent = 'Mostrar más';

    window.scrollTo({
      top: section.offsetTop, 
      behavior: 'smooth' 
    });
  }
}

function iniciarCarruselCitas() {
  var citas = [
      { texto: "La vida es demasiado corta como para desperdiciarla tratando de hacer que todo el mundo te ame.", autor: { nombre: "Chester Bennington", enlace: "https://www.ecured.cu/Chester_Bennington" } },
      { texto: "La música siempre será el refugio para mí.", autor: { nombre: "Mike Shinoda", enlace: "https://www.mikeshinoda.com/" } },
      { texto: "Es importante para mí seguir siendo creativo y seguir siendo una persona que está siendo desafiada.", autor: { nombre: "Brad Delson", enlace: "https://www.ecured.cu/Brad_Delson" } },
      { texto: "Quiero hacer música que ayude a la gente a vivir su vida de la mejor manera posible.", autor: { nombre: "Rob Bourdon", enlace: "https://www.ecured.cu/Rob_Bourdon" } },
      { texto: "No quiero que la música sea mi legado. No quiero que mi vida sea mi legado. Quiero que mi hijo sea mi legado.", autor: { nombre: "Dave Farrell", enlace: "https://www.ecured.cu/Dave_Farrell" } },
      { texto: "La vida no es un deporte donde intentas ganar cada vez que juegas.", autor: { nombre: "Joe Hahn", enlace: "https://en.wikipedia.org/wiki/Joe_Hahn" } }
  ];

  var citaIndex = 0;
  var citaTexto = document.getElementById("cita-texto");
  var citaAutor = document.getElementById("cita-autor");

  if (!citaTexto || !citaAutor) {
      console.error("Elementos de citas no encontrados en el DOM.");
      return;
  }

  function cambiarCita() {
      var cita = citas[citaIndex];
      citaTexto.textContent = cita.texto;
      citaAutor.innerHTML = '<a href="' + cita.autor.enlace + '" target="_blank">' + cita.autor.nombre + '</a>';
      citaIndex = (citaIndex + 1) % citas.length; 
  }

  cambiarCita();
  setInterval(cambiarCita, 5000);
}

//Función para cargar elementos solamente cuando vayan a aparecer en el viewport.
function cargaLazy(){
  const elementosLazy = document.querySelectorAll('.lazy');

  const cargaElementoLazy = elemento => {
      const opciones = {
          root: null,
          rootMargin: '0px',
          threshold: 0.1
      };
      const observador = new IntersectionObserver((entradas, observador) => {
          entradas.forEach(entrada => {
              if (entrada.isIntersecting) {
                  console.log(`Cargando elemento: ${entrada.target.id || entrada.target.className}`);
                  entrada.target.classList.add('loaded');
                  entrada.target.classList.remove('lazy');
                  observador.unobserve(entrada.target);
              }
          });
      }, opciones);
      observador.observe(elemento);
  };
  elementosLazy.forEach(cargaElementoLazy);
}

function loadVideo(element) {
  const videoId = element.getAttribute('data-video-id');
  element.innerHTML = `
      <iframe loading="lazy" height="315" src="https://www.youtube.com/embed/${videoId}?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  `;
}