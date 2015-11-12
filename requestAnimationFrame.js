(function(ZQ) {
	var prefixs = ["webkit", "moz"];
	for(var i = 0, len = prefixs.length; 
			i < len && !window.requestAnimationFrame; i++) {
		var prefix = prefixs[i];
		window.requestAnimationFrame = window[prefix + "requestAnimationFrame"];
		window.cancelAnimationFrame = window[prefix + "CancelAnimationFrame"] ||
									  window[prefix + "CancelRequestAnimationFrame"];
	}
	if(!window.requestAnimationFrame) {
		var lastTime = 0;
		window.requestAnimationFrame = function(callback) {
			var currentTime = Date.now(),
				interval = Math.max(0, (1000 / 60) - (currentTime - lastTime)),
				timer = window.setTimeout(function() {
					callback(currentTime + interval);
				}, interval);
			lastTime = currentTime + interval;
			return timer;
		}
	}
	if(!window.cancelAnimationFrame) {
		window.cancelAnimationFrame = function(timer) {
			window.clearTimeout(timer);
		}
	}
	ZQ.requestAnimationFrame = window.requestAnimationFrame.bind(window);
	ZQ.cancelAnimationFrame = window.cancelAnimationFrame.bind(window);
}(window.ZQ || (ZQ = {})));
