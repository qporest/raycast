var GameStateStack = (function(){
	var script = {
		'init': 'menu',
		'menu': 'level1',
		'level1': 'level2'
	};
	var stateStack = [];
	var currentName;
	return {
		currentState: function(){
			return stateStack[stateStack.length - 1];
		}, 
		pop: function(){
			return stateStack.pop()
		},
		push: function(state){
			state.init();
			stateStack.push(state);
		},
		next: function(){
			this.pop();
			this.push(scenes[script[currentName]]);
			currentName = script[currentName];
		},
		init: function(){
			currentName = 'init';
			this.next();
		}
	}
})();