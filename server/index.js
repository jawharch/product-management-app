
const express = require('express')
const { connectDB } = require('./db')
const http = require('http')
require('dotenv').config()
const productRoutes = require('./routes/product.route')
const authRoutes = require('./routes/auth.route');
const app = express()
const PORT = process.env.PORT || 3000
const cors=require('cors')
const server = http.createServer(app)
const socketIo = require('socket.io')
const io = socketIo(server)
const corsOptions ={
    origin:'*', 
    credentials:true,            
    optionSuccessStatus:200
}

app.use(cors(corsOptions))
app.use(express.json())
app.use('/api', productRoutes)
app.use('/api/auth', authRoutes)


app.use(express.static('public'))
io.on('connection', (socket) => {
  console.log('a user connected')


  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})


async function startServer() {
  try {
    connectDB()
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`)
    });
  } catch (error) {
    console.error("Failed to start server:", error)
  }
}

startServer()
