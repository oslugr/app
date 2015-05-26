#!/usr/bin/env node
 
// Reemplaza la cadena de la web a la del app
// Sacado de aquí: http://devgirl.org/2013/11/12/three-hooks-your-cordovaphonegap-project-needs/

var fs = require('fs');
var path = require('path');
 
var rootdir = process.argv[2];
 
function replace_string_in_file(filename, to_replace, replace_with) {
    var data = fs.readFileSync(filename, 'utf8');
    var result = data.replace(new RegExp(to_replace, "g"), replace_with);
    fs.writeFileSync(filename, result, 'utf8');
}
 
var target = "stage";
if (process.env.TARGET) {
    target = process.env.TARGET;
}
 
if (rootdir) {
    var ourconfigfile = path.join(rootdir, "config", "project.json");
    var configobj = JSON.parse(fs.readFileSync(ourconfigfile, 'utf8'));
 
    // CONFIGURE HERE
    // with the names of the files that contain tokens you want 
    // replaced.  Replace files that have been copied via the prepare step.
    var filestoreplace = [
        // android
        "www/index.html",
    ];
    filestoreplace.forEach(function(val, index, array) {
        var fullfilename = path.join(rootdir, val);
        if (fs.existsSync(fullfilename)) {
            // CONFIGURE HERE
            // with the names of the token values. For example, 
            // below we are looking for the token 
            // /*REP*/ 'api.example.com' /*REP*/ and will replace 
            // that token
            replace_string_in_file(fullfilename, 
                "resultados.jsonp", 
                "https://raw.githubusercontent.com/elecciones-ugr/elecciones-ugr.github.io/master/resultados.jsonp" );
            // ... any other configuration options
        } else {
            //console.log("missing: "+fullfilename);
        }
    });
 
}