function Entity(){

}

Entity.prototype.render = function(ctx){
	console.log('rendering the entity');
}

Entity.prototype.update = function(dt){
	console.log('updating the entity');
}

function Button(x, y, spriteIdle, spriteActive, onEvent, state){
	Entity.call(this);
	this.x = x;
	this.y = y;
	this.width = spriteIdle.width;
	this.height = spriteIdle.height;
	this.idle = state;
	this.spriteIdle = spriteIdle;
	this.spriteActive = spriteActive;
	if(onEvent){
		this.onEvent = onEvent;
	}
}

Button.prototype = Object.create(Entity.prototype);

Button.prototype.render = function(ctx){
	if(this.idle) {
		this.spriteIdle.draw(ctx, this.x, this.y)
	} else {
		this.spriteActive.draw(ctx, this.x, this.y)
	}
}

Button.prototype.toggle = function(){
	this.idle = !this.idle;
}


function Particle(x, y, sprite){
	this.x = x;
	this.y = y;
	this.sprite = sprite;
	this.speed = Math.random()*0.1+0.02;
	this.setDirection(Math.random()*Math.PI*2);
}

Particle.prototype = Object.create(Entity.prototype);

Particle.prototype.setDirection = function(angle){
	this.sin = Math.sin(angle);
	this.cos = Math.cos(angle);
}

Particle.prototype.render = function(ctx){
	this.sprite.draw(ctx, this.x, this.y)
}

Particle.prototype.update = function(dt){
	if(Math.random() > 0.9){
		this.setDirection(Math.random()*Math.PI*2)
	}
	this.x += this.speed * this.sin * dt;
	this.y -= this.speed * this.cos * dt;
	if(this.x<0 || this.y<0){
		return 1;
	}
}