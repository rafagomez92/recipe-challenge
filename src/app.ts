import express from 'express'
// Apollo server for create the endpoint of graphql
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'

import { UserResolver } from './resolvers/UserResolver'
import { RecipeResolver } from './resolvers/RecipeResolver';
import { CategoryResolver } from './resolvers/CategoryResolver';


export async function startServer() {

    const app = express();
    
    const server = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver, RecipeResolver, CategoryResolver]
        }),
        context: ({ req, res }) => ({ req, res })
    })
    
    server.applyMiddleware({ app, path:'/graphql' })

    return app;
}


