

module.exports = {
    database: {
       // name: "mongodb://root:<t2...>@ds029575.mlab.com:29575/pire-to-pire",
        
        defaultAddress:{
            prefix:"mongodb",
            name:"localhost",
            database:"asteroids"
        },
		//name:"mongodb://localhost/pire-to-pire",
        collections : {
            
        },
		verbose:false,
		mongooseDebug:false
    },
    session:{
        secret: "hu_H9_h98ho_HGD"
    },
	socket:{
		port:5546,
        verbose:true
	},
    server:{
        port:3000
    },
	gameBuildInfo : {
		devSourceMap:[
			"/asteroids.js",
            "/utils/socketEvents.js",
            "/view/screenBuild.js",
            "/view/ui-elements.js"
		],
		version : "dev",
		destination : "/asteroids.mini.",
		devRootFolder : "asteroidsGameDev",
        prodRootFolder : "asteroidsGameProd"
	},
    envVariables : [
        {
            name:"PRODUCTION",
            value:process.env.PRODUCTION //TODO test, might not work
        }
    ]
}