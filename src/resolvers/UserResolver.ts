import { Resolver, Query, Mutation, Arg } from 'type-graphql'
import { User } from '../entity/User';
@Resolver()
export class UserResolver {

    @Query(() =>  String)
    ping() {
        return "Pong!"
    }

    @Mutation(() => Boolean)
    async createUser(
        @Arg("name") name: string,
        @Arg("email") email: string,
        @Arg("password") password: string,
    ) {
        await User.insert({ name, email, password })
        return true
    }
}