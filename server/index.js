import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import {connectDatabase} from './db/db.js'
import { userRoute } from './routes/user.js'
import { residencyRoute } from './routes/residency.js'

dotenv.config()

const app = express()

app.use(cors());
app.use(express.json())
app.use(cookieParser())

connectDatabase()

app.use('/api/user', userRoute)
app.use('/api/residency', residencyRoute)

const port = process.env.PORT || 8000

app.listen(port,() => {
    console.log('server listening on port ' + port);
})

