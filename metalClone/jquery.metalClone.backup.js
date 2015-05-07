(function($){
	

	$.fn.metalClone = function(options , callback){

		opt = $.extend({}, $.fn.metalClone.defaults, options);

		/*if($.isFunction(options)){

			callback = options;
			options = null;

		}*/

		var typeSelector = this.selector;
		var element;
		

		    if (typeSelector.match(/[.]/)) {
		    	// if the selector is a class, 
		    	// then take the first element only
		    	element = $(this).first();
		    }
		    else {
		    	element = $(this);
		    }

		
		/*===============================================
		| Default clone button
		|================================================*/
		if (opt.btnClone === '.metalBtnClone') {

			$('<input/>',{

				type : 'button',
				value : 'Create New Element',
				class : 'btnClone'

			}).insertAfter(typeSelector);
		}


		/*===============================================
		| When Clone button was clicked
		|================================================*/
		$(document).on('click', opt.btnClone, function(){

			// Clone ELEMENT
			//var cloneObj = element.clone();

			// If destination provided, 
			// then use user defined destination
			if (opt.destination !== false){

				var destinationClone = $(opt.destination);
				var finalClone;

				if (opt.position === "after"){
					finalClone = destinationClone.append(cloneObj);
				} else {
					finalClone = destinationClone.prepend(cloneObj);
				}

			} 

			// else just clone element 
			// after/before cloned element
			else {

				var destinationClone = $(typeSelector);

				if (opt.position === "after"){
					//finalClone = cloneObj.insertAfter(destinationClone.last());
					console.log('hi');
					loopCloneAfterBefore(opt.numberToClone, element, destinationClone.last(), opt.position);
				} else {
					//finalClone = cloneObj.insertBefore(destinationClone.first());
					loopCloneAfterBefore(opt.numberToClone, element, destinationClone.first(), opt.position);
				}
			}

			// Create remove button
			// Remove cloned element
			
			

		})

		function loopCloneAppendPrepend(numberToClone, elementClone, position){

			for(var i = 0; i < numberToClone; i++){

			}
		}

		function loopCloneAfterBefore(numberToClone, elementClone, destination, position){

			var cloneObj = elementClone;   

			if (position === "after"){

				for(var i = 0; i < numberToClone; i++){
					cloneObj
						.clone()
						.insertAfter(destination)
							.append('<input type="button" value="remove" class="metalBtnRemove">');
				}			
				
			}
			else if (position === "before"){

				for(var i = 0; i < numberToClone; i++){

					cloneObj
						.clone()
						.insertBefore(destination)
							.append('<input type="button" value="remove" class="metalBtnRemove">');
				}				
			
			}
			
			return;
		}


		/*===============================================
		| When Remove button was clicked
		|================================================*/
		$(document).on('click', '.metalBtnRemove', function(){
			$(this).closest(typeSelector).remove();
		})
		

		return element.each(function(i,e){

			var $elem = $(this);

			/*if($.isFunction(options.onStart)){

				options.onStart.call(this);
			}

			$.isFunction(callback) && callback();*/
		})
		
	};

	$.fn.metalClone.defaults = {

		destination : false,
		position	: 'after',
		numberToClone : 3,
		ids		  	: false,
		btnClone	: '.metalBtnClone',
		onStart 	: null,
		onStop 		: null,
		onHalf 		: null,
		onFinish 	: null

	};
	
	
})(jQuery);