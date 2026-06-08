const IMG = document.getElementById("carrusel-img");
const BG_IMG = document.getElementById("carrusel-bg");
const NOMBRE = document.getElementById("nombre");
const DESCRIPCION = document.getElementById("descripcion");
const CARACTERISTICAS = document.getElementById("caracteristicas");
const INICIO = document.getElementById("inicio");
const ANTERIOR = document.getElementById("anterior");
const PLAY = document.getElementById("play");
const PLAY_ICON = document.getElementById("play-icon");
const SIGUIENTE = document.getElementById("siguiente");
const ULTIMO = document.getElementById("ultimo");
const STATUS = document.getElementById("status");

const AGREGAR = document.getElementById("agregar");
const BUSCAR = document.getElementById("buscar");
const MODIFICAR = document.getElementById("modificar");
const ELIMINAR = document.getElementById("eliminar");

const lugaresViaje = [
    {
        nombre: "Puente SNP",
        descripcion:
            "Se encuentra sobre el río Danubio, es el puente atirantado más largo del mundo y tiene un restaurante en forma de ovni",
        imagen: "img/PXL_20260102_210512356.jpg",
        caracteristicas: [
            "Ubicación: Bratislava, Eslovaquia",
            "Tipo: Puente atirantado de un solo pilón",
            "Inauguración: 1972",
        ],
    },
    {
        nombre: "Escultura 'La Entrega de las Coronas'",
        descripcion:
            "Estatua de bronce realizada por el sculptor Jozef Kostka que representa a dos jóvenes portando una cinta de agradecimiento. Forma parte del complejo monumental y militar de Slavín.",
        imagen: "img/PXL_20260104_112117078.jpg",
        caracteristicas: [
            "Ubicación: Monumento Slavín, Bratislava",
            "Autor: Jozef Kostka (1961-1963)",
            "Significado: Homenaje y gratitud a los libertadores de la ciudad",
        ],
    },
    {
        nombre: "Estatua de San Martín",
        descripcion:
            "Impresionante sculpture de San Martín partiendo su capa para dársela a un desfavorecido, ubicada dentro de la catedral",
        imagen: "img/PXL_20260104_135518262~2.jpg",
        caracteristicas: [
            "Ubicación: Catedral de San Martín, Bratislava",
            "Material: Plomo",
            "Escultor: Georg Rafael Donner (Siglo XVIII)",
        ],
    },
    {
        nombre: "Interior de la Catedral de San Esteban",
        descripcion:
            "Vista de la parte central, las columnas góticas y el púlpito tallado en piedra de la iglesia principal de la ciudad",
        imagen: "img/PXL_20260105_105143889.jpg",
        caracteristicas: [
            "Ubicación: Viena, Austria",
            "Estilo arquitectónico: Gótico tardío",
            "Elemento destacado: Púlpito de Anton Pilgram",
        ],
    },
    {
        nombre: "Altar Barroco en San Esteban",
        descripcion:
            "Altar barroco ornamentado que contrasta con la estructura gótica de la catedral",
        imagen: "img/PXL_20260105_105915862~2.jpg",
        caracteristicas: [
            "Ubicación: Catedral de San Esteban, Viena",
            "Estilo: Barroco",
            "Materiales: Mármol y Urgentemente doradas",
        ],
    },
    {
        nombre: "Monumento a Johann Strauss",
        descripcion:
            "La famosa estatua dorada del compositor, rodeada por un arco de mármol con relieves de ninfas",
        imagen: "img/PXL_20260105_132003646~2.jpg",
        caracteristicas: [
            "Ubicación: Stadtpark, Viena",
            "Material: Bronce dorado y mármol",
            "Inauguración: 1921",
        ],
    },
    {
        nombre: "Ópera Estatal de Viena",
        descripcion:
            "Vista nocturna de uno de los teatros de ópera más importantes y prestigiosos del mundo",
        imagen: "img/PXL_20260105_160136702.jpg",
        caracteristicas: [
            "Ubicación: Viena, Austria",
            "Estilo: Neorrenacentista",
            "Capacidad: Alrededor de 2.200 espectadores",
        ],
    },
    {
        nombre: "Estatua de Hércules",
        descripcion:
            "Escultura monumental que flanquea una de las entradas del Palacio Imperial de Hofburg, mostrando a Hércules luchando contra la hidra",
        imagen: "img/PXL_20260105_162704899.jpg",
        caracteristicas: [
            "Ubicación: Palacio Hofburg, Viena",
            "Representación: Mitología clásica",
            "Estilo: Barroco",
        ],
    },
    {
        nombre: "Callejón con Graffitis en la Nieve",
        descripcion:
            "Contraste urbano nocturno que muestra la cultura del arte callejero bajo una capa de nieve",
        imagen: "img/PXL_20260105_203934283.jpg",
        caracteristicas: [
            "Ubicación: Calle Mariánska, Bratislava",
            "Elemento: Señal de zona residencial",
            "Estilo: Arte urbano / Graffiti contemporáneo",
        ],
    },
    {
        nombre: "Estatua de Santa Isabel de Hungría",
        descripcion:
            "Hermosa escultura dedicada a Isabel de Turingia, famosa por su caridad hacia los desfavorecidos. Al fondo se aprecia la silueta del imponente Castillo de Bratislava.",
        imagen: "img/PXL_20260106_104828845.jpg",
        caracteristicas: [
            "Ubicación: Jardines del Castillo, Bratislava",
            "Elemento destacado: Castillo de Bratislava al fondo",
            "Dedicatoria: Alžbeta Durínska (1207 - 1231)",
        ],
    },
];

let indiceActual = 0;
let temporizador = null;

function limpiarTexto(texto) {
    if (!texto) return "";
    return texto
        .toLowerCase()
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

// APLICADO AQUÍ: Función modificada con transiciones asíncronas controladas
function mostrarLugar(indice) {
    if (lugaresViaje.length === 0) {
        if (IMG) IMG.src = "";
        if (BG_IMG) BG_IMG.src = "";
        if (NOMBRE) NOMBRE.textContent = "Sin destinos";
        if (DESCRIPCION)
            DESCRIPCION.textContent =
                "Usa el panel superior CRUD para añadir nuevos destinos.";
        if (CARACTERISTICAS) CARACTERISTICAS.innerHTML = "";
        if (STATUS) STATUS.textContent = "0 / 0";
        return;
    }

    const lugar = lugaresViaje[indice];

    if (IMG) {
        imgElement = IMG;
        imgElement.classList.remove("opacity-100");
        imgElement.classList.add("opacity-0");
    }

    setTimeout(() => {
        if (IMG) {
            IMG.src = lugar.imagen;
            IMG.alt = "Fotografía de " + lugar.nombre;

            IMG.onload = () => {
                IMG.classList.remove("opacity-0");
                IMG.classList.add("opacity-100");
            };
        }

        if (BG_IMG) {
            BG_IMG.src = lugar.imagen;
        }

        if (NOMBRE) NOMBRE.textContent = lugar.nombre;
        if (DESCRIPCION) DESCRIPCION.textContent = lugar.descripcion;

        if (CARACTERISTICAS) {
            CARACTERISTICAS.innerHTML = "";
            lugar.caracteristicas.forEach(function (caracteristica) {
                const li = document.createElement("li");
                li.className =
                    "flex items-start gap-2 text-sm text-[#e0e1dd]/80";
                li.innerHTML =
                    '<span class="text-[#dfb15b] text-xs mt-1">✦</span> ' +
                    caracteristica;
                CARACTERISTICAS.appendChild(li);
            });
        }

        if (STATUS) {
            STATUS.textContent = indice + 1 + " / " + lugaresViaje.length;
        }
    }, 150);
}

function buscar(nombreLugar) {
    if (!nombreLugar) return -1;

    const terminoLimpio = limpiarTexto(nombreLugar);

    return lugaresViaje.findIndex((lugar) => {
        const nombreLimpioBD = limpiarTexto(lugar.nombre);
        return nombreLimpioBD.includes(terminoLimpio);
    });
}

function crearLugar() {
    const nombre = prompt("Nombre del nuevo destino turístico:");
    if (!nombre) return;

    if (buscar(nombre) !== -1) {
        alert("Error: '" + nombre + "' o un destino muy similar ya existe.");
        return;
    }

    const descripcion = prompt("Descripción del destino:");
    const imagen =
        prompt("Ruta de la imagen (ej: img/nueva-foto.jpg):") ||
        "img/default.jpg";
    const caractRaw = prompt("Características (separadas por comas):");

    const caracteristicas = caractRaw
        ? caractRaw.split(",").map((c) => c.trim())
        : ["Detalles por definir"];

    lugaresViaje.push({ nombre, descripcion, imagen, caracteristicas });

    detenerAutoplay();
    indiceActual = lugaresViaje.length - 1;
    mostrarLugar(indiceActual);
    alert("Registro guardado exitosamente.");
}

function leerLugar() {
    const nombre = prompt(
        "Escribe el nombre del destino que buscas (¡Puedes usar minúsculas o textos parciales!):",
    );
    const index = buscar(nombre);

    if (index !== -1) {
        detenerAutoplay();
        indiceActual = index;
        mostrarLugar(indiceActual);
    } else {
        alert("❌ No se encontró ningún resultado que coincida.");
    }
}

function modificarLugar() {
    const nombreBuscar = prompt(
        "Destino a modificar (Puedes escribir aproximado):",
    );
    const index = buscar(nombreBuscar);

    if (index !== -1) {
        detenerAutoplay();
        const lugar = lugaresViaje[index];

        lugar.nombre =
            prompt("Modificar nombre:", lugar.nombre) || lugar.nombre;
        lugar.descripcion =
            prompt("Modificar descripción:", lugar.descripcion) ||
            lugar.descripcion;
        lugar.imagen =
            prompt("Modificar ruta de imagen:", lugar.imagen) || lugar.imagen;

        const caractRaw = prompt(
            "Modificar características (separadas por comas):",
            lugar.caracteristicas.join(", "),
        );
        if (caractRaw) {
            lugar.caracteristicas = caractRaw.split(",").map((c) => c.trim());
        }

        indiceActual = index;
        mostrarLugar(indiceActual);
        alert("Registro actualizado.");
    } else {
        alert("❌ El destino no existe.");
    }
}

function eliminarLugar() {
    const nombreBuscar = prompt("Nombre del destino a eliminar:");
    const index = buscar(nombreBuscar);

    if (index !== -1) {
        detenerAutoplay();
        if (
            confirm(
                "¿Estás seguro de eliminar '" +
                    lugaresViaje[index].nombre +
                    "'?",
            )
        ) {
            lugaresViaje.splice(index, 1);
            if (indiceActual >= lugaresViaje.length) {
                indiceActual = Math.max(0, lugaresViaje.length - 1);
            }
            mostrarLugar(indiceActual);
            alert("Destino eliminado.");
        }
    } else {
        alert("El destino no existe.");
    }
}

if (AGREGAR) AGREGAR.addEventListener("click", crearLugar);
if (BUSCAR) BUSCAR.addEventListener("click", leerLugar);
if (MODIFICAR) MODIFICAR.addEventListener("click", modificarLugar);
if (ELIMINAR) ELIMINAR.addEventListener("click", eliminarLugar);

function avanzarAutomatico() {
    if (lugaresViaje.length === 0) return;
    indiceActual = (indiceActual + 1) % lugaresViaje.length;
    mostrarLugar(indiceActual);
}

function iniciarAutoplay() {
    if (lugaresViaje.length === 0) return;
    if (temporizador === null) {
        temporizador = setInterval(avanzarAutomatico, 3000);
        if (PLAY_ICON) PLAY_ICON.textContent = "⏸";
    }
}

function detenerAutoplay() {
    if (temporizador !== null) {
        clearInterval(temporizador);
        temporizador = null;
        if (PLAY_ICON) PLAY_ICON.textContent = "▶";
    }
}

if (PLAY) {
    PLAY.addEventListener("click", function () {
        if (temporizador === null) iniciarAutoplay();
        else detenerAutoplay();
    });
}

if (SIGUIENTE) {
    SIGUIENTE.addEventListener("click", function () {
        detenerAutoplay();
        if (lugaresViaje.length === 0) return;
        indiceActual = (indiceActual + 1) % lugaresViaje.length;
        mostrarLugar(indiceActual);
    });
}

if (ANTERIOR) {
    ANTERIOR.addEventListener("click", function () {
        detenerAutoplay();
        if (lugaresViaje.length === 0) return;
        indiceActual =
            (indiceActual - 1 + lugaresViaje.length) % lugaresViaje.length;
        mostrarLugar(indiceActual);
    });
}

if (INICIO) {
    INICIO.addEventListener("click", function () {
        detenerAutoplay();
        indiceActual = 0;
        mostrarLugar(indiceActual);
    });
}

if (ULTIMO) {
    ULTIMO.addEventListener("click", function () {
        detenerAutoplay();
        if (lugaresViaje.length === 0) return;
        indiceActual = lugaresViaje.length - 1;
        mostrarLugar(indiceActual);
    });
}

mostrarLugar(indiceActual);
