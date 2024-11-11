// Elementos HTML
const earth = document.getElementById("earth");
const direction = document.getElementById("direction");
const orbitEarth = document.querySelector(".orbit-earth");
const sun = document.querySelector(".sun");

// Configurações da órbita
let radius = 115; // Raio da órbita
const speed = 0.01; // Velocidade de rotação
let zoomLevel = 1; // Nível de zoom inicial

// Ângulo inicial
let angle = 0;

// Limites de zoom
const zoomInLimit = 1.5; // Zoom máximo
const zoomOutLimit = 0.5; // Zoom mínimo

// Botões de zoom
const zoomInButton = document.getElementById("plus");
const zoomOutButton = document.getElementById("out");

// Função para atualizar a posição da Terra e a rotação da direção
function updateOrbit() {
  // Calcula as novas coordenadas (x, y)
  const x = radius * Math.cos(angle);
  const y = radius * Math.sin(angle);

  // Define a posição da Terra
  earth.style.transform = `translate(${x}px, ${y}px) scale(${zoomLevel})`;

  // Rotaciona a direção para sempre apontar para fora do centro
  const rotationAngle = (angle * 180) / Math.PI; // Converte o ângulo para graus
  direction.style.transform = `rotate(${rotationAngle}deg)`;

  // Atualiza o ângulo
  angle += speed;

  // Chama a função novamente para continuar o movimento
  requestAnimationFrame(updateOrbit);
}

// Função para aumentar o zoom
function zoomIn() {
  if (zoomLevel < zoomInLimit) {
      zoomLevel += 0.25;
      adjustZoom();
      console.log(zoomLevel);

      zoomInButtonNotAllowed(zoomLevel, zoomInLimit);
  }
}

function zoomInButtonNotAllowed(zoomLevel, zoomInLimit){
    if(zoomLevel == zoomInLimit){
        zoomInButton.style.backgroundColor = "rgb(194, 198, 198)";
        zoomInButton.style.cursor = "not-allowed";

      }else{
        zoomInButton.style.backgroundColor = "rgb(20, 157, 176)";
        zoomInButton.style.cursor = "pointer";

        zoomOutButton.style.backgroundColor = "rgb(20, 157, 176)";
        zoomOutButton.style.cursor = "pointer";
      }
}
function zoomOutButtonNotAllowed(zoomLevel, zoomOutLimit){
    if(zoomLevel == zoomOutLimit){
        zoomOutButton.style.backgroundColor = "rgb(194, 198, 198)";
        zoomOutButton.style.cursor = "not-allowed";

      }else{
        zoomOutButton.style.backgroundColor = "rgb(20, 157, 176)";
        zoomOutButton.style.cursor = "pointer";
        
        zoomInButton.style.backgroundColor = "rgb(20, 157, 176)";
        zoomInButton.style.cursor = "pointer";
        
      }
}
// Função para diminuir o zoom
function zoomOut() {
  if (zoomLevel > zoomOutLimit) {
    zoomLevel -= 0.25;
    adjustZoom();
    console.log(zoomLevel);
    zoomOutButtonNotAllowed(zoomLevel, zoomOutLimit);
  }
}

// Função para ajustar o zoom dos elementos (Terra, Sol e Órbita)
function adjustZoom() {
  earth.style.transform = `scale(${zoomLevel})`;
  const orbitLevel = zoomLevel+0.25
  orbitEarth.style.transform = `scale(${orbitLevel})`;
  sun.style.transform = `scale(${zoomLevel})`;
}

// Eventos de clique para os botões de zoom
zoomInButton.addEventListener("click", zoomIn);
zoomOutButton.addEventListener("click", zoomOut);

// Inicia a animação da órbita
updateOrbit();
