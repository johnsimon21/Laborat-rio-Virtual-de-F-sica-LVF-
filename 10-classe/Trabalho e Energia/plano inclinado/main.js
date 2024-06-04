// Isso valida a informação inserida pelo usuário e inicia o movimento do bloco
function start()
{				
	if ((document.form1.length.value=="")||(document.form1.angle.value==""))
	{
		alert ("Valores não podem estar em branco");
		return false;
	}
	else if ((parseFloat(document.form2.Length.value)>=parseFloat(document.form1.length.value))||(parseFloat(document.form1.length.value)>2000))
	{
		alert ("length value must be in (Cuboid length (default 10),2000] ");
		return false;
	}
	else if ((parseFloat(document.form1.angle.value)<=0)||(parseFloat(document.form1.angle.value)>90))
	{
		alert ("Ângulo deve estar entre [0, 90]");
		return false;
	}
	else if ((parseFloat(document.form1.friction.value)<0))
	{
		alert ("Atrito deve ser um valor maior que 0 ");
		return false;
	}
	else if ((parseFloat(document.form2.dt.value)<=0)||(parseFloat(document.form2.dt.value)>100))
	{
		alert ("Ângulo deve ser um valor entre (0,100] ");
		return false;
	}
	else if ((parseFloat(document.form2.Length.value)<=0)||(parseFloat(document.form2.Length.value)>=parseFloat(document.form1.length.value)))
	{
		alert ("Comprimento deve estar entre (0, Comprimento do Plano) ");
		return false;
	}
	else if ((parseFloat(document.form2.Height.value)<0)||(parseFloat(document.form2.Height.value)>200))
	{
		alert ("Altura deve estar entre (0,200] ");
		return false;
	}
	else 
	{
		runAndDraw();
		return true;
	}
}

// Calcula e atualiza a posição do bloco após a próxima vez dt (selecionado pelo usuário, ou padrão 0,03s)
function nextPosition(dt)
{
	var frictionSign=null;
	this.number+=1;
	this.time=this.number*dt-0.0001;

	// O atrito funciona o oposto da reversão da velocidade
	if(this.vX>=0.0 && this.vY>=0.0) {
		frictionSign=1.0;
	}
	else if(this.vX<0.0 && this.vY<0.0) {
		frictionSign=-1.0;
	}

	// A aceleração devido ao atrito não deve exceder a aceleração do bloco
	if(this.frictionX>this.aX)
	this.frictionX=this.aX;
	if(this.frictionY>this.aY)
	this.frictionY=this.aY;

	// Atualização da posição e velocidade do bloco
	this.vX+=dt*(this.aX-frictionSign*this.frictionX);
	this.vY+=dt*(this.aY-frictionSign*this.frictionY);
	this.pX=this.startpX+((this.aX-frictionSign*this.frictionX)*this.time*this.time)/2.0;
	this.pY=this.startpY+((this.aY-frictionSign*this.frictionY)*this.time*this.time)/2.0;
}



// Uma flag que diz se o bloco está funcionando sem problemas
var cuboidSlidingDown= false;

// Isso ajuda a controlar o número de simulações em execução e desinstalação. O valor mínimo é 0 (atualmente não estamos exibindo a simulação), o valor máximo é 2 (estamos exibindo as simulações + solicitaremos uma nova simulação).
var numberOfTask=0;

var topX=0;
var topY=20;
function runAndDraw() {
	if(numberOfTask<=1)
	{
		++numberOfTask;
		const canvasElem = document.getElementById('canvas');
		const ctx = canvasElem.getContext('2d');
		
		ctx.clearRect(0, 0, canvasElem.width, canvasElem.height);
		var length=parseFloat(document.form1.length.value);
		var angle=parseFloat(document.form1.angle.value);
		var friction=parseFloat(document.form1.friction.value);
		var dt=parseFloat(document.form2.dt.value);
		var rectLength=parseFloat(document.form2.Length.value);
		var rectHeight=parseFloat(document.form2.Height.value);
		var g =parseFloat(document.form3.g.value);
		var sina=Math.sin(angle*Math.PI/180.0);
		var cosa=Math.cos(angle*Math.PI/180.0);
		topY=rectHeight*cosa+20;
		canvasElem.height=length*sina+rectHeight*cosa+20;
		canvasElem.width=length*cosa+rectHeight*sina+20;
		var vX=0.0;
		var vY=0.0;

		var bottomX=topX+Math.cos(angle*Math.PI/180.0)*length;
		var bottomY=topY+Math.sin(angle*Math.PI/180.0)*length;

		var cuboid = new Cuboid(30,rectLength,topX,topY,vX,vY,g*sina*cosa,g*sina*sina,g*cosa*friction*cosa,g*cosa*friction*sina);
		cuboidSlidingDown=true;

		if(numberOfTask==1)
		{
			calcAndDrawNextPosition(bottomX,bottomY,angle,length,cuboid,ctx,canvasElem,dt);
			var interval=setInterval(function() {
				calcAndDrawNextPosition(bottomX,bottomY,angle,length,cuboid,ctx,canvasElem,dt);
				if(cuboid.pX >=bottomX- Math.cos(angle*Math.PI/180.0)*rectLength  || cuboid.pY >= bottomY- Math.sin(angle*Math.PI/180.0)*rectLength)
				{
					numberOfTask--;
					cuboidSlidingDown=false;
					clearInterval(interval);
				}

				if(numberOfTask>1)
				{
					--numberOfTask;
					clearInterval(interval);
					
					--numberOfTask;
					runAndDraw();
				}
			}
		, dt*1000);
		}

		  
}

function calcAndDrawNextPosition(bottomX,bottomY,angle,length,cuboid,ctx,canvasElem,dt)
{
	var sina=Math.sin(angle*Math.PI/180.0);
	var cosa=Math.cos(angle*Math.PI/180.0);
	document.getElementById('parametersArticle').innerHTML="tempo: "+cuboid.time.toFixed(2)+" s"+"<br/>velocidade: "+Math.sqrt(cuboid.vX*cuboid.vX+cuboid.vY*cuboid.vY).toFixed(2)+" m/s"+"<br/>aceleração: "+Math.sqrt((cuboid.aX-cuboid.frictionX)*(cuboid.aX-cuboid.frictionX)+(cuboid.aY-cuboid.frictionY)*(cuboid.aY-cuboid.frictionY)).toFixed(2) + " m/s<sup>2</sup>"+"<br/>coeficiente máximo: "+((sina/cosa).toFixed(4));
	ctx.clearRect(0, 0, canvasElem.width, canvasElem.height);
	ctx.fillStyle="#3498db";
	ctx.beginPath();
	ctx.moveTo(topX,topY);
	ctx.lineTo(bottomX,bottomY);
	ctx.lineTo(topX,bottomY);
	ctx.fill();
	cuboid.drawCuboid(ctx,angle);
	cuboid.nextPosition(dt);
}

// Isso representa um bloco que viaja ao longo do mesmo caminho
function Cuboid (height, width, positionX, positionY, velocityX, velocityY, accelerationX, accelerationY, frictionX, frictionY) 
{
	this.height = height;
	this.width = width;
	this.pX = positionX;
	this.pY = positionY;
	this.startpX=positionX;
	this.startpY=positionY;
	this.vX = velocityX;
	this.vY = velocityY;
	this.aX = accelerationX;
	this.aY = accelerationY;
	this.frictionX = frictionX;
	this.frictionY = frictionY;
	this.time=0.0;
	this.number=0;
	
	this.updateParameters=updateParameters;
	this.nextPosition=nextPosition;
	this.drawCuboid=drawCuboid;
}

// Desenha o Bloco
function drawCuboid(ctx,angle)
{
	ctx.fillStyle="#e74c3c";
	ctx.beginPath();
	ctx.moveTo(this.pX,this.pY);

	var nextX=this.pX+Math.cos(angle*Math.PI/180.0)*this.width;
	var nextY=this.pY+Math.sin(angle*Math.PI/180.0)*this.width;
	ctx.lineTo(nextX, nextY);
	nextX=nextX+Math.sin(angle*Math.PI/180.0)*this.height;
	nextY=nextY-Math.cos(angle*Math.PI/180.0)*this.height;
	ctx.lineTo(nextX, nextY);
	nextX=nextX-Math.cos(angle*Math.PI/180.0)*this.width;
	nextY=nextY-Math.sin(angle*Math.PI/180.0)*this.width;
	ctx.lineTo(nextX, nextY);					
	ctx.lineTo(this.pX, this.pY);
	ctx.fill();
}

// É usado para configuração de parâmetro manual, usado em testes, à esquerda no caso de o aplicativo ser estendido
function updateParameters(positionX=this.pX, positionY=this.pY, velocityX=this.vX, velocityY=this.vY, accelerationX=this.aX, accelerationY=this.aY, height=this.height, width=this.width, frictionX=this.frictionX, frictionY=this.frictionY, time=this.time) 
{
	this.height = height;
	this.width = width;
	this.pX = positionX;
	this.pY = positionY;
	this.vX = velocityX;
	this.vY = velocityY;
	this.aX = accelerationX;
	this.aY = accelerationY;
	this.frictionX = frictionX;
	this.frictionY = frictionY;
}}