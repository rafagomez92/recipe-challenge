import "reflect-metadata"
import { connect } from './config/typeorm'
import { startServer } from './app'
import dotEnv from 'dotenv'

async function main() {
    // Set env variables
    dotEnv.config()

    // connection database
    connect()

    // Start server
    const app = await startServer()    
    const port = process.env.PORT || 3001
    app.listen(port)
    console.log('Server on PORT: ', port)
}

main()