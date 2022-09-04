import fs from 'fs'
import parser from 'body-parser'
import jsonServer from 'json-server'
import jwt from 'jsonwebtoken'
import express from 'express'
import cors from 'cors'

const SECRET = '123'

const app = express()

const createToken = (payload) => jwt.sign(payload, SECRET, { expiresIn: '1h' })
const verifyToken = (token) => jwt.verifyToken(token, SECRET, (err, decode) => decode ? decode : err)
const unauthorized = (username, password) => username !== "test" || password !== "123"

app.use(parser.json())
app.use(cors({origin: '*'}))

app.get("/status", (_, res) => res.status(200).json({ status: "OK" }))

app.get("/login", (req, res) => {
   const encoded = req.headers.authorization.split(' ')[1]
   const decoded = Buffer.from(encoded, 'base64').toString()
   const [username, password] = decoded.split(":")

   res.setHeader('Access-Control-Allow-Origin', '*')
   res.setHeader('Access-Control-Allow-Credentials', true)

   if (unauthorized(username, password)) 
      return res.status(401).json(401, "not authenticate")

   const access_token = createToken({username, password})

   return res.status(200).json({access_token}) 
})


app.listen(4000, () => console.log("JWT test server - running at http://localhost:4000"))
