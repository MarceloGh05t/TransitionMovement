// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.behaviors, "cr.behaviors not created");

/////////////////////////////////////
// Behavior class
// *** CHANGE THE BEHAVIOR ID HERE *** - must match the "id" property in edittime.js
//           vvvvvvvvvv
cr.behaviors.TransitionMovement = function(runtime)
{
	this.runtime = runtime;
};

(function ()
{
	// *** CHANGE THE BEHAVIOR ID HERE *** - must match the "id" property in edittime.js
	//                               vvvvvvvvvv
	var behaviorProto = cr.behaviors.TransitionMovement.prototype;
		
	/////////////////////////////////////
	// Behavior type class
	behaviorProto.Type = function(behavior, objtype)
	{
		this.behavior = behavior;
		this.objtype = objtype;
		this.runtime = behavior.runtime;
	};
	
	var behtypeProto = behaviorProto.Type.prototype;

	behtypeProto.onCreate = function()
	{
	};

	/////////////////////////////////////
	// Behavior instance class
	behaviorProto.Instance = function(type, inst)
	{
		this.type = type;
		this.behavior = type.behavior;
		this.inst = inst;				// associated object instance to modify
		this.runtime = type.runtime;
		
	};
	
	var behinstProto = behaviorProto.Instance.prototype;

	behinstProto.onCreate = function()
	{
		// Load properties
		this.enabled = (this.properties[0] !== 0) // o valor de retorno é 0 ou 1
		this.active = "" //para passar o valor do enabled como true ou false na funcao tick
		this.acceleration = this.properties[4]
		this.moving = false
		this.destiny = false
		this.type_movement = ""
		
		// object is sealed after this call, so make sure any properties you'll ever need are created, e.g.
		// this.myValue = 0;
	};
	
	behinstProto.onDestroy = function ()
	{
		// called when associated object is being destroyed
		// note runtime may keep the object and behavior alive after this call for recycling;
		// release, recycle or reset any references here as necessary
	};
	
	// called when saving the full state of the game
	behinstProto.saveToJSON = function ()
	{
		// return a Javascript object containing information about your behavior's state
		// note you MUST use double-quote syntax (e.g. "property": value) to prevent
		// Closure Compiler renaming and breaking the save format
		return {
			// e.g.
			//"myValue": this.myValue
		};
	};
	
	// called when loading the full state of the game
	behinstProto.loadFromJSON = function (o)
	{
		// load from the state previously saved by saveToJSON
		// 'o' provides the same object that you saved, e.g.
		// this.myValue = o["myValue"];
		// note you MUST use double-quote syntax (e.g. o["property"]) to prevent
		// Closure Compiler renaming and breaking the save format
	};

	behinstProto.tick = function ()
	{
		var dt = this.runtime.getDt(this.inst);
		
		// called every tick for you to update this.inst as necessary
		// dt is the amount of time passed since the last tick, in case it's a movement
		if(this.properties[0] !== 0){//o desable vai retornar zero e o enable 1
		this.active = true
		
			if(this.properties[3] === 0){ //se for um movimento horizontal
				this.type_movement = "Horizontal"
				
				if (this.properties[1] < this.inst.x && this.acceleration != 0){ // se o ponto final for menor que o x (o ponto final estiver a esquerda do do objeto)
					this.inst.x -= this.acceleration * dt // coloquei pelo dt para atulizar pelo intervalo de tempo entre um tick como o dt é uma fracao tive que colocar mais casas na aceleração
					this.inst.set_bbox_changed()
					this.moving = true
					this.destiny = false
			
					
						if (this.properties[1] >= this.inst.x){// se o movimento, quando passar o ponto final ou for chegar no ponto 
							
							this.inst.x = this.properties[1] //vai setar exatamente para o ponto final, se tiver passado dele
							this.inst.set_bbox_changed() // atualizar a renderização
							this.moving = false
							this.destiny = true
							
							
						}
				}
				if (this.properties[1] > this.inst.x && this.acceleration != 0){ // se o ponto final for maior que o x (o ponto final estiver a direita do do objeto)
				
				this.inst.x += this.acceleration * dt 
				this.inst.set_bbox_changed()
				this.moving = true
				this.destiny = false
			
				
					if (this.properties[1] <= this.inst.x){// se o movimento, quando passar o ponto final ou for chegar no ponto 
							
							this.inst.x = this.properties[1] //vai setar exatamente para o ponto final, se tiver passado dele
							this.inst.set_bbox_changed() // atualizar a renderização
							this.moving = false
							this.destiny = true
						}
				}
			}
			if(this.properties[3] === 1){ //se for um movimento vertical
			
				this.type_movement = "Vertical"
				
				if (this.properties[2] < this.inst.y && this.acceleration != 0){ // se o ponto final for menor que o y (o ponto final estiver a acima do do objeto)
				
				this.inst.y -= this.acceleration * dt  
				this.inst.set_bbox_changed()
				this.moving = true
				this.destiny = false
				
					if (this.properties[2] >= this.inst.y){// se o movimento, quando passar o ponto final ou for chegar no ponto 
						
						this.inst.y  = this.properties[2] //vai setar exatamente para o ponto final, se tiver passado dele
						this.inst.set_bbox_changed() // atualizar a renderização
						this.moving = false
						this.destiny = true
					}
				}
				if (this.properties[2] > this.inst.y && this.acceleration != 0){// se o ponto final for maior que o y (o ponto final estiver a abaixo do do objeto)
				
				this.inst.y += this.acceleration * dt  
				this.inst.set_bbox_changed()
				this.moving = true
				this.destiny = false
				
					if (this.properties[2] <= this.inst.y){// se o movimento, quando passar o ponto final ou for chegar no ponto 
					
						this.inst.y  = this.properties[2] //vai setar exatamente para o ponto final, se tiver passado dele
						this.inst.set_bbox_changed() // atualizar a renderização
						this.moving = false
						this.destiny = true
					}
				}
	
			
			}
		}else{
		this.active = false
		}
	};
	
	// The comments around these functions ensure they are removed when exporting, since the
	// debugger code is no longer relevant after publishing.
	/**BEGIN-PREVIEWONLY**/
	behinstProto.getDebuggerValues = function (propsections)
	{
		// Append to propsections any debugger sections you want to appear.
		// Each section is an object with two members: "title" and "properties".
		// "properties" is an array of individual debugger properties to display
		// with their name and value, and some other optional settings.
		propsections.push({
			"title": this.type.name,
			"properties": [
				// Each property entry can use the following values:
				// "name" (required): name of the property (must be unique within this section)
				// "value" (required): a boolean, number or string for the value
				// "html" (optional, default false): set to true to interpret the name and value
				//									 as HTML strings rather than simple plain text
				// "readonly" (optional, default false): set to true to disable editing the property
				{"name": "Enable", "value": this.active},
				{"name": "Moving", "value": this.moving},
				{"name": "Type Moving", "value": this.type_movement},
				{"name": "In destiny", "value": this.destiny},
				{"name": "End Point X", "value": this.properties[1]},
				{"name": "End Point Y", "value": this.properties[2]},
				{"name": "Acceleration", "value": this.properties[4]}
				
			]
		});
	};
	
	behinstProto.onDebugValueEdited = function (header, name, value)
	{
		// Called when a non-readonly property has been edited in the debugger. Usually you only
		// will need 'name' (the property name) and 'value', but you can also use 'header' (the
		// header title for the section) to distinguish properties with the same name.
		
		//if (name === "My property")
			//this.myProperty = value;
	};
	/**END-PREVIEWONLY**/

	//////////////////////////////////////
	// Conditions
	function Cnds() {};

	// the example condition
	Cnds.prototype.IsMoving = function ()
	{
		
		if(this.moving){
		return true
		}
	};
	
	Cnds.prototype.in_destiny = function ()
	{
		
		if(this.destiny){
		return true
		}
	}
	
	Cnds.prototype.enabled = function ()
	{
		
		if(this.active){
		return true
		}
	}
	
	Cnds.prototype.is_horizontal_moving = function ()
	{
		
		if(this.type_movement === "Horizontal" && this.moving){
		return true
		}
	}
	
	Cnds.prototype.is_vertical_moving = function ()
	{
		
		if(this.type_movement === "Vertical" && this.moving){
		return true
		}
	}
	
	Cnds.prototype.horizontal_type = function ()
	{
		
		if(this.properties[3] === 0){
		return true
		}
	}
	
	Cnds.prototype.vertical_type = function ()
	{
		
		if(this.properties[3] === 1){
		return true
		}
	}
	
	// ... other conditions here ...
	
	behaviorProto.cnds = new Cnds();

	//////////////////////////////////////
	// Actions
	function Acts() {};

	// the example action
	Acts.prototype.Start = function ()
	{
	
			this.properties[0] = 1 //propriedade de enable
	}
	
	Acts.prototype.stop = function ()
	{
	
			this.properties[0] = 0 //propriedade de disable
			this.moving = false
	}
	
	Acts.prototype.change_end_pointx = function (posicao)
	{
	
			this.properties[1] = posicao
	}
	
	Acts.prototype.change_end_pointy = function (posicao)
	{
	
			this.properties[2] = posicao
	}
	
	Acts.prototype.change_horizontal_movement = function ()
	{
	
			this.properties[3] = 0 // vai ficar como movimento horizontal
	}
	
	Acts.prototype.change_vertical_movement = function ()
	{
	
			this.properties[3] = 1 // vai ficar como movimento vertical
	}
	
	Acts.prototype.change_acceleration = function (acceleration)
	{
	
			this.acceleration = acceleration
			this.properties[4] = acceleration
	}
	
	// ... other actions here ...
	
	behaviorProto.acts = new Acts();

	//////////////////////////////////////
	// Expressions
	function Exps() {};

	// the example expression
	Exps.prototype.end_pointX = function (ret)	// 'ret' must always be the first parameter - always return the expression's result through it!
	{
		ret.set_float(this.properties[1])				// return value end point x
	
	}
	
	Exps.prototype.end_pointY = function (ret)
	{
		ret.set_float(this.properties[2])				// return value end point y
	
	}
	
	Exps.prototype.acceleration = function (ret)
	{
		ret.set_float(this.properties[4])				// return acceleration value
	
	}
	
	Exps.prototype.type_movement = function (ret)
	{
		ret.set_string(this.type_movement)				// return type movement
	
	}
	
		// ret.set_float(0.5);			// for returning floats
		// ret.set_string("Hello");		// for ef_return_string
		// ret.set_any("woo");			// for ef_return_any, accepts either a number or string
	// ... other expressions here ...
	
	behaviorProto.exps = new Exps();
	
}());
