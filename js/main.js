var
frame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame,
ctx,canvas, controls = new Controls(), circle = 2* Math.PI;

function Player(x, y, direction){
	this.x = x;
	this.y = y;
	this.direction = direction;
	this.speed = 0.5; //pixels per millisecond
	this.rotSpeed = Math.PI/100;//angle per millisecond
}

Player.prototype.update = function(dt){
	if(controls.buttons['left']){
		this.direction -= (this.rotSpeed * dt);
	}
	if(controls.buttons['right']){
		this.direction += (this.rotSpeed * dt);
	}
	if(this.direction > circle){
		this.direction = 0;
	}
	if(this.direction < 0){
		this.direction = circle;
	}
	if(controls.buttons['up']){
		//move character forward
	}
}

function Map(size){
	this.size = size;
	this.wallGrid = [];
	for(let i = 0; i<size; i++){
		let temp = [];
		for(let j=0; j<size; j++){
			temp.push(0);
		}
		this.wallGrid.push(temp);
	}
}

Map.prototype.isEmpty = function(x, y){
	if(x<0 || y<0 || x>=this.size || y>=this.size || this.wallGrid[x,y] != 1)
		return false;
	return true;
}

Map.prototype.randomize = function(){
	for(let i=1; i<this.size; i++){
		for(let j=1; j<this.size; j++){
			let wall = Math.random();
			this.wallGrid[i,j] = wall>0.3? 0 : 1;
		}
	}
}
function Controls(){
	this.buttons = {
		'up': false,
		'down': false,
		'left': false,
		'right': false
	};
	this.codes = {
		37: 'left',
		39: 'right',
		38: 'up',
		40: 'down'
	};

}

Controls.prototype.onKey = function(val, e){
	var state = this.codes[e.keyCode];
	if(!state) return;
	this.buttons[state] = val;
	e.preventDefault && e.preventDefault();
	e.stopPropagation && e.stopPropagation();
}

function init(){
	document.addEventListener('keydown', controls.onKey.bind(controls, true), false);
	document.addEventListener('keyup', controls.onKey.bind(controls, false), false);
	canvas = document.getElementsByTagName('canvas')[0];
	canvas.width = 500;
	canvas.height = 300;
	ctx = canvas.getContext('2d');
	GameStateStack.push(gameState);
	
	frame(mainLoop);
}

function mainLoop(dt){
	frame(mainLoop);
	var now = window.performance.now();
	GameStateStack.currentState().update(now - dt);
	GameStateStack.currentState().render();
}

init();