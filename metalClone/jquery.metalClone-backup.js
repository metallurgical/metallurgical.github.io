/*===================================================================
 | jQuery Metal Clone Plugins 
 |===================================================================
 | http://thunderwide.com 
 |
 | @category   Plugins
 | @author     Norlihazmey <norlihazmey89@thunderwide.com>
 | @license    Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 |             and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 | @copyright  (c) 2015 Norlihazmey(metallurgical)
 | @version    1.0.0
 | @Github 	   https://github.com/metallurgical/jquery-metal-clone
 |===================================================================*/

;(function($){
	

	$.fn.metalClone = function(options , callback){

		opt = $.extend({}, $.fn.metalClone.defaults, options);
		var scriptPath = function () {
	    var scripts = document.getElementsByTagName('SCRIPT');
	    var path = '';
	    if(scripts && scripts.length>0) {
	        for(var i in scripts) {
	            if(scripts[i].src && scripts[i].src.match(/\/jquery.metalClone\.js$/)) {
	                path = scripts[i].src.replace(/(.*)\/jquery.metalClone\.js$/, '$1');
	                break;
	            }
	        }
	    }
	    	return path;
		};

		//console.log(scriptPath());
		/*if($.isFunction(options)){

			callback = options;
			options = null;

		}*/

		// Get the selector
		// To see either class or ids were used
		var typeSelector = this.selector;
		var base = this;
		console.log(typeSelector);
		var nodeType = this[0].nodeName;
		// Capture the configuration options
		var currentCopyValue     = opt.copyValue;
		var currentPosition      = opt.position;
		var currentNumberToClone = opt.numberToClone;
		var currentDestination   = opt.destination;
		var currentIds           = opt.ids;
		var currentBtnRemoveText = opt.btnRemoveText;
		var destinationNodeType = (currentDestination) ? $(currentDestination)[0].nodeName : 'none';
		var cloneLimit			= opt.cloneLimit;
		

		// Table list(match with selection)
		var allNodeTableWithout = [
								'TABLE',
								'TR',
								'TD',
								'TBODY',
								'TFOOT',
								'THEAD',
								'TH'
							  ];

			
		var element;
		var flagClass = false;
		

		    if (typeSelector.match(/[.]/)) {
		    	// if the selector is a class, 
		    	// then take the first element only
		    	flagClass = true;
		    	element = $(this).first();
		    }
		    else {
		    	// If the selector is an ID
		    	// return  its object
		    	element = $(this);
		    }



		/*=================== parent[table] ===================*/
		var tdCloseParent;
		var firstTdChild;
		
		// only for table
		if($.inArray(nodeType, allNodeTableWithout) !== -1){

			tdCloseParent = element.closest('table');
			firstTdChild = tdCloseParent.find('tr').first();
			

		}

		
		/*===============================================
		| Default clone button
		|================================================
		| If user did't not provided the class or id name for 
		| cloned button, then system will provided one
		|================================================*/

		// initialize global variable for clone button
		var currentBtnClone;

		// If user not defined clone button, 
		// then make new one
		if (opt.btnClone === null) {
			// create new clone button with unique id
			currentBtnClone = "metalBtnClone"+Math.floor(Math.random()*9+1);
			//console.log(typeSelector);
			
			
			// if selector is a table and destination not table
			if(($.inArray(nodeType, allNodeTableWithout) !== -1) && ($.inArray(destinationNodeType, allNodeTableWithout) == -1)){
				
				$('<input/>',{

					type : 'button',
					value : opt.btnCloneText,
					class : currentBtnClone,
					css : {
						marginTop : '10px'
					}

				}).insertAfter(tdCloseParent);
			}
			// if selector is a table element and destination is a table
			else if(($.inArray(nodeType, allNodeTableWithout) !== -1 ) && ($.inArray(destinationNodeType, allNodeTableWithout) !== -1)){
				
				$('<input/>',{

					type : 'button',
					value : opt.btnCloneText,
					class : currentBtnClone,
					css : {
						marginTop : '10px'
					}

				}).insertAfter(tdCloseParent);
			}
			// if a selector is not a table && destination not a table
			else if(($.inArray(nodeType, allNodeTableWithout) == -1 ) && ($.inArray(destinationNodeType, allNodeTableWithout) == -1)){
				
				$('<input/>',{

					type : 'button',
					value : opt.btnCloneText,
					class : currentBtnClone,
					css : {
						marginTop : '10px'
					}

				}).insertAfter(typeSelector);
			}
			// if selector is not a table element and destination is a table
			else if(($.inArray(nodeType, allNodeTableWithout) == -1 ) && ($.inArray(destinationNodeType, allNodeTableWithout) !== -1)){
				
				$('<input/>',{

					type : 'button',
					value : opt.btnCloneText,
					class : currentBtnClone,
					css : {
						marginTop : '10px'
					}

				}).insertAfter(typeSelector);
			}

			// Concat the . sysmbol at beggining of 
			// class name for dynamic create button
			currentBtnClone = '.'+currentBtnClone;
		}
		// if user defined the button itself,
		// then use user defined button instead
		else{
			currentBtnClone = opt.btnClone;
		}


		//$(document).on('mousemove', function(){
			$(document).on({

				mouseenter : function(){
					
						$(this).find('.operations').css({
							display : 'block'
						});
					
				},
				mouseleave : function(){
					$(this).find('.operations').css({
						display : 'none'
					});
				}

			},typeSelector);
		//})

		
		

		/*===============================================
		| When Clone button was clicked
		|================================================*/
		$(document).on('click', currentBtnClone, function(){
			
			// Store the destination of cloned element
			var destinationClone;

			// If destination provided, 
			// then use user defined destination
			if (currentDestination !== false){

				// Use user defined destination
				destinationClone = $(currentDestination);

				// Put either after or before depend
				// on user defined position
				if (currentPosition === "after"){
					loopCloneAppendPrepend(currentNumberToClone, element, destinationClone, currentPosition);
					return;
				} else {
					loopCloneAppendPrepend(currentNumberToClone, element, destinationClone, currentPosition);
					return;
				}

			} 

			// If did't provied,just clone element 
			// after/before cloned element
			else {

				

				destinationClone = $(typeSelector);

				if (currentPosition === "after"){					
					loopCloneAfterBefore(currentNumberToClone, element, destinationClone.last(), currentPosition);
					return;
				} else {					
					loopCloneAfterBefore(currentNumberToClone, element, destinationClone.first(), currentPosition);
					return;
				}
			}

			
			return;

			

		});

		/*===============================================
		| Function to clone element(IF destination provided)
		|================================================
		| numberToClone		: Number of container to clone
		| elementClone		: Element want to clone
		| destination 	 	: Placeholder/destination to place the cloned element
		| position			: Position of newly cloned element
		|
		|
		|===============================================*/
		function loopCloneAppendPrepend(numberToClone, elementClone, destination, position){
			
			// Cache the clone obj
			var cloneObj = elementClone; 
			// If user put 0,
			// Then assign 1 as a default value
			// else use the provided value
			numberToClone = (numberToClone == 0) ? 1 : numberToClone;  			

			// If want to clone after
			if (position === "after"){

				// table element but destination only table
				// if selection is a table && destination a table
				if(($.inArray(nodeType, allNodeTableWithout) !== -1) && ($.inArray(destinationNodeType, allNodeTableWithout) !== -1)){

					for(var i = 0; i < numberToClone; i++){
						var toClone = cloneObj.clone();
							toClone.insertAfter(destination.find('tr').last());
							toClone.find('td').last().append('<div class="operations"><img src="'+scriptPath()+'/images/delete.png" class="metalBtnRemove operationsImg"/> '+currentBtnRemoveText+'</div>');
						if(currentCopyValue){ /* never copy */}else{clearForm(toClone);}
					}

				}
				// table element but destination not table element
				// if selection is a table && destination not a table
				else if(($.inArray(nodeType, allNodeTableWithout) !== -1) && ($.inArray(destinationNodeType, allNodeTableWithout) == -1)){
					
					for(var i = 0; i < numberToClone; i++){
						var toClone = cloneObj.clone();
						destination.append(toClone.append('<input type="button" value="'+currentBtnRemoveText+'" class="metalBtnRemove">'));
						if(currentCopyValue){ /* never copy */}else{clearForm(toClone);}
					}	
				}
				// not table element and destination not table element
				// if selection is not a table && destination not a table element
				else if(($.inArray(nodeType, allNodeTableWithout) == -1 ) && ($.inArray(destinationNodeType, allNodeTableWithout) == -1)){
					
					for(var i = 0; i < numberToClone; i++){
						var toClone = cloneObj.clone();
						destination.append(toClone.append('<input type="button" value="'+currentBtnRemoveText+'" class="metalBtnRemove">'));
						if(currentCopyValue){ /* never copy */}else{clearForm(toClone);}
					}	
				}
				//if selection is not a table && destination is a table
				else if(($.inArray(nodeType, allNodeTableWithout) == -1 ) && ($.inArray(destinationNodeType, allNodeTableWithout) !== -1)){

					for(var i = 0; i < numberToClone; i++){
						var toClone = cloneObj.clone();
							destination.append(toClone.append('<input type="button" value="'+currentBtnRemoveText+'" class="metalBtnRemove">'));
						if(currentCopyValue){ /* never copy */}else{clearForm(toClone);}
					}

				}

				
			}
			// If want to clone before
			else if (position === "before"){

				// table element but destination only table
				if(($.inArray(nodeType, allNodeTableWithout) !== -1) && ($.inArray(destinationNodeType, allNodeTableWithout) !== -1)){

					for(var i = 0; i < numberToClone; i++){
						var toClone = cloneObj.clone();
							toClone.insertAfter(destination.find('tr').first());
							toClone.find('td').last().append('<div class="operations"><img src="'+scriptPath()+'/images/delete.png" class="metalBtnRemove operationsImg"/> '+currentBtnRemoveText+'</div>');
						if(currentCopyValue){ /* never copy */}else{clearForm(toClone);}
					}

				}
				// table element but destination not table element
				else if(($.inArray(nodeType, allNodeTableWithout) !== -1) && ($.inArray(destinationNodeType, allNodeTableWithout) == -1)){
					
					for(var i = 0; i < numberToClone; i++){
						var toClone = cloneObj.clone();
						destination.prepend(toClone.append('<input type="button" value="'+currentBtnRemoveText+'" class="metalBtnRemove">'));
						if(currentCopyValue){ /* never copy */}else{clearForm(toClone);}
					}	
				}
				// not table element and destination not table element
				else if(($.inArray(nodeType, allNodeTableWithout) == -1 ) && ($.inArray(destinationNodeType, allNodeTableWithout) == -1)){
					
					for(var i = 0; i < numberToClone; i++){
						var toClone = cloneObj.clone();
						destination.prepend(toClone.append('<input type="button" value="'+currentBtnRemoveText+'" class="metalBtnRemove">'));
						if(currentCopyValue){ /* never copy */}else{clearForm(toClone);}
					}	
				}
				//if selection is not a table && destination is a table
				else if(($.inArray(nodeType, allNodeTableWithout) == -1 ) && ($.inArray(destinationNodeType, allNodeTableWithout) !== -1)){
					
					for(var i = 0; i < numberToClone; i++){
						var toClone = cloneObj.clone();
							destination.prepend(toClone.append('<input type="button" value="'+currentBtnRemoveText+'" class="metalBtnRemove">'));
						if(currentCopyValue){ /* never copy */}else{clearForm(toClone);}
					}
				}

				
				
			}
			
			// If the opt.ids is an empty array
			// Is a default value
			if($.isArray(currentIds) && $.isEmptyObject(currentIds)){
				
				// id will not increament
				// do nothing
				
			}
			// If user provided element in array container
			// Then call the function
			// pass the opt.ids array value[* or a few]
			else if ($.isArray(currentIds) && !$.isEmptyObject(currentIds)){
				
				// call the function
				idIncreament(currentIds);
			}
			return;
		}

		/*===============================================
		| Function to clone element(IF destination not provided)
		|================================================
		| numberToClone		: Number of container to clone
		| elementClone		: Element want to clone
		| destination 	 	: Placeholder/destination to place the cloned element
		| position			: Position of newly cloned element
		|
		|
		|===============================================*/
		function loopCloneAfterBefore(numberToClone, elementClone, destination, position){


			// Cache the clone obj
			var cloneObj = elementClone;   

			// If user put 0,
			// Then assign 1 as a default value
			// else use the provided value
			numberToClone = (numberToClone == 0) ? 1 : numberToClone;

			// If want to clone after
			if (position === "after"){
				
				// Clone element[insert after the clone element]
				// selection is a table
				if(($.inArray(nodeType, allNodeTableWithout) !== -1)){
					console.log('a');
					for(var i = 0; i < numberToClone; i++){

						var flagLimit = checkLimit();
			var canProceed;

			if ( !flagLimit ) {
				alert('Number to clone more than limit');
			    return;
			}
			else {
				 canProceed = ( flagLimit == "no limit" ) ? 0 : flagLimit;
			}

			console.log('Can :' + canProceed + ', limit : '+cloneLimit);
			if ( canProceed  > cloneLimit ) {
				alert("Can't clone more than limit provided") 
				return;
			}

						var toClone = cloneObj.clone();
							toClone.insertAfter(destination);
							toClone.find('td').last().append('<div class="operations"><img src="'+scriptPath()+'/images/delete.png" class="metalBtnRemove operationsImg"/> '+currentBtnRemoveText+'</div>');
						if(currentCopyValue){ /* never copy */}else{clearForm(toClone);}
					}
					
					
				}
				// selection is not a table
				if(($.inArray(nodeType, allNodeTableWithout) == -1)){
					console.log('b');
					for(var i = 0; i < numberToClone; i++){

						//if(i == canProceed) return;

						var toClone = cloneObj.clone();
							toClone.insertAfter(destination)
								   .append('<input type="button" value="'+currentBtnRemoveText+'" class="metalBtnRemove">');

						   if(currentCopyValue){ /* never copy */}else{clearForm(toClone);}
							

					}
				}
				
			}
			// If want to clone before
			else if (position === "before"){

				// Clone element[insert before]
				// If table tr to clone
				if(($.inArray(nodeType, allNodeTableWithout) !== -1)){
					
					for(var i = 0; i < numberToClone; i++){
						var toClone = cloneObj.clone();
							toClone.insertBefore(destination);
							toClone.find('td').last().append('<div class="operations"><img src="'+scriptPath()+'/images/delete.png" class="metalBtnRemove operationsImg"/> '+currentBtnRemoveText+'</div>');
						if(currentCopyValue){ /* never copy */}else{clearForm(toClone);}
					}
					
					
				}
				else{
					for(var i = 0; i < numberToClone; i++){
						var toClone = cloneObj.clone();
						toClone.insertBefore(destination)
							   .append('<input type="button" value="'+currentBtnRemoveText+'" class="metalBtnRemove">');

						if(currentCopyValue){ /* never copy */}else{clearForm(toClone);}
					}	
				}
				
			}

			// If the opt.ids is an empty array
			// Is a default value
			if($.isArray(currentIds) && $.isEmptyObject(currentIds)){
				// id will not increament
				// do nothing
				
			}
			// If user provided element in array container
			// Then call the function
			// pass the opt.ids array value[* or a few]
			else if ($.isArray(currentIds) && !$.isEmptyObject(currentIds)){

				// call the function
				idIncreament(currentIds);
			}
			
			
			return;
		}


		function clearForm(container){
			
			container.find('input:not("input[type=button], input[type=submit]"), textarea, select').each(function(){
				$(this).val('');
			});
		}


		/*===============================================
		| Function to clone element(IF destination not provided)
		|================================================*/
		function idIncreament(arr){

			var ids_value;

			// Check if the paramter passed 
			// has *(all) symbol
			// if yes, then find all element
			if ($.inArray('*', arr)){
				ids_value = '*';
			}
			// find element provided in array
			//  list only
			else {
				ids_value = arr.join(',');
			}
			

			// iterate throught cloned container			
			$(typeSelector).each(function(inc, e){

				// then find the element either * or a few
				// depend on user defined and default value
				$(this).find(ids_value).each(function(i,ee){

					// looking for and ID(S)
					// if found, then increament its value
					// to ensure all the same clone element
					// have unique id value
					if($(this).attr('id')){
						// Get the original value
						var oldValue = $(this).attr('id');
						var newValue = oldValue.replace(/\d+/g, '');
						//var increValue = 
						// Set the new id(s) value
						$(this).attr('id',newValue + parseInt(inc));
					}
				});
			
			});
		}

		function checkLimit(){

			//console.log('Debug : Number of clone cannot work together with limit');
			var numberOfCloneElementExisted;
			
			if ( flagClass )
				numberOfCloneElementExisted = $(typeSelector).length;
			else
				numberOfCloneElementExisted = $('[id="'+base[0].id+'"').length;

			if ( cloneLimit != "infinity" && typeof cloneLimit == "number") {
				if ( currentNumberToClone > cloneLimit ) {
					return false;
				} else {
					return numberOfCloneElementExisted;
				} 
			}
			else {
				//return console.log('Debug : no limit');
				return 'no limit';
			}
			
		}

		function limitHandler() {

			var flagLimit = checkLimit();
			var canProceed;

			if ( !flagLimit ) {
				alert('Number to clone more than limit');
			    return;
			}
			else {
				 canProceed = ( flagLimit == "no limit" ) ? 0 : flagLimit;
			}

			console.log('Can :' + canProceed + ', limit : '+cloneLimit);
			if ( canProceed  > cloneLimit ) {
				alert("Can't clone more than limit provided") 
				return;
			}
		}



		/*===============================================
		| When Remove button was clicked
		|================================================*/
		$(document).on('click', '.metalBtnRemove', function(){
			// Get the parent container
			// Then remove including child
			$(this).closest(typeSelector).remove();
		});
		

		return element.each(function(i,e){

			var $elem = $(this);

			
		});
		
	};

	$.fn.metalClone.defaults = {

		destination : false,			// Put your selector(parent container) eg : .myContainer | #myContainer
		position	: 'after',			// Available in two option : after & before
		numberToClone : 1,				// Number of element to clone
		ids		  	: [],				// Element to increase the id(s) value, unique purpose
										// eg : ['input','select','textarea']
										// Available options :
										// - input
										// - select
										// - textarea
										// - div
										// - span
										// - i
										// - strong
										// - h1-h6
										// * -> find all element inside container
										// - ......
										// ~~~~~ all HTML tag are availeble
										
		btnClone	: null,	// Put your selector(button class or id name) eg : .clickMe | #clickMe
		copyValue 	: false,			// Clone together the previous element value - available for form element only
		btnRemoveText : 'Remove me',			// Text appear on remove button
		btnCloneText : 'Create New Element',	// Text appear on clone button
		cloneLimit   : 'infinity'

		// Please wait for callback option.. coming soon..

	};
	
	
})(jQuery);