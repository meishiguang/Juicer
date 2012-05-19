(function(){var b=function(){var d=[].slice.call(arguments);d.push(b.options);if(arguments.length==1){return b.compile.apply(b,d);}if(arguments.length>=2){return b.to_html.apply(b,d);}};var c={escapehash:{"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;","'":"&#x27;","/":"&#x2f;"},escapereplace:function(d){return this.escapehash[d];},escaping:function(d){return typeof(d)!=="string"?d:d.replace(/[&<>"]/igm,this.escapereplace);},detection:function(d){return typeof(d)==="undefined"?"":d;}};var a=function(d){if(console){if(console.warn){console.warn(d);return;}if(console.log){console.log(d);return;}}throw (d);};b.__cache={};b.version="0.4.0-dev";b.settings={forstart:/{@each\s*([\w\.]*?)\s*as\s*(\w*?)\s*(,\s*\w*?)?}/igm,forend:/{@\/each}/igm,ifstart:/{@if\s*([^}]*?)}/igm,ifend:/{@\/if}/igm,elsestart:/{@else}/igm,elseifstart:/{@else if\s*([^}]*?)}/igm,interpolate:/\${([\s\S]+?)}/igm,noneencode:/\$\${([\s\S]+?)}/igm,inlinecomment:/{#[^}]*?}/igm,rangestart:/{@each\s*(\w*?)\s*in\s*range\((\d+?),(\d+?)\)}/igm};b.options={cache:true,strip:true,errorhandling:true,detection:true,__escapehtml:c,__throw:a};b.set=function(d,f){if(arguments.length===2){this.options[d]=f;return;}if(d===Object(d)){for(var e in d){if(d.hasOwnProperty(e)){this.options[e]=d[e];}}}};b.template=function(){var d=this;this.__interpolate=function(e,i,g){var f=e.split("|"),h="";if(f.length>1){e=f.shift();h="_method."+f.shift();}return"<%= "+(i?"_method.__escapehtml.escaping":"")+"("+(!g||g.detection!==false?"_method.__escapehtml.detection":"")+"("+h+"("+e+"))) %>";};this.__removeShell=function(f,e){var g=0;f=f.replace(b.settings.forstart,function(l,i,k,j){var k=k||"value",j=j&&j.substr(1);var h="i"+g++;return"<% for(var "+h+"=0, l"+h+"="+i+".length;"+h+"<l"+h+";"+h+"++) {var "+k+"="+i+"["+h+"];"+(j?("var "+j+"="+h+";"):"")+" %>";}).replace(b.settings.forend,"<% } %>").replace(b.settings.ifstart,function(h,i){return"<% if("+i+") { %>";}).replace(b.settings.ifend,"<% } %>").replace(b.settings.elsestart,function(h){return"<% } else { %>";}).replace(b.settings.elseifstart,function(h,i){return"<% } else if("+i+") { %>";}).replace(b.settings.noneencode,function(i,h){return d.__interpolate(h,false,e);}).replace(b.settings.interpolate,function(i,h){return d.__interpolate(h,true,e);}).replace(b.settings.inlinecomment,"").replace(b.settings.rangestart,function(k,j,l,i){var h="j"+g++;return"<% for(var "+h+"=0;"+h+"<"+(i-l)+";"+h+"++) {var "+j+"="+h+"; %>";});if(!e||e.errorhandling!==false){f+="<% try { %>"+f;f+='<% } catch(e) {__throw("Juicer Render Exception: "+e.message);} %>';}return f;};this.__toNative=function(f,e){return this.__convert(f,!e||e.strip);};this.__lexicalAnalyze=function(g){var f=[];var k="";var j=function(n,m){if(Array.prototype.indexOf&&n.indexOf===Array.prototype.indexOf){return n.indexOf(m);}for(var l=0;l<n.length;l++){if(n[l]===m){return l;}}return -1;};var e=function(l,i){i=i.match(/\w+/igm)[0];if(j(f,i)===-1){f.push(i);}};g.replace(b.settings.forstart,e).replace(b.settings.interpolate,e).replace(b.settings.ifstart,e);for(var h=0;h<f.length;h++){k+="var "+f[h]+"=_."+f[h]+";";}return"<% "+k+" %>";};this.__convert=function(f,g){var e=[].join("");e+="'use strict';";e+="var _=_||{};";e+="var _out='';_out+='";if(g!==false){e+=f.replace(/\\/g,"\\\\").replace(/[\r\t\n]/g," ").replace(/'(?=[^%]*%>)/g,"\t").split("'").join("\\'").split("\t").join("'").replace(/<%=(.+?)%>/g,"';_out+=$1;_out+='").split("<%").join("';").split("%>").join("_out+='")+"';return _out;";return e;}e+=f.replace(/\\/g,"\\\\").replace(/[\r]/g,"\\r").replace(/[\t]/g,"\\t").replace(/[\n]/g,"\\n").replace(/'(?=[^%]*%>)/g,"\t").split("'").join("\\'").split("\t").join("'").replace(/<%=(.+?)%>/g,"';_out+=$1;_out+='").split("<%").join("';").split("%>").join("_out+='")+"';return _out.replace(/[\\r\\n]\\s+[\\r\\n]/g, '\\r\\n');";return e;};this.parse=function(f,e){if(!e||e.loose!==false){f=this.__lexicalAnalyze(f)+f;}f=this.__removeShell(f,e);f=this.__toNative(f,e);this.render=new Function("_, _method",f);return this;};};b.compile=function(f,d){try{var g=this.__cache[f]?this.__cache[f]:new this.template().parse(f,d);if(!d||d.cache!==false){this.__cache[f]=g;}return g;}catch(h){a("Juicer Compile Exception: "+h.message);return{render:function(){}};}};b.to_html=function(e,f,d){return this.compile(e,d).render(f,d);};typeof(module)!=="undefined"&&module.exports?module.exports=b:this.juicer=b;})();