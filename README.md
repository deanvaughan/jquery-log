jquery-log
==========

A simple jQuery logging plugin to log exceptions and send them to your API instantly or periodically. If you opt for the periodic option it will store the errors in localstorage and then post them to your server based on the interval you choose.

1. Example usage to send caught exceptions to API immediately. 
<pre>
jQuery.Log('configure', {
   url: 'http://www.mycreativedesign.co.uk/api/errors',
});

try {
   somethingundefined("bad call");
} catch (e) {
   jQuery.Log(e);
}
</pre>

2. Example usage to send caught exceptions to API every 60 seconds 
<pre>
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
</pre>
