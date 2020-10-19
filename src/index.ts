import "reflect-metadata"
import { connect } from './config/typeorm'
import { startServer } from './app'
import dotEnv from 'dotenv'

async function main() {
    dotEnv.config()
    connect()
    const app = await startServer()
    console.log(process.env.Port)
    const port = process.env.PORT || 3001
    app.listen(port)
    console.log('Server on PORT', port)
}

main()