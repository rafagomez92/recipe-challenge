import { Query, Resolver, Mutation, Arg, Int, InputType, Field, Ctx } from 'type-graphql';
import { Category } from '../entity/Category';
import { Recipe } from '../entity/Recipe';
import { User } from '../entity/User';
import { RecipeInput } from './inputs/RecipeInput';
import { UpdateRecipeInput } from './inputs/UpdateRecipeInput'
import { decodedToken } from '../util/check_auth'

@Resolver()
export class RecipeResolver {

    // Get all recipes 
    @Query(() => [Recipe])
    getRecipes(@Ctx() ctx) {
        const auth = decodedToken(ctx)
        return Recipe.find();
    }
    
    // Get recipe by ID
    // @Query(() => Recipe)
    // async getOneRecipe(@Arg("id", type => Int) id: number){                    
    //     return await Recipe.findOne(id);
    // }
    
    // Get recipe by name
    @Query(() => Recipe)
    async getOneRecipe(
        @Arg("name", () => String) name: string,
        @Ctx() ctx
    ) {  
        const auth = decodedToken(ctx)                  
        return await Recipe.find({ where: { name }});
    }    

    @Mutation(() => Recipe)
    async createRecipe(
        @Arg('variables', () => RecipeInput) variables: RecipeInput,                
        @Arg('userId', () => Int) userId: number,
        @Arg('categoryId', () => Int) categoryId: number,
        @Ctx() ctx
    ) {
        const auth = decodedToken(ctx)
        const recipe = Recipe.create(variables)
        const addUser = await User.findOneOrFail(userId)        
        const addCategory = await Category.findOneOrFail(categoryId)
        // Using lazy relations for save userId and categoryId like foreing key
        recipe.user = Promise.resolve(addUser)
        recipe.category = Promise.resolve(addCategory)
        return await recipe.save()
    }

    // Mutation for update recipe, return a boolean for the udpate
    @Mutation(() => Boolean)
    async updateRecipe(
        @Arg("id", () => Int) id: number,
        @Arg("fields", () => UpdateRecipeInput) fields: UpdateRecipeInput,
        @Ctx() ctx
    ) {
        const auth = decodedToken(ctx)
        // Find the recipe by id
        const recipe = await Recipe.findOne(id);        
        if(!recipe) {
            return false            
        }
        await Recipe.update({id}, fields)                
        return true
    }
    
    // Mutation for delte recipe, return a boolean
    @Mutation(() => Boolean)
    async deleteRecipe(
        @Arg("id", () => Int) id: number,
        @Ctx() ctx        
        ) {
            const auth = decodedToken(ctx)
            // Find the recipe by id
            const recipe = await Recipe.findOne(id);        
            if(!recipe) {
                return false            
            }
            await Recipe.delete(id)
            return true
        
    }

    
}