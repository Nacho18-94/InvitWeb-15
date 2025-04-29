// ANIMACIÓN DE SCROLL (Scroll Reveal personalizado)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.section').forEach(el => observer.observe(el));


// Confirmación del formulario (simulada)
document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();
    document.getElementById("mensaje-confirmacion").style.display = "block";
    this.reset();
});

// Cuenta regresiva
const eventoFecha = new Date("2025-04-26T21:00:00");
const diasSpan = document.getElementById("dias");
const horasSpan = document.getElementById("horas");
const minutosSpan = document.getElementById("minutos");
const segundosSpan = document.getElementById("segundos");

function actualizarContador() {
    const ahora = new Date();
    const diferencia = eventoFecha - ahora;

    if (diferencia <= 0) return;

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
    const segundos = Math.floor((diferencia / 1000) % 60);

    diasSpan.textContent = dias.toString().padStart(2, "0");
    horasSpan.textContent = horas.toString().padStart(2, "0");
    minutosSpan.textContent = minutos.toString().padStart(2, "0");
    segundosSpan.textContent = segundos.toString().padStart(2, "0");
}

setInterval(actualizarContador, 1000);

// ACTIVACIÓN MÚSICA
const musica = document.getElementById('musica-fondo');
const btnAudio = document.getElementById('btn-audio');
const icono = btnAudio.querySelector('i');
let musicaIniciada = false;

btnAudio.addEventListener('click', () => {
    if (!musicaIniciada) {
        musica.play().then(() => {
            musicaIniciada = true;
            icono.classList.replace('fa-play', 'fa-pause');
        });
    } else {
        if (musica.paused) {
            musica.play();
            icono.classList.replace('fa-play', 'fa-pause');
        } else {
            musica.pause();
            icono.classList.replace('fa-pause', 'fa-play');
        }
    }
});

document.addEventListener('click', () => {
    if (!musicaIniciada) {
        musica.play();
        musicaIniciada = true;
    }
}, { once: true });

// Copiar texto
function copiarTexto(boton, id) {
    const texto = document.getElementById(id).textContent;
    navigator.clipboard.writeText(texto).then(() => {
        const mensaje = boton.nextElementSibling;
        mensaje.classList.add("mostrar-copiado"); // Mostrar el mensaje de copiado
        setTimeout(() => {
            mensaje.classList.remove("mostrar-copiado"); // Ocultar el mensaje después de 2 segundos
        }, 2000);
    }).catch(err => {
        console.error('Error al copiar el texto: ', err); // Manejo de errores
    });
}
// Carrusel de imágenes
document.addEventListener("DOMContentLoaded", () => {
    const imagenes = document.querySelectorAll(".carrusel img");
    let indiceActual = 0;

    function mostrarImagen(indice) {
        imagenes.forEach((img, i) => {
            img.classList.remove("activa", "saliente");
            if (i === indice) {
                img.classList.add("activa");
            } else if (i === indiceActual) {
                img.classList.add("saliente");
            }
        });
    }

    window.moverCarrusel = (direccion) => {
        const nuevoIndice = (indiceActual + direccion + imagenes.length) % imagenes.length;
        mostrarImagen(nuevoIndice);
        indiceActual = nuevoIndice;
    };

    mostrarImagen(indiceActual);
});