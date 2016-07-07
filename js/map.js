
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
	if(x<0 || y<0 || x>=this.size || y>=this.size || this.wallGrid[y][x] == 1)
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