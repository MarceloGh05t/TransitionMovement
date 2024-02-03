function GetBehaviorSettings()
{
	return {
		"name":			"Transition Movement",			// as appears in 'add behavior' dialog, can be changed as long as "id" stays the same
		"id":			"TransitionMovement",			// this is used to identify this behavior and is saved to the project; never change it
		"version":		"1.0",					// (float in x.y format) Behavior version - C2 shows compatibility warnings based on this
		"description":	"Creates transition movement.",
		"author":		"M. J. Borghi",
		"help url":		"",
		"category":		"Movements",				// Prefer to re-use existing categories, but you can set anything here
		"flags":		0						// uncomment lines to enable flags...
						| bf_onlyone			// can only be added once to an object, e.g. solid
	};
};

////////////////////////////////////////
// Parameter types:
// AddNumberParam(label, description [, initial_string = "0"])			// a number
// AddStringParam(label, description [, initial_string = "\"\""])		// a string
// AddAnyTypeParam(label, description [, initial_string = "0"])			// accepts either a number or string
// AddCmpParam(label, description)										// combo with equal, not equal, less, etc.
// AddComboParamOption(text)											// (repeat before "AddComboParam" to add combo items)
// AddComboParam(label, description [, initial_selection = 0])			// a dropdown list parameter
// AddObjectParam(label, description)									// a button to click and pick an object type
// AddLayerParam(label, description)									// accepts either a layer number or name (string)
// AddLayoutParam(label, description)									// a dropdown list with all project layouts
// AddKeybParam(label, description)										// a button to click and press a key (returns a VK)
// AddAudioFileParam(label, description)								// a dropdown list with all imported project audio files

////////////////////////////////////////
// Conditions

// AddCondition(id,					// any positive integer to uniquely identify this condition
//				flags,				// (see docs) cf_none, cf_trigger, cf_fake_trigger, cf_static, cf_not_invertible,
//									// cf_deprecated, cf_incompatible_with_triggers, cf_looping
//				list_name,			// appears in event wizard list
//				category,			// category in event wizard list
//				display_str,		// as appears in event sheet - use {0}, {1} for parameters and also <b></b>, <i></i>, and {my} for the current behavior icon & name
//				description,		// appears in event wizard dialog when selected
//				script_name);		// corresponding runtime function name
				
// example				
AddCondition(0, cf_none, "Is moving", "Check Movement", "Is moving", "Is moving transition", "IsMoving")

AddCondition(1, cf_none, "In destiny", "Check Movement", "arrived at destination", "arrived at destination", "in_destiny")

AddCondition(2, cf_none, "Enabled", "Check Enabled", "is Enabled", "Check if it is Enabled", "enabled")

AddCondition(3, cf_none, "Is horizontal moving", "Check Movement", "Is horizontal moving", "Is horizontal moving", "is_horizontal_moving")

AddCondition(4, cf_none, "Is vertical moving", "Check Movement", "Is vertical moving", "Is vertical moving", "is_vertical_moving")

AddCondition(5, cf_none, "Horizontal type", "Movement type", "Horizontal type", "Horizontal move type", "horizontal_type")

AddCondition(6, cf_none, "Vertical type", "Movement type", "Vertical type", "Vertical move type", "vertical_type")

////////////////////////////////////////
// Actions

// AddAction(id,				// any positive integer to uniquely identify this action
//			 flags,				// (see docs) af_none, af_deprecated
//			 list_name,			// appears in event wizard list
//			 category,			// category in event wizard list
//			 display_str,		// as appears in event sheet - use {0}, {1} for parameters and also <b></b>, <i></i>
//			 description,		// appears in event wizard dialog when selected
//			 script_name);		// corresponding runtime function name

// example
AddAction(0, af_none, "Start", "Movement", "Enabled movement", "Enabled movement", "Start")

AddAction(1, af_none, "Stop", "Movement", "Disabled movement", "Disabled movement", "stop")

AddNumberParam("Enf point X", "Value in pixel to end point X.", "0")
AddAction(2, af_none, "Change end point x", "Value", "Change end point x to {0}", "Change end point x value to horizontal movement", "change_end_pointx")

AddNumberParam("Enf point Y", "Value in pixel to end point Y.", "0")
AddAction(3, af_none, "Change end point y", "Value", "Change end point y to {0}", "Change end point y value to vertical movement", "change_end_pointy")

AddAction(4, af_none, "Horizontal movement", "Type Movement", "Change to horizontal movement", "Change to horizontal movement", "change_horizontal_movement")

AddAction(5, af_none, "Vertical movement", "Type Movement", "Change to vertical movement", "Change to vertical movement", "change_vertical_movement")

AddNumberParam("Acceleration", "The rate of acceleration, in pixels per second per second", "400")
AddAction(6, af_none, "Change Acceleration", "Value", "Change Acceleration to {0}", "Change Acceleration", "change_acceleration")

////////////////////////////////////////
// Expressions

// AddExpression(id,			// any positive integer to uniquely identify this expression
//				 flags,			// (see docs) ef_none, ef_deprecated, ef_return_number, ef_return_string,
//								// ef_return_any, ef_variadic_parameters (one return flag must be specified)
//				 list_name,		// currently ignored, but set as if appeared in event wizard
//				 category,		// category in expressions panel
//				 exp_name,		// the expression name after the dot, e.g. "foo" for "myobject.foo" - also the runtime function name
//				 description);	// description in expressions panel

// example
AddExpression(0, ef_return_number, "End point x", "Values", "end_pointX", "Return the number of end poin x.")
AddExpression(1, ef_return_number, "End point y", "Values", "end_pointY", "Return the number of end poin y.")
AddExpression(2, ef_return_number, "Acceleration", "Values", "acceleration", "Return the number of acceleration.")
AddExpression(3, ef_return_string, "Type movement", "Movement", "type_movement", "Return the string of type movement.")

////////////////////////////////////////
ACESDone();

////////////////////////////////////////
// Array of property grid properties for this plugin
// new cr.Property(ept_integer,		name,	initial_value,	description)		// an integer value
// new cr.Property(ept_float,		name,	initial_value,	description)		// a float value
// new cr.Property(ept_text,		name,	initial_value,	description)		// a string
// new cr.Property(ept_combo,		name,	"Item 1",		description, "Item 1|Item 2|Item 3")	// a dropdown list (initial_value is string of initially selected item)

var property_list = [
	new cr.Property(ept_combo, "Initial state", "Enabled", "Whether to initially have the behavior enabled or disabled.", "Disabled|Enabled"),
	new cr.Property(ept_float, "End Point X", 0, "The movement Horizontal will be towards the end point x."),
	new cr.Property(ept_float, "End Point Y", 0, "The movement Vertical will be towards the end point y."),
	new cr.Property(ept_combo, "Movement", "Horizontal", "Type of movement.", "Horizontal|Vertical"),
	new cr.Property(ept_float, "Acceleration", 400, "The rate of acceleration, in pixels per second per second.")
	];
	
// Called by IDE when a new behavior type is to be created
function CreateIDEBehaviorType()
{
	return new IDEBehaviorType();
}

// Class representing a behavior type in the IDE
function IDEBehaviorType()
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
}

// Called by IDE when a new behavior instance of this type is to be created
IDEBehaviorType.prototype.CreateInstance = function(instance)
{
	return new IDEInstance(instance, this);
}

// Class representing an individual instance of the behavior in the IDE
function IDEInstance(instance, type)
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
	
	// Save the constructor parameters
	this.instance = instance;
	this.type = type;
	
	// Set the default property values from the property table
	this.properties = {};
	
	for (var i = 0; i < property_list.length; i++)
		this.properties[property_list[i].name] = property_list[i].initial_value;
		
	// any other properties here, e.g...
	// this.myValue = 0;
}

// Called by the IDE after all initialization on this instance has been completed
IDEInstance.prototype.OnCreate = function()
{
}

// Called by the IDE after a property has been changed
IDEInstance.prototype.OnPropertyChanged = function(property_name)
{
}
