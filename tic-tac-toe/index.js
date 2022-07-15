// Inicialización de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let firstResult = null;
let secondResult = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 59;
let timerInicial = 59;
let tiempoRegresivoId = null;

let winAudio = new Audio('./sonidos/ganar.wav')
let loseAudio = new Audio('./sonidos/perder.wav')

// Apuntando a documento HTML
let mostrarMovimientos = document.getElementById("movimientos");
let mostrarAciertos = document.getElementById("aciertos");
let mostrarTiempo = document.getElementById("t-restante");

let numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

numbers.sort(() => Math.random() - 0.3);
console.log(numbers);

function contarTiempo() {
  tiempoRegresivoId = setInterval(() => {
    timer--;
    mostrarTiempo.innerHTML = `Tiempo restante: ${timer} segundos`;
    if (timer < 0) {
      clearInterval(tiempoRegresivoId);
      bloquearTarjetas();
      loseAudio.play();
    }
  }, 1000, timer);
}

function bloquearTarjetas() {
  for (let i = 0; i < 16; i++) {
    let tarjetaBloqueada = document.getElementById(i);
    tarjetaBloqueada.innerHTML = numbers[i];
    tarjetaBloqueada.disabled = true;
  }
}

function mostrar(id) {
  if (temporizador == false) {
    contarTiempo();
    temporizador = true;
  }

  tarjetasDestapadas++;
  console.log(tarjetasDestapadas);
  
  if (tarjetasDestapadas === 1) {
    // Mostrar primer número
    tarjeta1 = document.getElementById(id);
    firstResult = numbers[id];
    tarjeta1.innerHTML = firstResult;

    // Deshabilitar el primer botón
    tarjeta1.disabled = true;
  } else if (tarjetasDestapadas === 2) {
    // Mostrar segundo número
    tarjeta2 = document.getElementById(id);
    secondResult = numbers[id];
    tarjeta2.innerHTML = secondResult;

    // Deshabilitar el segundo botón
    tarjeta2.disabled = true;

    // Incrementar movimientos
    movimientos++;
    mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

    if (firstResult === secondResult) {
      //   Encerar contador de tarjetas destapadas
      tarjetasDestapadas = 0;

      // Aumentar aciertos
      aciertos++;
      mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
      winAudio.play();
    }

    if (aciertos === 8) { 
      winAudio.play();
      clearInterval(tiempoRegresivoId);
      mostrarAciertos.innerHTML = `Felicidades, has ganado!`;
      mostrarTiempo.innerHTML = `Gnacias, has ganado en ${
        timerInicial - timer
      } segundos`;
      mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
    }
  } else {
    // Mostrar momentaneamente valores y volver a tapar
    setTimeout(() => {
      tarjeta1.innerHTML = "";
      tarjeta2.innerHTML = "";
      tarjeta1.disabled = false;
      tarjeta2.disabled = false;
      tarjetasDestapadas = 0;
      loseAudio.play();
    }, 200);
  }
}
