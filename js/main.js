var
frame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame,
ctx,canvas, controls = new Controls(), circle = 2* Math.PI, lastUpdate;

function Player(x, y, direction){
	this.x = x;
	this.y = y;
	this.direction = direction;
	this.speed = 0.05; //pixels per millisecond
	this.rotSpeed = Math.PI/1000;//angle per millisecond
}

Player.prototype.update = function(dt, map){
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
		let distance = this.speed * dt;
		let newX = this.x + distance * Math.sin(this.direction);
		let newY = this.y - distance * Math.cos(this.direction);
		if(map.isEmpty( Math.floor(newX / 64) , Math.floor(newY / 64) )){
			this.x = newX;
			this.y = newY;
		}
	}
}

function Map(size){
	this.size = size;
	this.wallGrid = new Array();
	for(let i = 0; i<size; i++){
		this.wallGrid.push(new Array(size));
		for(let j=0; j<size; j++){
			this.wallGrid[i][j] = 0;
		}
	}
}

Map.prototype.isEmpty = function(x, y){
	if(x<0 || y<0 || x>=this.size || y>=this.size || this.wallGrid[x][y] == 1)
		return false;
	return true;
}

Map.prototype.randomize = function(){
	for(let i=1; i<this.size; i++){
		for(let j=0; j<this.size; j++){
			let wall = Math.random();
			this.wallGrid[i][j] = wall>0.3? 0 : 1;
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
	canvas.width = 300;
	canvas.height = 300;
	ctx = canvas.getContext('2d');
	GameStateStack.push(gameState);
	lastUpdate = new Date().getTime();
	frame(mainLoop);
}

function mainLoop(){
	var now = new Date().getTime();
	GameStateStack.currentState().update(now - lastUpdate);
	GameStateStack.currentState().render();
	lastUpdate = now;
	frame(mainLoop);
}

init();