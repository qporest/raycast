function Camera(){
	this.fov = 70/180*Math.PI;
	this.columnCount = 300;
	this.range = 3000;
}

Camera.prototype.render = function(player, map){
	ctx.clearRect(0,0,canvas.width, canvas.height);
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
		while(!collided && distance<this.range){
			xDist = (xGrid + 1*(sin>0))*64 - origin.x;
			yDist = (yGrid + 1*(cos<0))*64 - origin.y;
			if((Math.abs(xDist)<Math.abs(yDist) && xDist!=0) || yDist == 0){
				distance += xDist/sin;
				origin.x += xDist;
				origin.y -= xDist*cos/sin;
				collided = sin>0
					? !map.isEmpty(xGrid+1, yGrid)
					: !map.isEmpty(xGrid-1, yGrid);
				xGrid = sin>0 ? xGrid + 1 : xGrid;
			} else {
				distance += Math.abs(yDist/cos);
				origin.x += Math.abs(yDist/cos)*sin;
				origin.y += yDist;
				collided = cos>0
					? !map.isEmpty(xGrid, yGrid-1)
					: !map.isEmpty(xGrid, yGrid+1);
				yGrid = cos<0 ? yGrid: yGrid + 1;
			}
			
		}
		if(collided){
			ctx.beginPath();
			ctx.fillStyle = 'blue';
			let z = distance * Math.cos(camDir);
			let height = z==0 ? canvas.height : 800/z;
			ctx.rect(column, (canvas.height-height)/2, 1, height);
			ctx.fill();
		}
	}
}