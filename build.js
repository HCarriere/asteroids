var fs = require('fs');
var UglifyJS = require("uglify-js");
var config = require("./config")



function main(buildInfo){
	//process.argv[2] //--> argument
	var prodDestination = buildInfo.prodRootFolder+buildInfo.destination+buildInfo.version+".js";
	
	var code = minify(buildInfo.devSourceMap,buildInfo.devRootFolder);
	
	writeFile(code,prodDestination);
}

function minify(map , rootFolder){
	
	for(var i = 0; i<map.length; i++){
		map[i] = rootFolder + map[i];
	}
	console.log("minifying "+map);
	var result = UglifyJS.minify(map);
	return result.code;
	console.log("done");
}

function writeFile(code,destination){
	console.log("writing file at "+ destination);
	fs.writeFile(destination, code, function(err) {
		if(err) {
			return console.log(err);
		}
		console.log("file saved.");
	}); 
}

//execution

main(config.gameBuildInfo);
