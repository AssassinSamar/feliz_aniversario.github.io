// ========================================
// CONFIGURACIÓN EDITABLE
// ========================================

// FECHA DE INICIO DE LA RELACIÓN (formato: AAAA-MM-DD)
const FECHA_INICIO = '2022-02-23'; // ⬅️ CAMBIA ESTA FECHA

// FRASE PARA EL EFECTO DE ESCRITURA
const FRASE_PROMESA = 'Contigo encontré mi hogar, mi paz y mi felicidad infinita';

// VELOCIDAD DEL EFECTO DE ESCRITURA (milisegundos por letra)
const VELOCIDAD_TYPING = 80;

// ========================================
// VARIABLES GLOBALES
// ========================================
let audioElement = null;
let isPlaying = false;

// ========================================
// FUNCIÓN: CALCULAR TIEMPO JUNTOS
// ========================================
function calcularTiempoJuntos() {
    const fechaInicio = new Date(FECHA_INICIO);
    const ahora = new Date();
    
    // Calcular años
    let años = ahora.getFullYear() - fechaInicio.getFullYear();
    
    // Calcular meses
    let meses = ahora.getMonth() - fechaInicio.getMonth();
    if (meses < 0) {
        años--;
        meses += 12;
    }
    
    // Calcular días totales
    const diferenciaTiempo = ahora - fechaInicio;
    const dias = Math.floor(diferenciaTiempo / (1000 * 60 * 60 * 24));
    
    // Actualizar el DOM
    document.getElementById('years').textContent = años;
    document.getElementById('months').textContent = meses;
    document.getElementById('days').textContent = dias;
}

// ========================================
// FUNCIÓN: EFECTO DE ESCRITURA (TYPING)
// ========================================
function efectoEscritura() {
    const elemento = document.getElementById('typed-text');
    let indice = 0;
    
    const intervalo = setInterval(() => {
        if (indice < FRASE_PROMESA.length) {
            elemento.textContent = FRASE_PROMESA.slice(0, indice + 1);
            indice++;
        } else {
            clearInterval(intervalo);
        }
    }, VELOCIDAD_TYPING);
}

// ========================================
// FUNCIÓN: CREAR CORAZONES FLOTANTES
// ========================================
function crearCorazon() {
    const contenedor = document.getElementById('hearts-container');
    const corazon = document.createElement('div');
    
    corazon.className = 'floating-heart';
    corazon.textContent = '❤️';
    corazon.style.left = Math.random() * 100 + '%';
    corazon.style.animationDuration = (Math.random() * 3 + 7) + 's';
    corazon.style.animationDelay = Math.random() * 2 + 's';
    
    contenedor.appendChild(corazon);
    
    // Eliminar el corazón después de la animación
    setTimeout(() => {
        corazon.remove();
    }, 12000);
}

// ========================================
// FUNCIÓN: BOTÓN SORPRESA
// ========================================
function configurarBotonSorpresa() {
    const boton = document.getElementById('surprise-btn');
    const mensaje = document.getElementById('surprise-message');
    
    boton.addEventListener('click', () => {
        mensaje.classList.toggle('hidden');
        
        if (!mensaje.classList.contains('hidden')) {
            // Scroll suave hacia el mensaje
            mensaje.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
}

// ========================================
// FUNCIÓN: MÚSICA DE FONDO (OPCIONAL)
// ========================================
function configurarMusica() {
    const boton = document.getElementById('music-btn');
    
    // OPCIONAL: Descomentar y agregar URL de música
     const urlMusica = 'musica.mp3';
     audioElement = new Audio(urlMusica);
     audioElement.loop = true;
    
    boton.addEventListener('click', () => {
        if (!audioElement) {
            // Si no hay música configurada, mostrar mensaje
            alert('💕 Imagina aquí tu canción favorita juntos 💕');
            return;
        }
        
        if (isPlaying) {
            audioElement.pause();
            boton.classList.remove('playing');
        } else {
            audioElement.play();
            boton.classList.add('playing');
        }
        isPlaying = !isPlaying;
    });
}

// ========================================
// FUNCIÓN: ANIMACIONES AL CARGAR
// ========================================
function iniciarAnimaciones() {
    // Crear corazones flotantes cada 2 segundos
    setInterval(crearCorazon, 2000);
    
    // Iniciar efecto de escritura después de 1 segundo
    setTimeout(efectoEscritura, 1000);
}

// ========================================
// FUNCIÓN: INICIALIZACIÓN
// ========================================
function inicializar() {
    // Calcular y mostrar el tiempo juntos
    calcularTiempoJuntos();
    
    // Actualizar cada hora
    setInterval(calcularTiempoJuntos, 1000 * 60 * 60);
    
    // Configurar botón sorpresa
    configurarBotonSorpresa();
    
    // Configurar música
    configurarMusica();
    
    // Iniciar animaciones
    iniciarAnimaciones();
}

// ========================================
// EJECUTAR AL CARGAR LA PÁGINA
// ========================================

document.addEventListener('DOMContentLoaded', inicializar);
