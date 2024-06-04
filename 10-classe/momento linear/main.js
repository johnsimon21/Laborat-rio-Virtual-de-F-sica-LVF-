const canvas = document.querySelector("canvas");
canvas.width = 800;
canvas.height = 400;
const c = canvas.getContext("2d");

const startButton = document.getElementById("startButton");
startButton.addEventListener("click", toggleAnimation);

const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", resetAnimation);

// Define os objetos
let circle = {
  x: 100,
  y: canvas.height / 2,
  radius: 60,
  mass: 5,
  velX: 10,
  velY: 9,
  color: "#2121ce"
};

let anotherCircle = {
  x: 300,
  y: canvas.height / 2,
  radius: 50,
  mass: 3,
  velX: 8,
  velY: 8,
  color: "red"
};

let isPaused = true;

function toggleAnimation() {
  isPaused = !isPaused;
  if (!isPaused) {
    animate();
    startButton.textContent = "Pausar";
  } else {
    startButton.textContent = "Iniciar";
  }
}

function resetAnimation() {
  circle = {
    x: 100,
    y: canvas.height / 2,
    radius: 60,
    mass: 5,
    velX: 10,
    velY: 9,
    color: "#2121ce"
  };
  anotherCircle = {
    x: 300,
    y: canvas.height / 2,
    radius: 50,
    mass: 3,
    velX: 8,
    velY: 8,
    color: "red"
  };
  draw();
}

function animate() {
  if (isPaused) {
    return;
  }
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  // Move o Objeto
  circle.x += circle.velX;
  circle.y += circle.velY;

  anotherCircle.x += anotherCircle.velX;
  anotherCircle.y += anotherCircle.velY;

  // Verifica as bordas do Objeto
  checkBoundary(circle);
  checkBoundary(anotherCircle);

  // Verifica a colisão entre os Objetos
  detectCollision(circle, anotherCircle);

  // Desenha o primeiro Objeto
  drawCircle(circle);

  // Desenha o outro Objeto
  drawCircle(anotherCircle);

  // Atualiza as informações sobre os Objetos
  updateInfo(circle, anotherCircle);

  // Calcula e exibe o momento linear dos Objetos
  updateMomentum(circle, anotherCircle);
}

function drawCircle(obj) {
  c.beginPath();
  c.strokeStyle = obj.color;
  c.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2);
  c.fillStyle = obj.color;
  c.stroke();
  c.fill();
}

function checkBoundary(obj) {
  if (obj.x + obj.radius > canvas.width || obj.x - obj.radius < 0) {
    obj.velX = -obj.velX;
  }
  if (obj.y + obj.radius > canvas.height || obj.y - obj.radius < 0) {
    obj.velY = -obj.velY;
  }
}

function detectCollision(circle1, circle2) {
  let dx = circle1.x - circle2.x;
  let dy = circle1.y - circle2.y;
  let distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < circle1.radius + circle2.radius) {
    // Colisão detectada
    // Calcula a direção da colisão
    let angle = Math.atan2(dy, dx);
    let sin = Math.sin(angle);
    let cos = Math.cos(angle);

    // Calcula as velocidades pós-colisão
    let vx1 = (circle1.velX * cos + circle1.velY * sin);
    let vy1 = (circle1.velY * cos - circle1.velX * sin);
    let vx2 = (circle2.velX * cos + circle2.velY * sin);
    let vy2 = (circle2.velY * cos - circle2.velX * sin);

    // Troca as velocidades para dispersar os Objectos
    let finalVelX1 = vx2 * cos - vy1 * sin;
    let finalVelY1 = vy1 * cos + vx2 * sin;
    let finalVelX2 = vx1 * cos - vy2 * sin;
    let finalVelY2 = vy2 * cos + vx1 * sin;

    // Atualiza as velocidades dos Objectos
    circle1.velX = finalVelX1;
    circle1.velY = finalVelY1;
    circle2.velX = finalVelX2;
    circle2.velY = finalVelY2;
  }
}

function updateInfo(circle1, circle2) {
  const circle1Info = document.getElementById("circle1Info");
  circle1Info.textContent = `Objecto Vermelho: Posição (X: ${circle1.x.toFixed(2)}, Y: ${circle1.y.toFixed(2)}), Velocidade (X: ${circle1.velX.toFixed(2)} m/s, Y: ${circle1.velY.toFixed(2)}) m/s`;

  const circle2Info = document.getElementById("circle2Info");
  circle2Info.textContent = `Objecto Azul: Posição (X: ${circle2.x.toFixed(2)}, Y: ${circle2.y.toFixed(2)}), Velocidade (X: ${circle2.velX.toFixed(2)} m/s, Y: ${circle2.velY.toFixed(2)}) m/s`;
}

function updateMomentum(circle1, circle2) {
  const mass1 = parseFloat(document.getElementById("mass1").value);
  const mass2 = parseFloat(document.getElementById("mass2").value);

  const momentum1 = mass1 * Math.sqrt(circle1.velX * circle1.velX + circle1.velY * circle1.velY);
  const momentum2 = mass2 * Math.sqrt(circle2.velX * circle2.velX + circle2.velY * circle2.velY);

  const atrito = document.getElementById("atrito");
  const momentum = document.getElementById("momentum");
  momentum.textContent = `Momento Linear do Objecto 1: ${momentum1.toFixed(2)}  kg x m/s, Momento Linear do Objecto Azul: ${momentum2.toFixed(2)} kg x m/s`;
  atrito.textContent = `Força de atrito: 0 N`;
}
