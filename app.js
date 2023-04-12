const express=require('express')
require('dotenv').config()
const productManager=require('./src/productManager')
const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/health',(_req,res)=>{
    res.status(200).json({
        success:true, 
        health:'up'
    })
})

app.get('/',async(_req,res)=>{

    try {
        const productos=await productManager.getProducts()
        res.status(200).json({
            success:true, 
            productos:productos
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }


})

app.get('/products',async(req,res)=>{
    try {
        const limit=req.query.limit
        const productos=await productManager.getProducts()
        if(!limit){
            return res.status(200).json({
                success:true,
                productos:productos
            })
        }
        const productosFiltrados=productos.slice(0,limit)
        res.status(200).json({
            success:true,
            productos:productosFiltrados
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }

})

app.get('/products/:pid',async(req,res)=>{
    try {
        const {pid}=req.params
        const productFound=await productManager.getProdById(parseInt(pid))
        if(!productFound){
            return res.status(200).json({
                success:false,
                message:'no se encontro el producto'
            })
        }
        res.status(200).json({
            success:true,
            producto:productFound
        })
    } catch (error) {
        
    }
})
module.exports=app