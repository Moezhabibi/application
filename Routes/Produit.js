const express = require('express')
const ProduitRouter = express.Router()
const {AddProduit , GetAllProduits ,  deleteProduit , UpdateProduit , ReadOneProduit} = require('../Controllers/Produit')


ProduitRouter.post ('/AddProduit',AddProduit)

ProduitRouter.get ('/GetAllProduits',GetAllProduits)

ProduitRouter.delete ('/deleteProduit/:id',deleteProduit)

ProduitRouter.put ('/UpdateProduit/:id',UpdateProduit)

ProduitRouter.get ('/ReadOneProduit/:id',ReadOneProduit)

module.exports = ProduitRouter



