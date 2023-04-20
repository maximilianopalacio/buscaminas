//Constantes del juego
const COLUMNAS = 10;
const FILAS = 10;
const CANTIDAD_MINAS = 10;

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


function setup()
{
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
  if (hizoClick == true)
  {
    if (mouseButton == LEFT)
    {
      if (tieneMinaCasillero(columnaPresionada, filaPresionada)){
        pintarCasillero(columnaPresionada, filaPresionada, COLOR_CASILLERO_CON_MINA);
        mostrarMinas();
        perder();
      }
      if(descubrirCasillero(columnaPresionada, filaPresionada))
      {
        pintarCasillero(columnaPresionada, filaPresionada, COLOR_CASILLERO_SIN_MINA);
      }
      if (casillerosSinDescubrir == CANTIDAD_MINAS){
        ganoElJuego();
      }
    }
    else
    {
      pintarCasillero(columnaPresionada, filaPresionada, COLOR_CASILLERO_MARCADO);
    }
    hizoClick = false;
  }
  
}
function ganoElJuego()
{
  ganar();
  return true;
}

function ponerMinasTablero()
{
  for (var contador = 0; contador < CANTIDAD_MINAS; contador++){
    numeroColumna =  floor(random(0, COLUMNAS));
    numeroFila = floor(random(0,  FILAS));
    console.log(numeroColumna+", "+numeroFila)
    if(!tieneMinaCasillero(numeroColumna, numeroFila))
    {
      ponerMinaCasillero(numeroColumna, numeroFila);
    }
    else
    {
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


function contarMinasAlrededor()
{
  if(tieneMinaCasillero(FILAS-1,COLUMNAS))
  {
    contador1++;
  }
  if(tieneMinaCasillero(FILAS,COLUMNAS-1))
  {
    contador1++;
  }
  if(tieneMinaCasillero(FILAS+1,COLUMNAS))
  {
    contador1++;
  }
  if(tieneMinaCasillero(FILAS,COLUMNAS+1))
  {
    contador1++;
  }
  return 9;
}