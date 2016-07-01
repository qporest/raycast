var gameState = {
	entities: [],
	init: function(){
		this.camera = new Camera();
		this.player = new Player(0,0,Math.PI/6);
		this.map = new Map(40);
		this.map.randomize();
	},
	update: function(dt){
		this.player.update(dt);
	},
	render: function(){
		this.camera.render(this.player, this.map);
	}
};