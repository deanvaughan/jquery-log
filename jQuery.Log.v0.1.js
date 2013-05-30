
/*
 * jQuery Log v 0.1
 * 
 * @description A simple jQuery Plugin to catch client side errors and log them to your server instantly or periodically. 
 * @author Dean
 */

(function($){ 
   $.LogConfiguration = {
        options: {
            url: false,
            uploadInterval: 5,
            uploadPeriodically: false,
            ajax: false
        },
        errorStack: [],
        interval: false
   };
   
   $.Log = $.Log || function(param1, param2) {
   
        this.init = function() {

            if (typeof param1 === 'string') {
                if (param1 == 'configure') {
                    jQuery.extend(jQuery.LogConfiguration.options, param2);

                    if (param2.uploadPeriodically) {
                        this.setRequestInterval();
                    }
                }
            } else if (param1 instanceof Error) {
                if (jQuery.LogConfiguration.options.uploadPeriodically) {

                    if (this.localStorageSupported()) {
                        var error = this.formatException(param1);
                        var errors = [];
                        var errorStack = this.getLocalStorageErrors();

                        if (errorStack) {
                            if (errorStack instanceof Array) {
                                errorStack.push(error);
                                errors = errorStack;
                            } else {
                                errors.push(error); 
                            }
                        } else {
                            errors.push(error); 
                        } 
						
                        this.setLocalStorageErrors(errors);
						
                    } else {
                        jQuery.LogConfiguration.errorStack.push(error);
                    } 
                } else {
                    this.requestHandler(param1);
                }
            }
        }

        this.getErrors = function() {
            if (this.localStorageSupported()) {
                return this.getLocalStorageErrors();
            } else {
                return jQuery.LogConfiguration.errorStack;
            } 
        }

        this.getLocalStorageErrors = function() {
            var data = localStorage.getItem('errorStack'); 
            return ((data) ? JSON.parse(data) : []);
        }

        this.setLocalStorageErrors = function(data) {
            localStorage.setItem('errorStack', JSON.stringify(data));
        }

        this.localStorageSupported = function() {
            return (typeof(Storage)!== "undefined");
        }

        this.setRequestInterval = function()  {

            var self = this;
			
            jQuery.LogConfiguration.interval = setInterval(function(){	
                var data = [];
	
                if (self.localStorageSupported()) {
                    data = self.getLocalStorageErrors(); 					
                    self.setLocalStorageErrors(false);
                } else {
                    data = jQuery.LogConfiguration.errorStack;
                    jQuery.LogConfiguration.errorStack = [];
                } 
     
                if (data.length > 0) {
                    self.sendRequest(data);
                }
                
            }, (jQuery.LogConfiguration.options.uploadInterval * 1000)); 
        }

        this.formatException = function(e) {
            return {
                message: e.message.toString(),
                stack: (e.stack) ? e.stack.toString() : '',
                code: (e.code) ? e.code.toString() : '',
                name: (e.name) ? e.name.toString() : ''
            };
        }

        this.requestHandler = function(e) {
            if (e) {
                this.sendRequest([this.formatException(e)]); 
            }
        }
	
        this.sendRequest = function(data) {
            
            var options = {
                url: jQuery.LogConfiguration.options.url, 
                dataType: 'json',
                type: 'POST',
                data: {errors: JSON.stringify(data)}
            } 
            
            if (jQuery.LogConfiguration.options.ajax instanceof Object) {
                options = jQuery.extend(options, jQuery.LogConfiguration.options.ajax)
            }
            
            jQuery.ajax(options);
        }

        this.init();
        
        return this;
   } 
})(jQuery);