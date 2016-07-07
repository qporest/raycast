window.scenes = {};

scenes['level1'] = {
	entities: [],
	init: function(){
		this.camera = new Camera();
		this.player = new Player(50,50,Math.PI);
		this.map = new Map(30);
		this.map.randomize();
	},
	update: function(dt){
		this.player.update(dt, this.map);
	},
	render: function(){
		this.camera.render(this.player, this.map);
	}
};

scenes['level2'] = {
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

scenes['menu'] = {
	buttons : [],
	particles: [],
	activeButton: 0,
	timeDelay: 0,
	init: function(){
		this.buttons.length = 0;
		this.particles.length = 0;
		this.activeButton = 0
		;
		this.buttons.push(new Button(canvas.width/2-150,100,sprites.buttons.start, sprites.buttons.startActive, function(){
			GameStateStack.next();
		},false));
		this.buttons.push(new Button(canvas.width/2-150,300,sprites.buttons.start, sprites.buttons.startActive, function(){
			console.log('Start pressed');
		}, true));
		for(var i=0; i<50; i++){
			this.particles.push(new Particle(Math.random()*canvas.width,Math.random()*canvas.height,sprites.particles.red))
		}
	},
	update: function(dt){
		this.timeDelay -= dt;
		if(this.timeDelay <= 0){
			if(controls.buttons['up']){
				this.buttons[this.activeButton].toggle();
				this.activeButton--;
				if(this.activeButton<0){
					this.activeButton = this.buttons.length-1;
				}
				this.buttons[this.activeButton].toggle();
				this.timeDelay = 200;
			}
			if (controls.buttons['down']){
				this.buttons[this.activeButton].toggle();
				this.activeButton++;
				if(this.activeButton>=this.buttons.length){
					this.activeButton = 0;
				}
				this.buttons[this.activeButton].toggle();
				this.timeDelay = 200;
			}
			if (controls.buttons['enter']){
				this.buttons[this.activeButton].onEvent();
				this.timeDelay = 200;
			}
		}
		for(let i of this.particles){
			i.update(dt);
		}
	},
	render: function(){
		ctx.clearRect(0,0,canvas.width, canvas.height);
		for(let i of this.buttons){
			i.render(ctx);
		}
		let destroyParticles = [];
		for(let i=0; i<this.particles.length; i++){
			if(this.particles[i].render(ctx) == 1){
				destroyParticles.push(i);
			}
		}
		for(let i of destroyParticles){
			this.particles.splice(i, 1);
		}
	}
};