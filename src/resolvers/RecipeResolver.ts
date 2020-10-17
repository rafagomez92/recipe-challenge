import { Query, Resolver, Mutation, Arg } from 'type-graphql';
import { Recipe } from '../entity/Recipe';


@Resolver()
export class RecipeResolver {

    @Query(() => [Recipe])
    getRecipes() {
        return Recipe.find();
    }

    @Mutation(() => Boolean)
    async createRecipe(
        @Arg('name') name: string,
        @Arg('description') description: string,
        @Arg('ingredients') ingredients: string
    ) {
        await Recipe.insert({ name, description, ingredients })
        return true
    }
    
}