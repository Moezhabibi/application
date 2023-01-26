const bcrypt = require ('bcrypt')
var jwt = require('jsonwebtoken')
const express = require('express')
const User = require('../Models/User')

exports.signUp = async(req,res)=>{
    
    try {
        console.log(req)
        const {email,password} = req.body
        const Found = await User.findOne ({email})
        if (Found){
            return res.status(400).send({errors : [{Msg : 'Email already exists'}]})
        }
   

        const newUser = new User(req.body)

        const salt = 10
        const hashedPassword = bcrypt.hashSync(password,salt );
        newUser.password = hashedPassword

        await newUser.save()


        const payload = {id : newUser._id}
            var token = jwt.sign(payload, process.env.privatekey)
            res.status(200).send({msg : 'logged In',newUser,token})
    
    } catch (error) {
        res.status(500).send({errors : [{msg:'could not register'}]})
    }
}

exports.signIn = async(req,res)=>{
    try {
        const {email,password} = req.body
        const Found = await User.findOne ({email})
        if (!Found){
            return res.status(400).send({errors : [{Msg : 'email not exists'}]})
        }
        const decoded = bcrypt.compareSync(password, Found.password)
        if (!decoded){
            return res.status(400).send({errors : [{Msg : "les coodonnes in valid"}]})
        }
        const payload = {id : Found._id}
            var token = jwt.sign(payload, process.env.privatekey)
            res.status(200).send({msg : 'logged In',Found,token})
    
    } catch (error) {
        res.status(500).send({errors : [{msg:'could not register'}]})
    
    }
    }

    exports.ReadAllUsers=async(req,res)=>{
        try {
            const Users = await User.find()
            res.status(200).send({Msg : "List of Users ",Users})
        } catch (error) {
            res.status(500).send('Could not find Users')
        }
    }

    

    exports.ReadOneUser=async(req,res)=>{
        try{
            const {id} = req.params
            const OneUser = await User.findById(id)
        res.status(200).send({Msg:"User infomations",OneUser})
        }catch(error){
            res.send(500).send('Could not find User')
        }
        }

    exports.UpdateUser = async (req,res)=>{
        try {
            const {id} = req.params
            await User.findByIdAndUpdate(id,{$set : req.body})
            res.status(200).send({Msg : " User Updated"})
        } catch (error) {
            res.status(500).send('Could not update User')
        }
    }

    exports.deleteUser = async (req,res)=>{
        try {
            const {id} = req.params
    
            await User.findByIdAndDelete(id)
            res.status(200).send({Msg : 'User deleted'})
        } catch (error) {
            res.status(500).send('Could not delete User')
        }
    }
