//
// Copyright (c) 2010-2012, Peter Jekel
// All rights reserved.
//
//	The Checkbox Tree (cbtree), also known as the 'Dijit Tree with Multi State Checkboxes'
//	is released under to following three licenses:
//
//	1 - BSD 2-Clause							 (http://thejekels.com/cbtree/LICENSE)
//	2 - The "New" BSD License			 (http://trac.dojotoolkit.org/browser/dojo/trunk/LICENSE#L13)
//	3 - The Academic Free License	 (http://trac.dojotoolkit.org/browser/dojo/trunk/LICENSE#L43)
//
//	In case of doubt, the BSD 2-Clause license takes precedence.
//
define([
	"dojo/_base/array",
	"dojo/_base/connect",
	"dojo/_base/lang",
	"dojo/dom-class",
	"dojo/dom-prop",
	"dojo/dom-style",
	"dojo/has",
	"dijit/Tree"
], function (array, connect, lang, domClass, domProp, domStyle, has, Tree) {
	// summary:
	//		Tree Styling extensions to customize the look and feel of a dijit tree.
	// description:
	//		This module provides all the functionality to dynamically customize the
	//		styling and icons of the 'Dijit Tree With CheckBoxes' (cbtree).
	//		The styling functionality has been implemented as an extension to the
	//		tree and tree node and can be loaded seperately from either the cbtree
	//		or default dijit tree.

	// Add cbTree TreeStyling API to the available features list 
	has.add("cbtree-treeStyling-API", true);

	function isEmpty(o) {
		// summary:
		//		Return true if object is empty otherwise false.
		for(var prop in o) {
			if(o.hasOwnProperty(prop)) {
				return false;
			}
		}
		return true;
	}
	
	lang.extend(Tree._TreeNode, {

		_applyClassAndStyle: function (/*data.item*/ item, /*String*/ attribute) {
			// summary:
			//		Set the appropriate CSS classes and styles for labels, icons and rows.
			// item:
			//		The data item (void)
			// attribute:
			//		The lower case attribute name to use, e.g. 'icon', 'label' or 'row'.
			// tags:
			//		private
			var currClass, newClass, newStyle, className, styleName, nodeName;
			
			className = attribute + "Class";
			styleName = attribute + "Style";
			nodeName	= attribute + "Node";

			currClass = domProp.get(this[nodeName], "className");
			newClass	= (this.tree.get(className, this.item, this.isExpanded, this) || currClass);
			if (currClass !== newClass) {
				domClass.replace(this[nodeName], newClass, currClass || "");
				this[className] = newClass;
			}

			if (isEmpty(this[styleName])) {
				newStyle = this.tree.get(styleName, this.item, this.isExpanded) || {};
			} else {
				newStyle = this[styleName];
			}
			domStyle.set(this[nodeName], newStyle);
			this[styleName] = newStyle;
		},

		//====================================================================
		// Private _TreeNode Getters/Setters

		_set_icon_Attr: function ( /*Object*/ icon) {
			// summary:
			//		Hook for the internal set("_icon_", ...) requests.
			// icon:
			//		A icon object. (See _icon2Object() for more details on the layout).
			// tag:
			//		private
			if (icon.iconClass) { 
				this._set_iconClass_Attr(icon.iconClass); 
				this.icon = icon;
			}
		},

		_set_iconClass_Attr: function (cssClass) {
			// summary:
			//		Set the new class name(s) for the icon. All existing class names have
			//		to be removed as the older dijit themes restict the icon size.
			// cssClass:
			//		css class name
			// tag:
			//		private
			if(cssClass && (cssClass !== this.iconClass)) {
				domClass.replace(this.iconNode, cssClass, this.iconClass || "");
				this._applyClassAndStyle(this.item,"icon");
			}
		},

		_set_styling_Attr: function (newValue) {
			// summary:
			//		Forces the css classname and style to be re-applied to a tree node.
			//		This method is intended for internal use only and it typically called
			//		whenever either the class name or style of the node has changed.
			// newValue:
			//		Not used.
			// tags:
			//		private

			this._updateItemClasses(this.item);
		},
		
		_setIconStyleAttr: function(/*Object*/ style) {
			// summary:
			//		Set the icon style for the _TreeNode
			// style:
			//		Object suitable for input to domStyle.set() like:	{color: "red"}
			// tags:
			//		private

			this.iconStyle = style;
			this._applyClassAndStyle( this.item, 'icon');
		},

		_setLabelStyleAttr: function(/*Object*/ style) {
			// summary:
			//		Set the label style for the _TreeNode
			// style:
			//		Object suitable for input to domStyle.set() like:	{color: "red"}
			// tags:
			//		private

			this.labelStyle = style;
			this._applyClassAndStyle( this.item, 'label');
		},

		_setRowStyleAttr: function(/*Object*/ style) {
			// summary:
			//		Set the row style for the _TreeNode
			// style:
			//		Object suitable for input to domStyle.set() like:	{color: "red"}
			// tags:
			//		private

			this.rowStyle = style;
			this._applyClassAndStyle( this.item, 'row');
		}

	});
	
	lang.extend(Tree, {

		//==============================
		// Parameters to constructor

		// icon: String|Object
		//		See _icon for details. Either pass to the constructor or set using 
		//		set("icon", ... )
		//icon: null,
		
		// End Parameters to constructor
		//==============================

		_hasStyling: true,
		
		// _icon: [private] String|Object
		//		If _icon is specified the default dijit icons 'Open' 'Closed' and 'Leaf'
		//		will be replaced with a custom icon sprite with three distinct css classes:
		//		'Expanded', 'Collapsed' and 'Terminal'.
		_icon: null,

		// iconAttr: String
		//		Identifies the property/attribute of a data item the cbtree needs to act
		//		upon as being a custom icon.
		_iconAttr: null,

		// _itemStyleMap:	[private] Object
		//		Styling mapping table. The object hold one entry for each data item in the
		//		tree. Each entry contains information about the icon, label and row styling.
		_itemStyleMap: {},

		// _itemAttr:	[private] Array of Strings
		//		List of tree node DOM elements currently supported. If additional attributes
		//		or types need to be supported simply add the attribute to the list and create
		//		the appropriate getter and setter. The styling container will automatically
		//		pickup any attributes in this and the _typeAttr list.
		_itemAttr: [ "icon", "label", "row" ],

		// _typeAttr: [private] Array of Strings
		_typeAttr: [ "Class", "Style" ],

		_dijitIconClasses: ['dijitFolderOpened', 'dijitFolderClosed', 'dijitLeaf'],
		
		iconClass: "",	/* Overwrite the default dijitNoIcon */

		_getBaseClass: function( nodeWidget ) {
			// summary:
			//		Get the current icon class name for a node widget. This function is
			//		called if no custom icon is available for the data item associated
			//		with the nodeWidget.
			// nodeWidget:
			//		Tree node widget.
			// returns:
			//		A string, A list of class names, each separated by a space.
			// tag:
			//		private
			
			var classNames = nodeWidget ? domProp.get(nodeWidget["iconNode"], "className") : "";
			var classes, index, i;
			var baseClass = "";
			
			classes = lang.trim(classNames).split(/\s+/);
			if (classes[0]) {
				for (i=0; i< this._dijitIconClasses.length; i++) {
					index = array.indexOf(classes, this._dijitIconClasses[i]);
					if (index != -1 ) {
						classes.splice(index,1);
					}
				}
				baseClass = classes.toString();
			}
			return baseClass.replace(/,/g," "); 
		},
		
		_getClassOrStyle: function (/*data.item*/ item, /*String*/ attr, /*String*/ type) {
			// summary:
			//		Returns a styling property for a single DOM element, that is, icon,
			//		label or row, for the given item. The object is extracted from the
			//		styling container object. (see _getItemStyling() for details on the
			//		object layout).
			// item:
			//		The data item.
			// attr:
			//		Name of the DOM element to retrieve (icon,label or row).
			// type:
			//		Type of property to fetch ('Class' or 'Style'). The arguments 'attr' and
			//		'type' are combined to produce the actual property name for example:
			//
			//				iconClass, labelClass, rowStyle or iconStyle.
			// returns:
			//		An object in case of a style element otherwise a string
			// tag:
			//		private
			var name = attr+type;
			if ((array.indexOf(this._itemAttr, attr) != -1) && 
					(array.indexOf(this._typeAttr, type) != -1)) {
				var styling = this._getItemStyling(item);
				return styling[attr][attr+type];
			}
			throw new TypeError(this.declaredClass+"::_getClassOrStyle(): invalid attribute type specified.");
		},

		_getHasTreeSytlingAttr: function() {
			return this._hasStyling;
		},
		
		_getItemStyling: function (item) {
			// summary:
			//		Get the styling object for an item. The styling object is a container
			//		holding one object for each tree node DOM element such as icon, label
			//		or row. The basic layout of a styling container object is as follows:
			//
			//			styling = { icon:	{ iconClass:	null, iconStyle:	null },
			//									label: { lableClass: null, labelStyle: null },
			//									row:	 { rowClass:	 null, rowStyle:	 null } }
			//
			//		For each item associated with the tree one styling container object
			//		is held on the _tableStyleMap.
			// item:
			//		The data item.
			// returns:
			//		Data item styling as an object container.
			// tag:
			//		private

			if (!this._connected) { this._connectModel(); };

			if (this.model.isItem(item)) {
				var identity = this.model.getIdentity(item);
				var styling	= this._itemStyleMap[identity];
				if (!styling) {
					styling = this._getTreeStyling();
					// If an icon for the tree was defined, use it now. Merging the icon makes
					// sure the baseClass gets set..
					if (this._icon) {
						styling.icon = this._icon;
					}
					this._itemStyleMap[identity] = styling;
				}
				return styling;			
			}
			throw new TypeError(this.declaredClass+"::getItemStyling(): invalid data item specified.");
		},

		_getTreeStyling: function () {
			// summary:
			//		If no styling information is available for a data item, clone the
			//		styling of the tree root node and use it as the items default.
			// returns:
			//		Tree styling defaults as an object container.
			var styling = {};
			
			if (this.rootNode) {
				var identity	= this.model.getIdentity(this.rootNode.item);
				var treeStyle = this._itemStyleMap[identity];
				if (treeStyle) {
					styling = lang.clone(treeStyle);
				}
			} else {
				// If no tree root node is available dynamically create a new object.
				// This should only happen once during tree instantiation.
				var attr;
			
				array.forEach(this._itemAttr, function(attr) {
						styling[attr] = this._initStyleElement(attr);
					}, this);
				styling["root"] = true;
			}
			return styling;
		},

		_initStyleElement: function (/*String*/ attr) {
			// summary:
			//		Initialize a styling object, the object will get all properties listed
			//		in _typeAttr.
			// attr:
			//		Tree node attribute name (icon, label, etc....)
			// returns:
			//		A styling object.
			var element = {},
					type;
					
			array.forEach(this._typeAttr, function (type) {
					element[attr+type] = null;
				}, this);
			return element;
		},

		_setAllItems: function (/*Array|Object*/ args, /*Function*/ onItem, /*Function*/ onComplete, 
														 /*Context*/ scope) {
			// summary:
			//		Call the function onItem for each entry in the _tableStyleMap table and
			//		the function onComplete exactly once on completion.
			// args:	
			//		Array or object of arguments to be passed t0 the onItem and onComplete
			//		callback functions. Args is passed as a list of argument not as a single
			//		argument.
			// onItem:
			//		Function to be called for every entry in the _itemStyleMap table. The 
			//		function is called as: onItem(styling, ...) were '...' is the list of
			//		arguments contained in args. For example, if args has two arguments,
			//		attr and style, onItem is called as: onItem(styling, attr, style).
			// onComplete:
			//		Function to be called on completion, the function onComplete is called
			//		as: onComplete(...) were '...' is the list of arguments contained in 
			//		args.
			// scope:
			//		The context in which both onItem and onComplete are executed. If none
			//		is specified 'this' will be used.
			// tag:
			//		private

			var onItemArgs = (args ? (lang.isArray(args) ? args : this._object2Array(args)) : [])
			var identity;
	
			onItemArgs.unshift(null);		// Create a placeholder for the styling argument

			for(identity in this._itemStyleMap) {
				onItemArgs[0] = this._itemStyleMap[identity];
				onItem.apply((scope || this), Array.prototype.slice.call(onItemArgs,0));
			}
			if (onComplete) {
				onComplete.apply((scope || this), Array.prototype.slice.call(onItemArgs, 1));
			}
		},

		_setAttrClass: function (/*data.item?*/ item, /*String*/ attr, /*String*/ cssClass, 
															/*Function*/ onComplete) {
			// summary:
			//		Set the css classname of an icon, label or row for a given item.	If
			//		the item argument is omitted the classname is set for all currently
			//		known items. Note: no updates to the tree nodes are made.
			//
			//		A classname may contain multiple names, if so, the first name in the
			//		list is used as the base classname. For example, if the classname is
			//		'myIcon YourIcon OurIcon' all classnames will be set but only 'myIcon'
			//		is used to generate the special classnames associated with the tree
			//		such as myIconExpanded, myIconCollapsed or myIconTerminal.
			// item:
			//		The data item (optional).
			// attr:
			//		The attribute whose classname to set, that is, icon, label or row.
			// cssClass:
			//		ccs classname
			// onComplete:
			//		Function to be called on completion, the function onComplete is called
			//		as: onComplete(item, attr, cssClass) if an item is specified otherwise
			//		it is called as onComplete(attr, cssClass, baseClass).
			//		args.
			// returns:
			//		The updated styling object if an item was specified otherwise null.
			// tag:
			//		private
			if (lang.isString(cssClass)) {
				if (array.indexOf(this._itemAttr, attr) != -1) {
					// Note: the classname may contain multiple name, use the first as
					//			 the base class.
					var classes	= lang.trim(cssClass).split(/\s+/);
					if (classes[0]) {
						if (item) {
							var styling = this._getItemStyling(item);
							styling[attr][attr+'Class'] = cssClass;
							styling[attr]['baseClass']	= classes[0];
							delete styling.root;
							if (onComplete) {
								onComplete.call(this, item, attr, cssClass, classes[0]);
							}
							return styling[attr];
						} 
						else // Apply setting to all data items
						{
							this._setAllItems([ attr, cssClass, classes[0] ], 
									function (styling, attr, cssClass, baseClass) {
										styling[attr][attr+'Class'] = cssClass;
										styling[attr]['baseClass'] = baseClass;
										delete styling.root;
									}, 
									onComplete,
									this);
						}
					}
					return null;
				}
				throw new TypeError(this.declaredClass+"::setItemClass(): invalid attribute specified.");
			}
			throw new TypeError(this.declaredClass+"::setItemClass(): invalid argument type specified.");
		},

		_setAttrClassSet: function (/*data.item?*/ item, /*String*/ attr, /*String*/ cssClass) {
			// summary:
			//		Set the css classname for a given item and update all tree nodes
			//		associated with the item. If the item argument is omitted all
			//		tree nodes are updates. (see _setAttrClass())
			// item:
			//		The data item (optional).
			// attr:
			//		The attribute whose classname to set, that is, icon, label or row.
			// cssClass:
			//		ccs classname
			// tag:
			//		private

			if (item) {
				this._setAttrClass(item,attr, cssClass, 
					function (item, attr, cssClass, baseClass) {
						this._setStyling(item, '_styling_', cssClass) 
					});
			} else {
				this._setAttrClass(null, attr, cssClass, 
					function (attr, cssClass, baseClass) {
						// Apply changes to all tree nodes.
						this._setTreeNodes(this.rootNode, { _styling_: cssClass });
					});
			}
		},

		_setAttrStyle: function (/*data/item*/ item, /*String*/ attr, /*Object*/ style, /*Function*/ onComplete) {
			// summary:
			//		Set the css style properties of an icon, label or row for a given
			//		item. If the item argument is omitted the classname is set for all
			//		currently known data items. Note: no updates to the tree nodes are
			//		made.
			// item:
			//		The data item (optional).
			// attr:
			//		The attribute whose style properties to set, that is, icon, label
			//		or row.
			// style:
			//		Object suitable for input to domStyle.set() like:	{color: "red"}
			// onComplete:
			//		Function to be called on completion, the function onComplete is called
			//		as: onComplete(item, attr, style) if an item is specified otherwise it
			//		is called as onComplete(attr, style).
			//		args.			
			// returns:
			//		The updated styling object if an item was specified otherwise null.
			// tag:
			//		private

			if (lang.isObject(style)) {
				if (array.indexOf(this._itemAttr, attr) != -1) {
					if (item) {
						var styling = this._getItemStyling(item);
						styling[attr][attr+"Style"] = style;
						if (onComplete) {
							onComplete.call(this, item, attr, style);
						}
						return styling[attr];
					} 
					else // Apply setting to all data items
					{
						this._setAllItems([attr, style], 
								function (styling, attr, style) {
									styling[attr][attr+'Style'] = style;
								}, 
								onComplete,
								this);
					}
					return null;
				}
				throw new TypeError(this.declaredClass+"::setItemStyle(): invalid attribute specified.");
			}
			throw new TypeError(this.declaredClass+"::setItemStyle(): invalid argument type specified.");
		},

		_setAttrStyleSet: function (/*data.item*/ item, /*String*/ attr, /*Object*/ style) {
			// summary:
			//		Set the css style properties for a given item and update all tree
			//		nodes associated with the item. If the item argument is omitted
			//		all tree nodes are updates. (see _setAttrStyle())
			// item:
			//		The data item (optional).
			// attr:
			//		The attribute whose style properties to set, that is, icon, label
			//		or row.
			// style:
			//		Object suitable for input to domStyle.set() like:	{color: "red"}
			// tag:
			//		private

			var request = {};
			
			if (item) {
				this._setAttrStyle(item, attr, style, 
					function (item, attr, style) { 
						this._setStyling(item, attr+'Style', style) 
					})
			} else {
				this._setAttrStyle(null, attr, style, 
					function (attr, style) {
						request[attr+'Style'] = style;
						this._setTreeNodes(this.rootNode, request);
					});
			}
		},

		_setStyling: function (/*data.Item*/ item, /*String*/ attr, /*AnyType*/ value){
			// summary:
			//		Processes styling changes and apply them to all tree nodes associated
			//		with the data item.
			// item:
			//		A valid data item
			// attr:
			//		Attribute name
			// value:
			//		New value of the item attribute
			// tags:
			//		private
			var identity = this.model.getIdentity(item),
					nodes		= this._itemNodesMap[identity],
					request	= {};

			if (nodes){
				request[attr] = value;
				array.forEach(nodes, function (node){
						node.set(request);
					}, this);
			}
		},

		//====================================================================
		// Tree Getters/Setters hooks

		_getIconAttr: function (/*data.item*/ item) {
			// summary:
			//		Return the entire icon styling object.
			// item:
			//		The data item.
			// returns:
			//		Icon styling element as an object
			// tag:
			//		private
			var styling = this._getItemStyling(item);
					
			// If the styling is derived from the root node ask the model if there is
			// a custom icon available for this item.
			if (styling.root && this._iconAttr) {
				var icon = this.model.getIcon(item);
				if (icon) {
					icon = this._setIconAttr(icon, item);
					return icon;
				}
			} else {
				return styling.icon;
			}
		}, 

		_getIconClassAttr: function (/*data.item*/ item, /*Boolean*/ opened, /*_TreeNode?*/ nodeWidget) {
			// summary:
			//		Returns the css classname for the icon
			return this.getIconClass( item, opened, nodeWidget );
		},

		_getIconStyleAttr: function (/*data.item*/ item, /*Boolean*/ opened) {
			// summary:
			//		Returns the icon style properties as an object.
			return this.getIconStyle(item, opened);
		},

		_getLabelClassAttr: function (/*data.item*/ item, /*Boolean*/ opened, /*_TreeNode?*/ nodeWidget) {
			// summary:
			//		Returns the css classname for the label
			return this.getLabelClass(item, opened, nodeWidget);
		},

		_getLabelStyleAttr: function (/*data.item*/ item, /*Boolean*/ opened) {
			// summary:
			//		Returns the label style properties as an object.
			return this.getLabelStyle(item, opened);
		},

		_getRowClassAttr: function (/*data.item*/ item, /*Boolean*/ opened, /*_TreeNode?*/ nodeWidget) {
			// summary:
			//		Returns the css classname for the row
			return this.getRowClass(item, opened, nodeWidget);
		},

		_getRowStyleAttr: function (/*data.item*/ item, /*Boolean*/ opened) {
			// summary:
			//		Returns the row style properties as an object.
			return this.getRowStyle(item, opened);
		},

		_setIconAttr: function (/*string|Object*/ icon, /*data.item?*/ item ) {
			// summary:
			//		Hook for the set("icon",customIcon) method and allows for dynamic
			//		changing of the tree node icons. If the item argument is omitted
			//		the icon is applied to all tree node.
			//
			//		NOTE: No matter what the custom icon is, the associated css file(s)
			//					MUST have been loaded prior to setting the new icon.
			// icon:
			//		A string specifying the css class of the icon or an icon object.
			//		(See _icon2Object() for more details on the layout).
			// item:
			//		A data item (optional).
			// returns:
			//		The converted icon styling object.
			// tags:
			//		private
			
			var newIcon = this._icon2Object(icon);
			if (newIcon) { 
				if (item) {
					var styling = this._getItemStyling(item);
					styling.icon = newIcon;
					delete styling.root;
					this._setStyling(item, '_icon_', newIcon);
				} 
				else // Apply icon to all data items
				{
					this._setAllItems([newIcon], 
						function (styling, newIcon) {
							styling.icon = newIcon;
							delete styling.root;
						}, 
						function (newIcon) {
							this._setTreeNodes(this.rootNode, { _icon_: newIcon });
						}, 
						this);
					// Save it as the common tree icon.
					this._icon = newIcon;
				}
			}
			return newIcon;
		},

		_setIconClassAttr: function (/*String*/ cssClass, /*Item?*/ item) {
			// summary:
			//		Set the icon classname. This is the hook for set("iconClass",...).
			//		If the optional argument item is omitted, the classname is applied
			//		to all tree node.
			// cssClass
			//		css classname
			// item:
			//		A data item (optional).
			// returns:
			//		The updated property value.
			// tags:
			//		private
			return this._setAttrClassSet(item,'icon', cssClass);
		},

		_setIconStyleAttr: function (/*Object*/ style, /*Item?*/ item) {
			// summary:
			//		Set the icon style properties. This is the hook for set("iconStyle",..)
			//		If the optional argument item is omitted, the style is applied to all
			//		tree node.
			// style:
			//		Object suitable for input to domStyle.set() like: {color: "red"}
			// item:
			//		A data item (optional).
			// returns:
			//		The updated property value.
			// tags:
			//		private
			return this._setAttrStyleSet(item,'icon', style);
		},
		
		_setLabelClassAttr: function (/*String*/ cssClass, /*Item?*/ item) {
			// summary:
			//		Set the label classname. This is the hook for set("labelClass",...).
			//		If the optional argument item is omitted, the classname is applied
			//		to all tree node.
			// cssClass
			//		css classname
			// item:
			//		A data item (optional).
			// returns:
			//		The updated property value.
			// tags:
			//		private
			return this._setAttrClassSet(item,'label', cssClass);
		},

		_setLabelStyleAttr: function (/*Object*/ style, /*Item?*/ item) {
			// summary:
			//		Set the label style properties. This is the hook for set("labelStyle",..)
			//		If the optional argument item is omitted, the style is applied to all
			//		tree node.
			// style:
			//		Object suitable for input to domStyle.set() like: {color: "red"}
			// item:
			//		A data item (optional).
			// returns:
			//		The updated property value.
			// tags:
			//		private
			return this._setAttrStyleSet(item,'label', style);
		},
		
		_setRowClassAttr: function (/*String*/ cssClass, /*Item?*/ item) {
			// summary:
			//		Set the row classname. This is the hook for set("rowClass",...).
			//		If the optional argument item is omitted, the classname is applied
			//		to all tree node.
			// cssClass
			//		css classname
			// item:
			//		A data item (optional).
			// returns:
			//		The updated property value.
			// tags:
			//		private
			return this._setAttrClassSet(item,'row', cssClass);
		},

		_setRowStyleAttr: function (/*Object*/ style, /*data.item?*/ item) {
			// summary:
			//		Set the row style properties. This is the hook for set("rowStyle",..)
			//		If the optional argument item is omitted, the style is applied to all
			//		tree node.
			// style:
			//		Object suitable for input to domStyle.set() like: {color: "red"}
			// item:
			//		A data item (optional).
			// returns:
			//		The updated property value.
			// tags:
			//		private
			return this._setAttrStyleSet(item,'row', style);			
		},

		_modelIconUpdate: function (/*data.item*/ item, /*String*/ attr, /*String|Object*/ icon) {
			// summary:
			//		Record a new icon for the given item. Whenever the model signals an
			//		updated icon, it must be recorded with the item first before it is
			//		applied to any _TreeNode, this because the tree node will fetch any
			//		icon info from the per item tree styling container. 
			//
			//		NOTE:	This method is called by _onItemChange() by means of the event
			//					mapping table. (see also _connectModel()).
			var styling = this._getItemStyling(item);
			var newIcon = this._icon2Object(icon);

			if (newIcon) { 
				styling.icon = newIcon;
				delete styling.root;
			}
			return newIcon;
		},

		//====================================================================
		// Public methods replacing the default dijit tree methods.
		
		getIconClass: function (/*data.item*/ item, /*Boolean*/ opened, /*_TreeNode?*/ nodeWidget) {
			// summary:
			//		Compose the 'dynamic' classname for a tree node.
			// item:
			//		The data item
			// opened:
			//		Indicates if the tree node is currently expanded. (only available when
			//		called from the tree node).
			// nodeWidget:
			//		Tree node widget. (only available when called from a tree node).
			// returns:
			//		Classname(s) as a string
			// tag:
			//		private
			
			var isExpandable, itemIcon, nodeItem = item;		
			var iconClass, baseClass, newClass, indent;
			
			if (!nodeItem) {
				if (this.rootNode) {
					nodeItem	 = this.rootNode.item;
					nodeWidget = this.rootNode;
					opened		 = this.rootNode.isExpanded;
				}			
			} 
			isExpandable = nodeItem ? this.model.mayHaveChildren(nodeItem) : false;
			itemIcon = this._getItemStyling(nodeItem)["icon"];
					
			if (!itemIcon || !itemIcon.iconClass) {
				newClass	= (!nodeItem || isExpandable) ? (opened ? "dijitFolderOpened" : "dijitFolderClosed") : "dijitLeaf";
                                
				baseClass = this._getBaseClass( nodeWidget );
				iconClass = baseClass ? baseClass + ' ' + newClass : newClass;
				return iconClass;
			}
                         
			// Handle custom icons...
			iconClass	= itemIcon.iconClass;
			baseClass = itemIcon.baseClass;
			indent		= itemIcon.indent;

			if (!itemIcon.fixed) {
				if (nodeWidget) {
					newClass = baseClass + (isExpandable ? (opened ? "Expanded" : "Collapsed") : "Terminal");
					if (indent !== undefined && indent !== false) {
						// Test boolean versus numeric
						if (indent === true || indent >= nodeWidget.indent) {
							newClass += ' ' + newClass + '_' + nodeWidget.indent;
						}
					}
					iconClass += ' ' + newClass;
				}
			} else {
				iconClass += ' ' + itemIcon.fixed;
			}
			return iconClass;
		},

		getIconStyle: function (/*dojo.data.item*/ item, /*Boolean*/ opened) {
			return this._getClassOrStyle(item,"icon","Style");
		},

		getLabelClass: function (/*dojo.data.item*/ item, /*Boolean*/ opened) {
			return this._getClassOrStyle(item,"label","Class");
		},

		getLabelStyle: function (/*dojo.data.item*/ item, /*Boolean*/ opened) {
			return this._getClassOrStyle(item,"label","Style");
		},

		getRowClass: function (/*dojo.data.item*/ item, /*Boolean*/ opened) {
			return this._getClassOrStyle(item,"row","Class");
		},

		getRowStyle: function (/*dojo.data.item*/ item, /*Boolean*/ opened) {
			return this._getClassOrStyle(item,"row","Style");
		},

		//====================================================================
		// Widget extensions
		
		get: function (/*String*/ name /*===== optional argument list =====*/) {
			// summary:
			//		Get a property from a widget. In contrast to the default get() method
			//		this implementation allows for additional parameters to be passed to
			//		the getter functions.
			// description:
			//		Get a named property from a widget. The property may potentially be
			//		retrieved via a getter method. If no getter is defined, this just
			//		retrieves the object's property.
			//	name:
			//		The property to get.
			// returns:
			//		The requested property value.
			// tags:
			//		extension

			var names = this._getAttrNames(name),		//_WidgetBase
					getter = this[names.g];

			if (typeof getter === "function") {
				// use the explicit getter
				var result = getter.apply(this, Array.prototype.slice.call(arguments, 1));
				return result;
			}
			return this[name];
		},

		// =======================================================================
		// Misc helper functions/methods

		_connectModel: function () {
			// summary:
			//		Register with the model as a listner. Whenever a data item is deleted
			//		its entry in the _tableStyleMap needs to be removed. The event handler
			//		'_onStyleDelete' will take care of that. In addition, create an event
			//		mapping for the item 'icon' attribute.
			// tag:
			//		private
			var model = this.model;

			this._itemStyleMap = {};
			this._connected    = true;
			if (model) {
				// If the model specified an icon attribute it must also provide support
				// for the getIcon() method.
				if (model.iconAttr) {
					if (!model.getIcon || !lang.isFunction(model.getIcon)) {
						console.warn("cbtree/TreeStyling::_connectModel(): model has 'iconAttr' set but does not provide support for getIcon().");
						this._iconAttr = null;
					} else {
						this._iconAttr = this.model.iconAttr;
					}
				}
				// Map any icon updates from the model to '_icon_' and redirect the event
				// to _modelIconUpdate() but only if mapEventToAttr() is supported.
				if (this.mapEventToAttr && lang.isFunction(this.mapEventToAttr)) {
					this.mapEventToAttr(null, this._iconAttr, "_icon_", this._modelIconUpdate );
				}
				this.connect(this.model, "onDelete", "_onStyleDelete");
			}
		},

	 _icon2Object: function (/*String|Object*/ icon) {
			// summary:
			//		Convert a string argument into an icon object. If icon is already an
			//		object it is tested for the minimal required properties.
			// icon:
			//		A string specifying the css class of the icon or an icon object. Any
			//		icon object can have the following properties:
			//
			//			iconClass: css class name (required)
			//			iconStyle: Object suitable for input to domStyle.set() (optional)
			//			fixed:		 css class name (optional)
			//			indent:		Boolean|Integer (optinal)
			//
			//		For example:
			//
			//			icon = { iconClass:'myIcons', iconStyle: {border:'solid'}, fixed:'myIconsStatic' }
			//
			//		(See _getIconClassAttr() for the use of the 'fixed' & 'indent' properties).
			// icon:
			//		A string specifying the css class of the icon or an icon object.
			// returns:
			//		Updated or new icon styling object
			// tags:
			//		private

			var attr, classes, newIcon;

			if (icon) {
				if (!lang.isObject(icon)) {
					if (lang.isString(icon) && icon.length) {
						classes	= lang.trim(icon).split(/\s+/);
						if (classes[0]) {
							newIcon = this._initStyleElement("icon");
							newIcon.baseClass = classes[0];
							newIcon.iconClass = icon;
							newIcon.indent		= true;
							return newIcon;;
						}
					} else {
						throw new TypeError(this.declaredClass+"::_icon2Object(): icon must be an object or string");
					}
				} else {
					// Test the icon class and set the base class.
					if (icon.iconClass) {
						classes	= lang.trim(icon.iconClass).split(/\s+/);
						if (classes[0]) {
							newIcon = this._initStyleElement("icon");
							newIcon.baseClass = classes[0];
							newIcon.indent		= true;
							for(attr in icon) {
								newIcon[attr] = icon[attr];
							}
							return newIcon;
						}
					}
					throw new Error(this.declaredClass+"::_icon2Object(): required property 'iconClass' is missing or empty");
				}
			}
			return null;
		},

		_object2Array: function (args) {
			// summary:
			//		Convert an object to an array style object.
			//
			// returns:
			//		Array style object.
			// tag:
			//		private
			var newArray = [],
					attr;

			if (!lang.isArray(args)) {
				if (lang.isObject(args)) {
					for(attr in args) {
						newArray.push(args[attr]);
					}
				} else {
					newArray.push(args);
				}
				return newArray;
			}
			return args;
		},

		_onStyleDelete: function (/*data.item*/ item) {
			// summary:
			//		Processes notification for the deletion of an item
			var identity = this.model.getIdentity(item);
			delete this._itemStyleMap[identity];
		},

		_setTreeNodes: function (/*_TreeNode*/ node, /*Object*/ request) {
			// summary:
			//		Execute a set() request for a tree node and all of its children
			//		recursively.
			// node:
			//		A tree node. If the node is the tree root node the request will be
			//		executed for ALL tree nodes.
			// request:
			//		Object defining the set() request. For example: {icon:'myIcon'}
			// tag:
			//		private.
			if (node) {
				if (lang.isObject(request)) {
					node.set(request);
					array.forEach(node.getChildren(), function (child) {
							this._setTreeNodes(child, request);
						}, this);
				}
			}
		}

	}); /* end lang.extend() */

}); /* end define() */
