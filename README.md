jquery-log
==========

A simple jQuery logging plugin to log exceptions and send them to your API instantly or periodically. If you opt for the periodic option it will store the errors in localstorage and then post them to your server based on the interval you choose.

@author Dean Vaughan - http://www.mycreativedesign.co.uk

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

Here is a example of the JSON request that will be sent to your API
<pre>
{"errors": [{
"message":"somethingundefined is not defined",
"stack":"ReferenceError: somethingundefined is not defined\n at HTMLDocument.<anonymous> (/index.html:22:5)\n at c (http://code.jquery.com/jquery-1.10.0.min.js:4:25967)\n at Object.p.fireWith [as resolveWith] (http://code.jquery.com/jquery-1.10.0.min.js:4:26772)\n at Function.x.extend.ready (http://code.jquery.com/jquery-1.10.0.min.js:4:3305)\n at HTMLDocument.q (http://code.jquery.com/jquery-1.10.0.min.js:4:717)",
"code":"",
"name":"ReferenceError"
}]}
</pre>




