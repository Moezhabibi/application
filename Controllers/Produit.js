const Produit = require("../Models/Produit")
var cloudinary = require('cloudinary').v2;
require('dotenv').config()
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})
exports.AddProduit=async(req,res)=>{
    try {
        const savedImage = await cloudinary.uploader.upload(req.files.imageP.tempFilePath)
        const newProduit = new Produit({ ...req.body, imageP: { public_id: savedImage.public_id, imgUrl: savedImage.url } })

        const found = await Produit.findOne({name : req.body.name})

        if(found){
            return res.status(400).send('Product already exists')
        }
        await newProduit.save()
        res.status(200).send({Msg : 'Product Added',newProduit})
    } catch (error) {
        res.status(500).send({msg:error.message})
    }
}

exports.GetAllProduits=async(req,res)=>{
    try {
        const Produits = await Produit.find()
        res.status(200).send({Msg : "List of Produits ",Produits})
    } catch (error) {
        res.status(500).send('Could not find Produits')
    }
}



exports.deleteProduit = async (req,res)=>{
    try {
        const {id} = req.params

        await Produit.findByIdAndDelete(id)
        res.status(200).send({Msg : 'Product deleted'})
    } catch (error) {
        res.status(500).send('Could not delete Product')
    }
}

exports.UpdateProduit= async (req,res)=>{
    try {
        const {id} = req.params
        await Produit.findByIdAndUpdate(id,{$set : req.body})
        res.status(200).send({Msg : " Product Updated"})
    } catch (error) {
        res.status(500).send('Could not update Product')
    }
}

exports.ReadOneProduit=async(req,res)=>{
        try{
            const {id} = req.params
            
            const ProduitF = await Produit.findById(id)
        res.status(200).send({Msg:" Produit infomations",ProduitF})
        }catch(error){
            res.status(500).send('Could not find Produit')
        }
        }