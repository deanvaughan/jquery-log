jquery-log
==========

A simple jQuery logging plugin to log exceptions and send them to your API instantly or periodically. If you opt for the periodic option it will store the errors in localstorage and then post them to your server based on the interval you choose.

// Example usage to send exceptions to API immediately. 
jQuery.Log('configure', {
   url: 'http://www.mycreativedesign.co.uk/api/errors',
});

try {
	 somethingundefined("bad call");
} catch (e) {
   jQuery.Log(e);
}

-----------------------------------------------------------------

// Example usuage to send caught exceptions to API every 60 seconds
jQuery.Log('configure', {
   url: 'http://www.mycreativedesign.co.uk/api/errors',
   uploadPeriodically: true,
   uploadInterval: 60 // seconds
});

try {
   throw new Error('error');
} catch (e) {
	 jQuery.Log(e);
} 
