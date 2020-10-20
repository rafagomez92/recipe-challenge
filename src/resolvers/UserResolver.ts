import { Resolver, Query, Mutation, Arg, Int, Ctx } from 'type-graphql'
import { User } from '../entity/User'
import { UserInput } from './inputs/UserInput'
import * as bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Recipe } from '../entity/Recipe'
import { decodedToken } from '../util/check_auth'




@Resolver()
export class UserResolver {

    @Query(() => [User])
    async users(@Ctx() ctx) {   
        const auth = decodedToken(ctx)
        return await User.find()
    }
    
    @Query(() => User)
    userById(
        @Arg("id", () => Int) id: number
    ) {        
        return User.find()
    }

    @Query(() => [Recipe])
    async getMyRecipes(
        @Arg("id", () => Int) id: number,
        @Ctx() ctx
    ) {          
        const auth = decodedToken(ctx)      
        const user = await User.findOneOrFail({ id })
        const recipes = await user.recipes        
        return recipes;
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

    @Mutation(() => String)
    async login(
        @Arg("email", () => String) email: string,
        @Arg("password", () => String) password: string
    ) {
        let user : User
        user = await User.findOneOrFail({ email: email }) 
        console.log(user)
        if(!user) {
            console.log("User not found")            
        }
                       
        const isPasswordValid = bcrypt.compare(user.password, password)

        if(!isPasswordValid) {
            console.log("Incorrect password")            
        }

        const secret = process.env.SECRET_KEY || 'mysecretkey'
        const token = jwt.sign({ emai: user.email }, secret, {expiresIn: '1d'})
        
        return token;
    }
}