const express = require('express')
const ConnectDB = require('./Config/ConnectDB')
const ProduitRouter = require('./Routes/Produit')
const UserRouter = require('./Routes/User')
const fileUpload = require('express-fileupload')

require('dotenv').config()
const app = express()

ConnectDB()

app.use(fileUpload({
    useTempFiles: true,
}));





app.use (express.json())

app.use ('/api/auth',UserRouter)

app.use ('/api/produit',ProduitRouter)






app.listen(process.env.port,console.log(`Server is running on the port ${process.env.port}`))