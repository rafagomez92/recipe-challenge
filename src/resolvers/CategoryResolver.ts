import { Query, Resolver, Mutation, Arg, Int, Ctx } from 'type-graphql'
import { Category } from '../entity/Category'
import { CategoryInput } from './inputs/CategoryInput';
import { UpdateCategoryInput } from './inputs/UpdateCategory';
import { decodedToken } from '../util/check_auth'

@Resolver()
export class CategoryResolver {
    
    @Query(() => [Category])
    getCategories(@Ctx() ctx) {
        const auth = decodedToken(ctx)
        return Category.find()
    }

    // Get category by Id
    // @Query(() => Category)
    // async getOneCategory(@Arg("id", type => Int) id: number){                
        //     return await Category.findOne(id)                                
        // }
        
    // Get category by Name
    @Query(() => Category)
    async getOneCategory(
        @Arg("name", type => String) name: string,
        @Ctx() ctx
    ){                
        const auth = decodedToken(ctx)
        return await Category.findOne({where: {name}})                                
    }

    @Mutation(() => Category)
    async createCategory(
        @Arg('variables', () => CategoryInput) variables: CategoryInput,
        @Ctx() ctx
    ){
        const auth = decodedToken(ctx)
        const category = Category.create(variables);        
        return await category.save()
    }

    @Mutation(() => Boolean)
    async updateCategory(
        @Arg("id", () => Int) id: number,
        @Arg("fields", () => UpdateCategoryInput) fields: UpdateCategoryInput,
        @Ctx() ctx
    ) {
        const auth = decodedToken(ctx)
        // Find category by id and return false if don't exist
        const category = await Category.findOne(id)
        if(!category) {
            return false
        }
        await Category.update({id}, fields)
        return true
    }

    @Mutation(() => Boolean)
    async deleteCategory(
        @Arg("id", () => Int) id: number,
        @Ctx() ctx
    ) {
        const auth = decodedToken(ctx)
        // Find category by id and return false if don't exist
        const category = await Category.findOne(id)
        if(!category) {
            return false
        }
        await Category.delete(id)
        return true
    }
    
}

