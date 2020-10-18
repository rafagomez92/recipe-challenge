import { Resolver, Query, Mutation, Arg } from 'type-graphql'
import { User } from '../entity/User'
import { UserInput } from './inputs/UserInput'
import * as bcrypt from 'bcryptjs';

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
        // Encrypt password
        // user.hashPassword()
        return await user.save()                        
    }

    @Mutation(() => Boolean)
    async login(
        @Arg("email", () => String) email: string,
        @Arg("password", () => String) password: string
    ) {
        let user : User
        user = await User.findOneOrFail({ email: email }) 
        console.log(user)
        if(!user) {
            console.log("User not found")
            return false
        }
                       
        const isPasswordValid = bcrypt.compare(user.password, password)

        if(!isPasswordValid) {
            console.log("Incorrect password")
            return false
        }

        return true;
    }
}