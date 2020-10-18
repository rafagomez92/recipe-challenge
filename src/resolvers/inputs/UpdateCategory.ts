import { Field, InputType } from "type-graphql";


@InputType()
export class UpdateCategoryInput {
    @Field(() => String, {nullable: true})
    name?: string;        
}