const  express = require('express')
const userRouter = require('./routes/user.routes')

const PORT = process.env.PORT || 8080

const app = express()

// app.get('/', (req, res) => {res.send('Oks')})

app.use(express.json())

app.use('/api/userWork', userRouter)


app.listen(PORT,() => console.log(`server start on ${PORT}`))