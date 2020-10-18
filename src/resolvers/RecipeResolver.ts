import { Query, Resolver, Mutation, Arg, Int, InputType, Field } from 'type-graphql';
import { Recipe } from '../entity/Recipe';
import { RecipeInput } from './inputs/RecipeInput';
import { UpdateRecipeInput } from './inputs/UpdateRecipeInput'

@Resolver()
export class RecipeResolver {

    @Query(() => [Recipe])
    getRecipes() {
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
        @Arg("name", () => String) name: string
    ) {                    
        return await Recipe.findOne({ where: { name }});
    }    

    @Mutation(() => Recipe)
    async createRecipe(
        @Arg('variables', () => RecipeInput) variables: RecipeInput,                
    ) {
        const recipe = Recipe.create(variables)
        return await recipe.save()
    }

    // Return a boolean for the udpate
    @Mutation(() => Boolean)
    async updateRecipe(
        @Arg("id", () => Int) id: number,
        @Arg("fields", () => UpdateRecipeInput) fields: UpdateRecipeInput        
    ) {
        // Find the recipe by id
        const recipe = await Recipe.findOne(id);        
        if(!recipe) {
            return false            
        }
        await Recipe.update({id}, fields)                
        return true
    }
    
    // Return a boolean for the udpate
    @Mutation(() => Boolean)
    async deleteRecipe(
        @Arg("id", () => Int) id: number,        
        ) {
            // Find the recipe by id
            const recipe = await Recipe.findOne(id);        
            if(!recipe) {
                return false            
            }
            await Recipe.delete(id)
            return true
        
    }

    
}