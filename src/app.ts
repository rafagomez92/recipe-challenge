import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'

import { UserResolver } from './resolvers/UserResolver'
import { RecipeResolver } from './resolvers/RecipeResolver';
import { CategoryResolver } from './resolvers/CategoryResolver';



export async function startServer() {

    // Initialization of express
    const app = express();
    
    // Creation of the apollo server
    const server = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver, RecipeResolver, CategoryResolver],
            validate: false
        }),
        context: ({ req, res }) => ({ req, res })
    })
    
    // Definition of the path 
    server.applyMiddleware({ app, path:'/graphql' })

    return app;
}


