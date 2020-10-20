import { ObjectType, Field, ID } from "type-graphql";
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, Unique, ManyToOne, JoinColumn } from 'typeorm'
import { Category } from './Category'
import { User } from './User'

@Entity()
@Unique(['name'])
@ObjectType()
export class Recipe extends BaseEntity{

    @Field(() => ID)
    @PrimaryGeneratedColumn()    
    id!: number

    @Field(() => String)
    @Column()
    name!: string
    
    @Field(() => String)
    @Column()
    description!: string

    @Field(() => String)
    @Column()
    ingredients!: string

    // A Recipe can have only one user and category
    @ManyToOne(type => Category, category => category.recipes, { nullable: false , onDelete: "CASCADE" })    
    @JoinColumn({ name: "categoryId"})
    category!: Promise<Category>
    
    // The user can have many recipes
    @ManyToOne(type => User, user => user.recipes, { nullable: false , onDelete: "CASCADE" })
    @JoinColumn({ name: "userId"})
    user!: Promise<User>
}