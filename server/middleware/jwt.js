import { auth } from 'express-oauth2-jwt-bearer'
import dotenv from 'dotenv'

dotenv.config()

const jwtCheck = auth({
    audience: process.env.API_URL,
    issuerBaseURL: "https://dev-73ttkwevqicjzbxp.us.auth0.com/",
    tokenSigningAlg: "RS256"
})

export default jwtCheck;