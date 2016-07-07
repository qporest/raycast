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