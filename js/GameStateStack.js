var GameStateStack = (function(){
	var stateStack = [];

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
		}
	}
})();