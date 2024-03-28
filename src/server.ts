import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()
import router from './routes/router'

const app = express()
const port = process.env.API_PORT

app.use(cors({origin: '*'}))
app.use(express.json())

app.use(router)

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`))