import { Field, InputType } from "type-graphql";


@InputType()
export class UpdateRecipeInput {
    @Field(() => String, {nullable: true})
    name?: string;
    
    @Field(() => String, {nullable: true})
    description?: string;
    
    @Field(() => String, {nullable: true})
    ingredients?: string;

}