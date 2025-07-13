//import { invitados } from "./invitados.js";

const firebaseConfig = {
  apiKey: "AIzaSyDHnHj_z55B-VujnU3Uc1X1lMUt0a-Tjh8",
  authDomain: "xv-anios.firebaseapp.com",
  projectId: "xv-anios",
  storageBucket: "xv-anios.appspot.com",
  messagingSenderId: "1070165494180",
  appId: "1:1070165494180:web:5fbbd3a24226145b62d931",
  measurementId: "G-NE08T41NPZ",
};

// Inicializa Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
// Obtener invitados de Firestore
const querySnapshot = await db.collection("invitadosBodaMiguelZuelania").get();
const invitados = querySnapshot.docs.map((doc) => ({
  id: doc.id,
  ...doc.data(),
}));

console.log("invitados2", invitados);
// Función para obtener el parámetro 'nombre' de la URL
function obtenerCodigo() {
  const params = new URLSearchParams(window.location.search);
  return params.get("codigo");
}

// Función para agregar el nombre al body y opciones al select
function actualizarHTMLConInvitado(invitado) {
  // Actualizar el nombre del invitado
  const nombreInvitadoElem = document.getElementById("nombreInvitado");
  nombreInvitadoElem.textContent = invitado.invitado;

  // **Actualizar lista de checkboxes para acompañantes**
  const checkboxesContainer = document.querySelector(
    ".elementor-field-subgroupzzz"
  );
  checkboxesContainer.innerHTML = ""; // Limpiar checkboxes anteriores

  if (invitado.acompanantes && invitado.acompanantes.length > 0) {
    invitado.acompanantes.forEach((acompanante, index) => {
      console.log(
        "🚀 ~ invitado.acompanantes.forEach ~ acompanante:",
        acompanante
      );
      // Crear checkbox
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = `acompanante-${index}`;
      checkbox.value = acompanante;
      checkbox.name = "acompanantes";

      // Crear etiqueta
      const label = document.createElement("label");
      label.htmlFor = `acompanante-${index}`;
      label.textContent = acompanante;

      // Contenedor de cada opción
      const span = document.createElement("span");
      span.classList.add("elementor-field-optionzz");
      span.classList.add("opciuonescss");
      span.appendChild(checkbox);
      span.appendChild(label);

      // Agregar checkbox al contenedor
      checkboxesContainer.appendChild(span);
    });
  }
}

// Obtener el nombre de la URL

const codigo = obtenerCodigo();

const invitado = invitados.find((inv) => inv.codigo === codigo);

if (invitado) {
  actualizarHTMLConInvitado(invitado);
} else {
  // Mensaje o acción si el invitado no se encuentra
  const nombreInvitadoElem = document.getElementById("nombreInvitado");
  nombreInvitadoElem.textContent = "Invitado no encontrado.";
}

// Función para enviar el mensaje de WhatsApp
function enviarWhatsApp(nombre, numeroInvitados) {
  console.log("🚀 ~ enviarWhatsApp ~ numeroInvitados:", numeroInvitados);
  console.log("🚀 ~ enviarWhatsApp ~ nombre:", nombre);
  const numeroTelefono = "+5219832025287"; // Reemplaza con el número de teléfono al que deseas enviar el mensaje
  let mensaje = `Hola soy *${nombre}* \n\n Confirmo mis acompañantes: ${numeroInvitados}`;
  if (numeroInvitados == "No podra asistir") {
    mensaje = `Hola soy ${nombre}, confirmo que no podre asistir.`;
  }
  if (numeroInvitados == 0) {
    mensaje = `Hola soy ${nombre}, confirmo mi invitación.`;
  }
  const url = `https://api.whatsapp.com/send?phone=${numeroTelefono}&text=${encodeURIComponent(
    mensaje
  )}`;
  window.open(url, "_blank");
}

function enviarWhatsAppForm(nombre_form, anecdota_form, deseos_form) {
  // console.log("🚀 ~ enviarWhatsApp ~ numeroInvitados:", numeroInvitados);
  // console.log("🚀 ~ enviarWhatsApp ~ nombre:", nombre);
  const numeroTelefono = "+5219832025287"; // Reemplaza con el número de teléfono al que deseas enviar el mensaje
  let mensaje = `Hola soy ${nombre_form},\nConfirmó mi invitación. `;

  mensaje = mensaje + "\n\n*Anecdota juntos:* " + anecdota_form;
  mensaje = mensaje + "\n\n*Palabras o buenos deseos:* " + deseos_form;

  const url = `https://api.whatsapp.com/send?phone=${numeroTelefono}&text=${encodeURIComponent(
    mensaje
  )}`;
  window.open(url, "_blank");
}

// Agregar evento al botón de confirmar

document
  .getElementById("btn_send_counterzz")
  .addEventListener("click", function () {
    const nombreInvitado =
      document.getElementById("nombreInvitado").textContent;
    const checkboxes = document.querySelectorAll(
      'input[name="acompanantes"]:checked'
    );

    if (nombreInvitado === "Invitado no encontrado.") {
      return alert("Invitado no registrado.");
    }

    if (checkboxes.length === 0) {
      return alert("Por favor, selecciona al menos un asistente.");
    }

    // Obtener los nombres de los acompañantes desde el label asociado
    const nombresAcompanantes = Array.from(checkboxes)
      .map((checkbox) => {
        const label = document.querySelector(`label[for="${checkbox.id}"]`);
        return label ? label.textContent.trim() : "";
      })
      .filter((nombre) => nombre !== ""); // Filtra nombres vacíos

    // Unir el nombre principal con los acompañantes
    const listaFinal = [...nombresAcompanantes].join(", ");

    // Llamar la función con los nombres unidos por comas
    enviarWhatsApp(nombreInvitado, listaFinal);
  });

// document
//   .getElementById("confirmarFomrulario")
//   .addEventListener("click", function () {
//     const nombre_form = document.getElementById("nombre_form").value;
//     const anecdota_form = document.getElementById("anecdota_form").value;
//     const deseos_form = document.getElementById("deseos_form").value;

//     if (!nombre_form) {
//       return alert("Ingresa tu nombre");
//     }

//     enviarWhatsAppForm(nombre_form, anecdota_form, deseos_form);
//   });

document.addEventListener("visibilitychange", function () {
  const audio = document.getElementById("audio-13375-1");
  console.log("🚀 ~ audio:", audio);
  if (document.visibilityState === "hidden") {
    audio.pause();
  } else if (document.visibilityState === "visible") {
    audio.play();
  }
});
