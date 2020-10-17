import { Resolver, Query, Mutation, Arg } from 'type-graphql'
import { User } from '../entity/User';

@Resolver()
export class UserResolver {

    @Query(() => [User])
    users() {
        return User.find()
    }

    @Mutation(() => Boolean)
    async signUp(
        @Arg("name") name: string,
        @Arg("email") email: string,
        @Arg("password") password: string,
    ) {                        
        await User.insert({ name, email, password })        
        return true
    }
}