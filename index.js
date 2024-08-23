const resultadoMensajeError = document.querySelector(".resultado__error");
const parrafoResultado = document.querySelector(".resultado__texto");
const botonCopiar = document.querySelector(".resultado__copiar");
const resultadoContenido = document.querySelector(".resultado__contenido");
const mensajeError = document.querySelector(".form__error__mensaje");
const btnEncriptar = document.querySelector(".form__botones__encriptar");
const btnDesencriptar = document.querySelector(".form_botones__desencriptar");

var InputAEncriptar = document.querySelector(".form__input");

const clavesEncriptacion = {
  e: "enter",
  i: "imes",
  a: "ai",
  o: "ober",
  u: "ufat",
};

//Realiza validaciones
InputAEncriptar.addEventListener("input", (e) => {
  var textoAEncriptar = InputAEncriptar.value;
  const expCadenaInvalida = /[^a-z\s]/g;

  if (!textoAEncriptar || textoAEncriptar.trim() === "") {
    resultadoMensajeError.classList.remove("hide");
    resultadoContenido.classList.add("hide");
    btnEncriptar.setAttribute("disabled", "");
    btnDesencriptar.setAttribute("disabled", "");
    return;
  }

  const match = textoAEncriptar.match(expCadenaInvalida);
  if (match != null) {
    mensajeError.classList.add("error");
    btnEncriptar.setAttribute("disabled", "");
    btnDesencriptar.setAttribute("disabled", "");
    return;
  } else {
    mensajeError.classList.remove("error");
    btnEncriptar.removeAttribute("disabled");
    btnDesencriptar.removeAttribute("disabled");
  }
});

function encriptar() {
  var textoAEncriptar = InputAEncriptar.value;

  for (clave in clavesEncriptacion) {
    textoAEncriptar = textoAEncriptar.replaceAll(
      clave,
      clavesEncriptacion[clave]
    );
  }

  resultadoMensajeError.classList.add("hide");
  resultadoContenido.classList.remove("hide");
  parrafoResultado.textContent = textoAEncriptar;
}

function desencriptar() {
  var textoAEncriptar = InputAEncriptar.value;
  for (clave in clavesEncriptacion) {
    textoAEncriptar = textoAEncriptar.replaceAll(
      clavesEncriptacion[clave],
      clave
    );
  }

  resultadoMensajeError.classList.add("hide");
  resultadoContenido.classList.remove("hide");
  parrafoResultado.textContent = textoAEncriptar;
}

function copiar() {
  if (navigator.clipboard) {
    updateClipboard(parrafoResultado.textContent);
  } else {
    alert("Tu navegador no soporta la API del portapapeles.");
  }
}

function updateClipboard(newClip) {
  navigator.clipboard.writeText(newClip).then(
    () => {
      console.log("Texto copiado correctamente");
      botonCopiar.textContent = "Copiado!";
      setTimeout(() => {
        botonCopiar.textContent = "Copiar";
      }, 500);
    },
    () => {
      console.error("Error al copiar al portapapeles: ", err);
    }
  );
}
