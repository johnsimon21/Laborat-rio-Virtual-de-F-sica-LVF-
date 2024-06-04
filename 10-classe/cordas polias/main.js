const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');

// Define as propriedades dos objetos
const brickWidth = 80;
const brickHeight = 40;
const brickColor = '#FF0000'; // Vermelho
const brickBorderRadius = 8; // Raio da borda
const pulleyRadius = 50;
const pulleyColor = '#8B4513'; // Castanho
const ropeColor = '#483D8B'; // Azul escuro para a corda

// Posições iniciais dos objetos
let brick1X = 100;
let brick1Y = canvas.height / 2;
let brick2X = 600; // Aumentei a distância para 600 pixels
let brick2Y = canvas.height / 2;

// Definir a largura da corda
const ropeWidth = 6;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Desenha a polia
  ctx.beginPath();
  ctx.fillStyle = pulleyColor;
  ctx.arc(canvas.width / 2, canvas.height / 2, pulleyRadius, 0, Math.PI * 2);
  ctx.fill();

  // Desenha o fio
  ctx.beginPath();
  ctx.strokeStyle = ropeColor;
  ctx.lineWidth = ropeWidth;
  ctx.moveTo(brick1X + brickWidth / 2, brick1Y);
  ctx.lineTo(canvas.width / 2, canvas.height / 2);
  ctx.moveTo(brick2X + brickWidth / 2, brick2Y);
  ctx.lineTo(canvas.width / 2, canvas.height / 2);
  ctx.stroke();

  // Desenha os tijolos
  ctx.fillStyle = brickColor;
  ctx.strokeStyle = '#000000'; // Cor da borda preta
  ctx.lineWidth = 2; // Largura da borda
  ctx.lineJoin = 'round'; // Estilo de união da linha (borda)
  ctx.beginPath();
  ctx.moveTo(brick1X + brickBorderRadius, brick1Y);
  ctx.lineTo(brick1X + brickWidth - brickBorderRadius, brick1Y);
  ctx.quadraticCurveTo(brick1X + brickWidth, brick1Y, brick1X + brickWidth, brick1Y + brickBorderRadius);
  ctx.lineTo(brick1X + brickWidth, brick1Y + brickHeight - brickBorderRadius);
  ctx.quadraticCurveTo(brick1X + brickWidth, brick1Y + brickHeight, brick1X + brickWidth - brickBorderRadius, brick1Y + brickHeight);
  ctx.lineTo(brick1X + brickBorderRadius, brick1Y + brickHeight);
  ctx.quadraticCurveTo(brick1X, brick1Y + brickHeight, brick1X, brick1Y + brickHeight - brickBorderRadius);
  ctx.lineTo(brick1X, brick1Y + brickBorderRadius);
  ctx.quadraticCurveTo(brick1X, brick1Y, brick1X + brickBorderRadius, brick1Y);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(brick2X + brickBorderRadius, brick2Y);
  ctx.lineTo(brick2X + brickWidth - brickBorderRadius, brick2Y);
  ctx.quadraticCurveTo(brick2X + brickWidth, brick2Y, brick2X + brickWidth, brick2Y + brickBorderRadius);
  ctx.lineTo(brick2X + brickWidth, brick2Y + brickHeight - brickBorderRadius);
  ctx.quadraticCurveTo(brick2X + brickWidth, brick2Y + brickHeight, brick2X + brickWidth - brickBorderRadius, brick2Y + brickHeight);
  ctx.lineTo(brick2X + brickBorderRadius, brick2Y + brickHeight);
  ctx.quadraticCurveTo(brick2X, brick2Y + brickHeight, brick2X, brick2Y + brickHeight - brickBorderRadius);
  ctx.lineTo(brick2X, brick2Y + brickBorderRadius);
  ctx.quadraticCurveTo(brick2X, brick2Y, brick2X + brickBorderRadius, brick2Y);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

function applyForce() {
  const force1 = parseFloat(document.getElementById('force1').value);
  const force2 = parseFloat(document.getElementById('force2').value);

  // Aplica a força aos tijolos
  brick1Y -= force1;
  brick2Y -= force2;

  // Limita os tijolos à área do canvas
  brick1Y = Math.max(brick1Y, 0);
  brick1Y = Math.min(brick1Y, canvas.height - brickHeight);
  brick2Y = Math.max(brick2Y, 0);
  brick2Y = Math.min(brick2Y, canvas.height - brickHeight);

  draw();
}

function startAnimation() {
  applyForce();
  requestAnimationFrame(startAnimation);
}

startButton.addEventListener('click', startAnimation);
draw(); // Desenha os tijolos inicialmente parados
