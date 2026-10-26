import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './css/main.css';
import { msj_error, msj_exito } from './alertas.js';

const texto = document.getElementById('texto');
const palabra = document.getElementById('palabra');
const btn_buscar = document.getElementById('btn_buscar');
const btn_limpiar = document.getElementById('btn_limpiar');
const resultado = document.getElementById('resultado');
const contador = document.getElementById('contador');

const buscar_palabra = () => {
    const contenido = texto.value;
    const buscar = palabra.value.trim();

    if (contenido.trim() === '') {
        return msj_error('Debes escribir un texto.');
    }
    if (buscar === '') {
        return msj_error('Debes escribir una palabra para buscar.');
    }

    const palabra_segura = buscar.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const expresion = new RegExp(palabra_segura, 'gi');
    const coincidencias = contenido.match(expresion);
    const cantidad = coincidencias ? coincidencias.length : 0;
    const contenido_seguro = contenido
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    const texto_resaltado = contenido_seguro.replace(expresion, '<mark>$&</mark>');
    resultado.innerHTML = texto_resaltado;

    if (cantidad > 0) {
        contador.innerText = `La palabra "${buscar}" aparece ${cantidad} ${cantidad === 1 ? 'vez' : 'veces'}.`;
        msj_exito('La búsqueda se realizó correctamente.');
    } else {
        contador.innerText = `La palabra "${buscar}" no aparece en el texto.`;
        msj_error('No se encontraron coincidencias.');
    }
};

const limpiar_pantalla = () => {
    texto.value = '';
    palabra.value = '';
    resultado.innerText = 'Aquí aparecerá el texto con las palabras resaltadas.';
    contador.innerText = 'Aquí aparecerá el número de coincidencias.';
};

btn_buscar.addEventListener('click', buscar_palabra);
btn_limpiar.addEventListener('click', limpiar_pantalla);
palabra.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        buscar_palabra();
    }
});
