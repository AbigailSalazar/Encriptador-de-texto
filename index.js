const resultadoMensajeError = document.querySelector(".resultado__error");
const parrafoResultado = document.querySelector(".resultado__texto");
const botonCopiar = document.querySelector(".resultado__copiar");
const resultadoContenido = document.querySelector(".resultado__contenido");
const mensajeError = document.querySelector(".form__error__mensaje");
const btnEncriptar = document.querySelector(".form__botones__encriptar");
const btnDesencriptar = document.querySelector(".form_botones__desencriptar");
const btnLimpiar = document.querySelector(".form__btn_limpiar");

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
    //Desabilitar botones si el texto esta vacio
    resultadoMensajeError.classList.remove("hide");
    resultadoContenido.classList.add("hide");
    btnLimpiar.classList.add("hide");
    btnEncriptar.setAttribute("disabled", "");
    btnDesencriptar.setAttribute("disabled", "");
    return;
  }
  btnLimpiar.classList.remove("hide");
  const match = textoAEncriptar.match(expCadenaInvalida);
  if (match != null) {
    //Si la cadena no es válida
    InputAEncriptar.value = convertirATextoValido(textoAEncriptar);
  }
  //Habilita los botones
  mensajeError.classList.remove("error");
  btnEncriptar.removeAttribute("disabled");
  btnDesencriptar.removeAttribute("disabled");
});

function limpiar() {
  //Limpia el contenido a encriptar
  InputAEncriptar.value = "";
  btnLimpiar.classList.add("hide");
  parrafoResultado.textContent = "";
  resultadoMensajeError.classList.remove("hide");
  resultadoContenido.classList.add("hide");
  btnEncriptar.setAttribute("disabled", "");
  btnDesencriptar.setAttribute("disabled", "");
}

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
  btnEncriptar.textContent = "Encriptado!";
  setTimeout(function () {
    btnEncriptar.textContent = "Encriptar";
  }, 500);
}

function desencriptar() {
  var textoAEncriptar = InputAEncriptar.value;
  for (clave in clavesEncriptacion) {
    textoAEncriptar = textoAEncriptar.replaceAll(
      clavesEncriptacion[clave],
      clave
    );
    btnDesencriptar.textContent = "Desencriptado!";
    setTimeout(function () {
      btnDesencriptar.textContent = "Desencriptar";
    }, 500);
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
      alert("Error al copiar el texto :0");
    }
  );
}

function convertirATextoValido(texto) {
  //Eliminar acentos
  texto = texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  //Eliminar characteres especiales
  const regex = /[^a-zA-Z0-9\s]/g;
  texto = texto.replaceAll(regex, "");

  //Reemplazar mayusculas por minusculas
  const regexMayus = /[A-Z]/g;
  if (texto.match(regexMayus)) {
    return texto.toLowerCase();
  }
  return texto;
}
