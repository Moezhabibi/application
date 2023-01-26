const mongoose = require('mongoose')
const ProduitSchema = new mongoose.Schema(
    {
        name :{
            required : true,
            type : String
        },
        price :{
            required : true,
            type : Number
        },
        
        reference :{
            required : true,
            type : String
        },
        rate :{
            required : true,
            type : Number
        },
        imageP :{
            required : true,
            type :  mongoose.Schema.Types.Mixed
        },
        description :{
            required : true,
            type :String
        }
        

        
    }
)

module.exports = mongoose.model('Produit',ProduitSchema)