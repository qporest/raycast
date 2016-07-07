var
frame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame,
ctx,canvas, controls = new Controls(), circle = 2* Math.PI, lastUpdate;

function Controls(){
	this.buttons = {
		'up': false,
		'down': false,
		'left': false,
		'right': false,
		'enter': false
	};
	this.codes = {
		37: 'left',
		39: 'right',
		38: 'up',
		40: 'down',
		13: 'enter'
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
	canvas.width = 640;
	canvas.height = 480;
	ctx = canvas.getContext('2d');
	GameStateStack.init();
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

initSprites(init);