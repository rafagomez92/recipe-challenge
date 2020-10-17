import { Field, InputType } from 'type-graphql'

@InputType()
export class RecipeInput {
    @Field(() => String)
    name!: string 
    @Field(() => String)
    description!: string
    @Field(() => String)
    ingredients!: string
}

