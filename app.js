document.addEventListener("DOMContentLoaded", function() {
  marcarEnlaceActivo();
  agregarEventoIrArriba();
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

// Función para crear un carrusel de citas en la página principal 
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

function cambiarCita() {
  var cita = citas[citaIndex];
  citaTexto.textContent = cita.texto;
  citaAutor.innerHTML = '<a href="' + cita.autor.enlace + '" target="_blank">' + cita.autor.nombre + '</a>';
  citaIndex = (citaIndex + 1) % citas.length; 
}

cambiarCita();
setInterval(cambiarCita, 5000);