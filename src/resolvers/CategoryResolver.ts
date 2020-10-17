import { Query, Resolver, Mutation, Arg, Int } from 'type-graphql'
import { Category } from '../entity/Category'
import { CategoryInput } from './inputs/CategoryInput';

@Resolver()
export class CategoryResolver {
    @Query(() => [Category])
    getCategories() {
        return Category.find()
    }

    // Get category by Id
    // @Query(() => Category)
    // async getOneCategory(@Arg("id", type => Int) id: number){                
        //     return await Category.findOne(id)                                
        // }
        
    // Get category by Name
    @Query(() => Category)
    async getOneCategory(@Arg("name", type => String) name: string){                
        return await Category.findOne({where: {name}})                                
    }

    @Mutation(() => Category)
    async createCategory(
        @Arg('variables', () => CategoryInput) variables: CategoryInput
    ){
        const category = Category.create(variables);        
        return await category.save()
    }
    
}

