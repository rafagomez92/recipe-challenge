import { Resolver, Query, Mutation, Arg } from 'type-graphql'
import { User } from '../entity/User'
import { UserInput } from './inputs/UserInput'

@Resolver()
export class UserResolver {

    @Query(() => [User])
    users() {
        return User.find()
    }

    @Mutation(() => User)
    async signUp(
        @Arg("variables", () => UserInput) variables: UserInput
    ) {                  
        const user = User.create(variables)   
        user.recipes = []    
        // Encrypt password
        // user.hashPassword()
        return await user.save()                        
    }
}