

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
	chat:{
		secret: "oIHFYrdTR98Y87tRou(r818y1)g663",
		limitPrevious: 50,
		port:5000
	},
    server:{
        port:3000
    }
}