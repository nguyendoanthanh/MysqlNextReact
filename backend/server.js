
import session from 'express-session'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken' // logout
// const express = require('express')

import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

// const mysql = require('mysql')
// const cors = require('cors')

const app = express()

// app.use(cors())

    app.use(cors({
        origin: ['http://localhost:3000'],
        methods: ['POST','GET'],
        credentials: true
    }))
app.use(express.json()) 
app.use(cookieParser())
 
app.use(bodyParser.json())  
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie:{
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}))

const db  = mysql.createConnection({
    host:'localhost',
    user:"root",
    password:'',
    database:'crud'
})

const verifyUser = (req,res,next)=>{
    const token = req.cookies.token
    if(!token){
        return res.json('token wrong')
    }
    else{
        jwt.verify(token, 'our-jsonwebtoken-secret-key',(err,decoded)=>{
            if(err){
                return res.json('error')
            }
            else{
                req.name = decoded.name
                next()
            }
        })
    }
}

app.get('/',verifyUser,(req,res)=>{
    return res.json({Status: "Success",name: req.name})
})

app.get('/',(req,res)=>{
    if(req.session.name){
        return res.json({valid: true, name: req.session.name})
    }
    else
    {
        return res.json({valid: false})
    }
})

app.post('/crud',(req,res)=>{
    const sql = 'INSERT INTO users(`name`,`email`,`password`) Values(?)'
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ]
    db.query(sql,[values],(err,data)=>{
        if(err){
            return res.json('error')
        }
        return res.json(data)
    })
})

app.post('/users',(req,res)=>{
    const sql = "SELECT * FROM users WHERE `email` = ? AND `password` = ?"
    // const values = [
    //     req.body.name,
    //     req.body.email,
    //     req.body.password
    // ]
    db.query(sql,[req.body.email, req.body.password], (err,data)=>{
        if(err) {
            return res.json(err)
        }
        if(data.length > 0){
            // req.session.name = data[0].name; // lưu session
            const name = data[0].name

            const token = jwt.sign({name},'our-jsonwebtoken-secret-key',{expiresIn : '5s'})  
            res.cookie('token',token) 
            // logout
            return res.json({Status : "Success"})
        }
        else{
            return res.json("Faile")
        }
    })
})

app.get('/logout',(req,res)=>{
    res.clearCookie('token')
    return res.json({Status:'Success'})
})


app.listen(8081,()=>{
    console.log('listening...')
})