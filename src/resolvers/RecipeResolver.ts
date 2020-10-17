import { Query, Resolver, Mutation, Arg, Int } from 'type-graphql';
import { Recipe } from '../entity/Recipe';
import { RecipeInput } from './inputs/RecipeInput';


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
    async getOneRecipe(@Arg("name", type => String) name: string){                    
        return await Recipe.findOne({ where: { name }});
    }

    @Mutation(() => Recipe)
    async createRecipe(
        @Arg('variables', () => RecipeInput) variables: RecipeInput,                
    ) {
        const recipe = Recipe.create(variables)
        return await recipe.save()
    }

    
}