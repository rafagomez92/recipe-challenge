import express from 'express'
// Apollo server for create the endpoint of graphql
import { ApolloServer } from 'apollo-server-express'
import { RecipeResolver } from './resolvers/RecipeResolver'
import { buildSchema } from 'type-graphql'


export async function startServer() {

    const app = express();
    
    const server = new ApolloServer({
        schema: await buildSchema({
            resolvers: [RecipeResolver]
        }),
        context: ({ req, res }) => ({ req, res })
    })
    
    server.applyMiddleware({ app, path:'/graphql' })

    return app;
}


