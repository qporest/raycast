function Camera(){
	this.fov = 110/180*Math.PI;
	this.columnCount = 300;
	this.range = 400;
}

Camera.prototype.render = function(player, map){
	ctx.clearRect(0,0,canvas.width, canvas.height);
	this.drawColumns(player, map);
}

Camera.prototype.drawColumns = function(player, map){
	let pXGrid = player.x % 64, pYGrid = player.y%64; //just so it won't be recalculated all the time
	let distance, collided; //distance - to the wall, colided, is there a wall?
	let xDist, yDist; // for iterations
	for(let column = 0; column<this.columnCount; column++){
		collided = false;
		distance = 0;
		yDist = 1;
		xDist = 1;
		let angle = player.direction + column/this.columnCount*this.fov-this.fov/2;
		let xGrid = pXGrid, yGrid = pYGrid, origin = {x:player.x, y:player.y};
		distance = 0;
		let sin = Math.sin(angle);
		let cos = Math.cos(angle);
		while(!collided && distance<this.range &&(xDist != 0 && yDist != 0)){
			xDist = sin == 0? 0: Math.abs(((xGrid + 1*(sin>0))*64 - origin.x)/sin);
			yDist = cos == 0? 0: Math.abs(((yGrid + 1*(cos>0))*64 - origin.y)/cos);
			if(xDist<yDist && xDist != 0){
				distance += xDist;
				origin.x += xDist*sin;
				origin.y += xDist*cos;
				collided = !map.isEmpty(Math.ceil(origin.x)%64, Math.ceil(origin.y)%64);
			} else {
				distance += yDist;
				origin.x += yDist*sin;
				origin.y += yDist*cos;
				collided = !map.isEmpty(Math.ceil(origin.x)%64, Math.ceil(origin.y)%64);
			}
		}
		if(xDist == 0 && yDist ==0){
			return;
		}
		if(collided){
			ctx.beginPath();
			ctx.fillStyle = 'blue';
			let z = distance;
			let height = z==0 ? canvas.height : canvas.height*10/(distance*cos);
			ctx.rect(column, (canvas.height-height)/2, 1, height);
			ctx.fill();
		}
	}
}