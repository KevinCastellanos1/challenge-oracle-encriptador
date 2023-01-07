const llavesEncriptar = {
  e: "enter",
  i: "imes",
  a: "ai",
  o: "ober",
  u: "ufat",
};

const llavesDesencriptar = {
  enter: "e",
  imes: "i",
  ai: "a",
  ober: "o",
  ufat: "u",
};

function encriptar(texto, llavesEncriptar) {
  let encriptado = "";
  for (let i = 0; i < texto.length; i++) {
    let caracter = texto[i];
    if (llavesEncriptar[caracter]) {
      encriptado += llavesEncriptar[caracter];
    } else {
      encriptado += caracter;
    }
  }
  return encriptado;
}

function desencriptar(textoEncriptado) {
    let desencriptado = "";
    while (textoEncriptado.length > 0) {
        let encontrado = false;
        for (let clave in llavesDesencriptar) {
            if (textoEncriptado.startsWith(clave)) {
                desencriptado += llavesDesencriptar[clave];
                textoEncriptado = textoEncriptado.slice(clave.length);
                encontrado = true;
                break;
            }
        }
        if (!encontrado) {
        desencriptado += textoEncriptado[0];
        textoEncriptado = textoEncriptado.slice(1);
        }
    }
    return desencriptado;
} 

const elementoOculto = document.getElementById("ocultar");
const textarea = document.getElementById("texto-ingresado");
const botonEncriptar = document.getElementById("btn-encriptar");
const botonDesencriptar = document.getElementById("btn-desencriptar");
const textoSalida = document.getElementById("texto-salida");
const BotonCopiar = document.getElementById("btn-copiar");




// ocultar boton copiar
BotonCopiar.style.display="none";
textoSalida.style.display="none";



//ocultar munheco y mensaje
textarea.addEventListener("click", () => {
  elementoOculto.style.display = "none";
  BotonCopiar.style.display = "block";
  textoSalida.style.display = "block";
  
});

//el texto ingresado se vea en een el p de salida
textarea.addEventListener('input', ()=> {
    textarea.value = textarea.value.toLowerCase();
    textoSalida.innerHTML = textarea.value;
});

//capturar area de textarea  e imprimir texto encriptado en 'texto-salida' al clickear
botonEncriptar.addEventListener("click", () => {
  const capturarArea = textarea.value;
  let textoEncriptado = encriptar(capturarArea, llavesEncriptar);
  textoSalida.innerHTML = textoEncriptado;
});

//capturar area de textarea e imprimir texto desencriptado en 'text-salida al clickear
botonDesencriptar.addEventListener("click", () => {
  const capturarArea = textarea.value;
  const textoDesencriptado = desencriptar(capturarArea, llavesDesencriptar);
  textoSalida.innerHTML = textoDesencriptado;

});


BotonCopiar.addEventListener("click", () =>{
    copiar(textoSalida);
});

const copiar = element => {
    if (window.getSelection && document.createRange) {    
      const seleccion = window.getSelection();
      const rango = document.createRange();
      rango.selectNodeContents(element);
      seleccion.removeAllRanges();
      seleccion.addRange(rango);
      document.execCommand("copy");
    } else if (document.selection && document.body.createTextRange) {      
      const rango = document.body.createTextRange();
      rango.moveToElementText(element);
      rango.select();
      document.execCommand("copy");
    }
  }

document.getElementById("texto-ingresado").addEventListener("focus", cambiar);
document.getElementById("texto-ingresado").addEventListener("blur", regresar);


function cambiar(evento) {
  let componente = evento.target;
  componente.style.background = "lightgray";
}

function regresar(evento) {
  evento.target.style.background = "";
  
}



  





