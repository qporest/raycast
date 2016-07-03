var gameState = {
	entities: [],
	init: function(){
		this.camera = new Camera();
		this.player = new Player(50,50,Math.PI);
		this.map = new Map(40);
		this.map.randomize();
	},
	update: function(dt){
		this.player.update(dt, this.map);
	},
	render: function(){
		this.camera.render(this.player, this.map);
	}
};