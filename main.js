//Constantes del juego
const COLUMNAS = 10;
const FILAS = 10;
const CANTIDAD_MINAS = 20;

//Variables con colores para los casilleros (NO se pudieron declarar como constantes ya que  la fn color sólo está definida para el setup y el draw)
var COLOR_CASILLERO_CON_MINA;
var COLOR_CASILLERO_SIN_MINA;
var COLOR_CASILLERO_MARCADO;

//Variables controladas al hacer click con el mouse: mousePressed()
var columnaPresionada;
var filaPresionada;
var hizoClick = false;

//Otras variables
var casillerosSinDescubrir;


function setup(){
  createCanvas(500, 500);   
  laMagiaDeLosProfes();

  COLOR_CASILLERO_CON_MINA = color("#FF0000");
  COLOR_CASILLERO_SIN_MINA = color("#1CC932");
  COLOR_CASILLERO_MARCADO = color("#278EF2");
  
  //ponerMinaCasillero(4, 5);
  
  casillerosSinDescubrir = COLUMNAS * FILAS
  ponerMinasTablero();
}


function draw() {
  if (hizoClick == true){
    if (mouseButton == LEFT){
      if(descubrirCasillero(columnaPresionada, filaPresionada)){
        pintarCasillero(columnaPresionada, filaPresionada, COLOR_CASILLERO_SIN_MINA);
      }
      if (tieneMinaCasillero(columnaPresionada, filaPresionada)){
        pintarCasillero(columnaPresionada, filaPresionada, COLOR_CASILLERO_CON_MINA);
        mostrarMinas();
        perder();
      }
      if (casillerosSinDescubrir == CANTIDAD_MINAS && tieneMinaCasillero == false){
        ganoElJuego();
      }
    }
    else{
      pintarCasillero(columnaPresionada, filaPresionada, COLOR_CASILLERO_MARCADO);
    }
    hizoClick = false;
  }
}

function ganoElJuego(){
  ganar();
  return true;
}

function ponerMinasTablero(){
  for (var contador = 0; contador < CANTIDAD_MINAS; contador++){
    numeroColumna =  floor(random(0, COLUMNAS));
    numeroFila = floor(random(0,  FILAS));
    console.log(numeroColumna+", "+numeroFila)
    if(!tieneMinaCasillero(numeroColumna, numeroFila)){
      ponerMinaCasillero(numeroColumna, numeroFila);
    }
    else{
      contador--;
    }
  }
} 

function mostrarMinas()
{
  for (var contC = 0; contC < COLUMNAS; contC++){
    for (var contF = 0; contF < FILAS; contF++){
      if (tieneMinaCasillero(contC, contF)){
        pintarCasillero(contC, contF, COLOR_CASILLERO_CON_MINA);
      }
    }
  }
}

function contarMinasAlrededor(columnaPresionada, filaPresionada)
{
  let cont = 0;
  for (let y = -1; y <= +1; y++){
    for (let x = -1; x <= +1; x++){
      columnaAdy = columnaPresionada + y;
      filaAdy = filaPresionada + x;
      if (columnaAdy >= 0 && columnaAdy < COLUMNAS && filaAdy >= 0 && filaAdy < FILAS) {
        if (tieneMinaCasillero(columnaAdy, filaAdy)) {
          cont ++;
        }
      }    
    } 
  }
  return cont;   
}