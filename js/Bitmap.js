function Bitmap(img, x, y, width, height){
	this.img = img;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}

Bitmap.prototype.draw = function(ctx, x, y, scale_w, scale_h, xo, yo, width, height){
	let destW = scale_w || this.width;
	let destH = scale_h || this.height;
	let sourceX = xo || this.x;
	let sourceY = yo || this.y;
	let sourceW = width || this.width;
	let sourceH = height || this.height;
	ctx.drawImage(this.img, sourceX, sourceY, sourceW, sourceH, x, y, destW, destH);
}

function initSprites(callback){
	window.sprites = {textures: {}, buttons: {}, particles: {}};
	var sources = [
		{
			src: 'resources/sky.png',
			init: function(img){
				sprites.sky = new Bitmap(img, 0, 0, 700, 300);
			}
		},
		{
			src: 'resources/wall.png',
			init: function(img){
				sprites.textures.wall = new Bitmap(img, 0, 0, 1200, 600);
			}
		},
		{
			src: 'resources/start.png',
			init: function(img){
				sprites.buttons.start = new Bitmap(img, 0, 0, 300, 100)
			}
		},
		{
			src: 'resources/particle.png',
			init: function(img){
				sprites.particles.red = new Bitmap(img, 0, 0, 5, 5)
			}
		},
		{
			src: 'resources/startActive.png',
			init: function(img){
				sprites.buttons.startActive = new Bitmap(img, 0, 0, 300, 100)
			}
		},
	];
	var loaded = 0;
	sources.forEach( function(source) {
		let img = new Image();
		img.src = source.src;
		img.onload = function(){
			source.init(this);
			loaded++;
			if(loaded==sources.length) callback();
		}
	});
}