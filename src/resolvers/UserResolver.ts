import { Resolver, Query, Mutation, Arg } from 'type-graphql'

@Resolver()
export class UserResolver {
    @Mutation()
    createUser(
        @Arg("name") name: string,
        @Arg("email") email: string,
        @Arg("password") password: string,
    ) {
        console.log(name, email, password)
        return true
    }
}