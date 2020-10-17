import { Query, Resolver, Mutation, Arg } from 'type-graphql'
import { Category } from '../entity/Category'

@Resolver()
export class CategoryResolver {
    @Query(() => [Category])
    getCategories() {
        return Category.find()
    }

    @Mutation(() => Boolean)
    async createCategory(
        @Arg('name') name: string
    ){
        await Category.insert({ name });
        return true
    }
    
}

