Object.defineProperties(Array.prototype, {
  "first": {
    value: function(){
		return this[0];
	}
  },
  "last": {
    value: function(){
		return this[this.length - 1];
	}
  },
  "has":{
  	value: function(filter){
		var oo = this.findOne(filter);
		if (oo){
			return true
		} else {
			return false
		};
	}
  },
  "isArray":{
  	value:true
  },
  "findOne":{
  	value: function(filter){
		var oo = this.find(filter);
		return oo[0];
	}
  },
  "searchOne":{
  	value: function(filter){
  		var oo = this.search(filter);
  		return oo[0];
  	}
  },
  "getUnique":{
  	value: function(){
	   var u = {}, a = [];
	   for(var i = 0, l = this.length; i < l; ++i){
	      if(u.hasOwnProperty(this[i])) {
	         continue;
	      }
	      a.push(this[i]);
	      u[this[i]] = 1;
	   }
	   return a;
	} 
  },
  "remove":{
  	value: function(filter){
		var self = this;
		var oo = this.find(filter, true);
		var az = 0;
		oo.forEach(function(ob){
			var mz = ob-az;
			var qq = self.splice(mz, 1);
			az++;
		});
		return this;
	}
  },
  "hasOne":{
  	value: function(filter){
		var x = false;
		this.forEach(function(a, i){
			if (Array.isArray(filter)){
				filter.forEach(function(b){
					if (b == a){
						x = true;
					};
				});
			} else {
				if (a === filter){
					x = true;
				};
			};
		});
		return x;
	}
  },
  "hasAll":{
  	value: function(filter){
		var x = [];
		this.forEach(function(a, i){
			if (Array.isArray(filter)){
				filter.forEach(function(b){
					if (b == a){
						x.push(a);
					};
				});
			} else {
				if (a === filter){
					x.push(a);
				};
			};
		});
		if (x.length == filter.length){
			return true
		} else {
			return false;
		};
	}
  },
  "search":{
  	value: function(filter, ind){
		var oo = [];
		this.forEach(function(a, index){
			if (a && typeof a === "object"){
				var filterKeys = Object.keys(filter);
				filterKeys.forEach(function(key){
					var splitKey = key.split('.');
					// console.log(splitKey);
					var recursion = a;
					splitKey.forEach(function(keyPart){
						if (recursion && recursion[keyPart] !== (undefined || null)){
							recursion = recursion[keyPart];
							// console.log(recursion);
						};
					});
					// console.log("RECUR", recursion);
					// console.log("FILTER", filter[key]);
					if (recursion !== (undefined || null) && recursion.toString().toLowerCase().indexOf(filter[key].toString().toLowerCase()) > -1){
						if (ind){
							oo.push(index)
						} else {
							oo.push(a);
						};
					};
				});
			} else if (a){
				if (filter == a){
					if (ind){
						oo.push(index)
					} else {
						oo.push(a);
					};
				}
			};
		});
		return oo
	}
  },
  "find":{
  	value: function(filter, ind){
		var oo = [];
		this.forEach(function(a, index){
			if (a && typeof a === "object"){
				var filterKeys = Object.keys(filter);
				filterKeys.forEach(function(key){
					var splitKey = key.split('.');
					// console.log(splitKey);
					var recursion = a;
					splitKey.forEach(function(keyPart){
						if (recursion && recursion[keyPart] !== (undefined || null)){
							recursion = recursion[keyPart];
							// console.log(recursion);
						};
					});
					if (recursion !== (undefined || null) && recursion === filter[key]){
						if (ind){
							oo.push(index)
						} else {
							oo.push(a);
						};
					};
				});
			} else if (a){
				if (filter == a){
					if (ind){
						oo.push(index)
					} else {
						oo.push(a);
					};
				}
			};
		});
		return oo
	}
  }
});
String.prototype.toProperCase = function(opt_lowerCaseTheRest) {
  return (opt_lowerCaseTheRest ? this.toLowerCase() : this)
    .replace(/(^|[\s\xA0])[^\s\xA0]/g, function(s){ return s.toUpperCase(); });
};