(function(window, undefined) {
	ZQ.Tools = ZQ.Tools || {};

	var ajax = function () {
		return ajax.prototype.init(arguments);
	}
	ajax.prototype = {
		constructor: ajax,
		xhr: null,
		accepts: {
			"*": "*/*",
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},
		init: function (options) {
			this.xhrFactory();
			if(options.type == "get") {
				this.get(options);
			}else if(options.type == "post") {
				this.post(options);
			}
		},
		xhrFactory: function () {
			var xhr = null;
			try {
				if(window.XMLHttpRequest) {
					xhr = new XMLHttpRequest();
				}else if(window.ActiveXObject){
					xhr = new ActiveXObject("Msxml2.Xmlhttp");
				}
			}catch (err) {
				xhr = new ActiveXObject("Microsoft.Xmlhttp");
			}
			this.xhr = xhr;
			return xhr;
		},
		setRequestHeader: function(options) {
			this.xhr.setRequestHeader(
				"accept",
				options["dataType"] ?
					this.accepts[options["dataType"]] + (this.accepts[options["dataType"]] !== "*" ? ", "+ this.accepts["*"] +";q=0.01" : "")
					: this.accepts["*"]
			);
			this.xhr.setRequestHeader("content-type", options["contentType"] ? options["contentType"] : "x-www-form-urlencoded");
		},
		overrideMimeType: function () {
			if(this.xhr.overrideMimeType) {
				xhr.overrideMimeType("text/plain; charset=utf-8");
			}
		}
		readystate: function (timeout, callback) {
			var that = this;
			this.xhr.onreadystatechange = function () {
				if(this.readyState == 4 && this.status == 200) {
					callback(this.responseText);
				}else {
					setTimeout(function () {
						that.xhr.abort();
					}, !timeout ? 15000 : timeout);
				}
			}
		},
		params: function (data) {
			if(!data) return null;

			if(Object.prototype.toString.call(data) == "[object Object]") {
				var arr = [];
				for(var i in data) {
					arr.push(i + "=" + data[i]);
				}
				return arr.join("&");
			}

			return data;
		},
		get: function (options) {
			this.readystate(options.timeout, options.callback);
			var newUrl = options.url + "?" + this.params(options.data) + "&_=" + Date.now();
			this.overrideMimeType();
			this.xhr.open("get", newUrl, options.async);
			this.xhr.send(null);
		},
		post: function (options) {
			this.readystate(options.timeout, options.callback);
			this.xhr.open("post", options.url + "?_=" + Date.now(), options.async);
			this.overrideMimeType();
			this.setRequestHeader(options);
			this.xhr.send(this.params(options.data));
		}
	}

	ZQ.Tools.ajax = ajax;
})(window);
