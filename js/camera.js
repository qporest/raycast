function Camera(){
	this.fov = 103/180*Math.PI;
	this.columnCount = canvas.width;
	this.range = 3000;
}

Camera.prototype.render = function(player, map){
	ctx.clearRect(0,0,canvas.width, canvas.height);
	this.drawSkies(player, ctx);
	this.drawFloor(ctx);
	this.drawColumns(player, map);
}

Camera.prototype.drawColumns = function(player, map){
	let pXGrid = Math.floor(player.x / 64), pYGrid = Math.floor(player.y / 64); //just so it won't be recalculated all the time
	let distance, collided; //distance - to the wall, colided, is there a wall?
	for(let column = 0; column<this.columnCount; column++){
		collided = false;
		distance = 0;
		let xDist, yDist;
		let camDir = (column/this.columnCount-0.5)*this.fov;
		let angle = camDir + player.direction;
		if(angle<0){
			angle = circle + angle;
		}
		if(angle>circle){
			angle = angle - circle;
		}
		let xGrid = pXGrid, yGrid = pYGrid, origin = {x:player.x, y:player.y};
		distance = 0;
		let sin = Math.sin(angle);
		let cos = Math.cos(angle);
		let loops = 0;
		let offset = 0;
		while(!collided && distance<this.range && loops < 50){
			xDist = Math.abs( ((xGrid + 1*(sin>=0))*64 - origin.x)/sin );
			yDist = Math.abs( ((yGrid + 1*(cos<=0))*64 - origin.y)/cos );
			if(Math.abs(xDist)<=Math.abs(yDist)){
				distance += xDist;
				origin.x += xDist*sin;
				origin.y -= xDist*cos;
				collided = sin>0
					? !map.isEmpty(xGrid+1, yGrid)
					: !map.isEmpty(xGrid-1, yGrid);
				xGrid = sin>0 ? xGrid + 1 : xGrid - 1;
				offset = sin>0
					? (origin.y - Math.floor(origin.y / 64)*64)/64
					: (Math.floor(origin.y / 64)*64 +64 - origin.y)/64;
			} else {
				distance += yDist;
				origin.x += yDist*sin;
				origin.y += yDist*cos;
				collided = cos>0
					? !map.isEmpty(xGrid, yGrid-1)
					: !map.isEmpty(xGrid, yGrid+1);
				yGrid = cos>0 ? yGrid - 1 : yGrid + 1;
				offset = cos>0
					? (origin.x - Math.floor(origin.x / 64)*64)/64
					: (Math.floor(origin.x / 64)*64 +64 - origin.x)/64;
			}
			loops++;
		}
		if(collided){
			distance /= 4;
			ctx.beginPath();
			ctx.fillStyle = 'blue';
			let z = distance * Math.cos(camDir);
			if(z<0.5)z=0.5;
			let height = 480/z;
			// ctx.rect(column, (canvas.height-height)/2, 1, height);
			// ctx.fill();
			let x = Math.floor(sprites.textures.wall.width * offset);
			sprites.textures.wall.draw(ctx, column, (canvas.height-height)/2, 1, height, x, 0, 1);
		}
	}
}

Camera.prototype.drawSkies = function(player, ctx){
	let x = -sprites.sky.width*player.direction/circle;
	sprites.sky.draw(ctx, x, 0, undefined, canvas.height/2);
	if(x+sprites.sky.width < this.columnCount){
		sprites.sky.draw(ctx, x+sprites.sky.width, 0, undefined, canvas.height/2);
	}
}
Camera.prototype.drawFloor = function(ctx){
	ctx.fillStyle = 'grey';
	ctx.beginPath();
	ctx.rect(0, canvas.height/2, this.columnCount, canvas.height/2);
	ctx.fill();
	ctx.closePath();
}