import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, Unique } from 'typeorm'
import { ObjectType, ID, Field } from 'type-graphql';
// import { Recipe } from './Recipe';

@Entity()
@Unique(['name'])
@ObjectType()
export class Category extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()    
    id!: number

    @Field(() => String)
    @Column()
    name!: string

    // @OneToMany(type => Recipe, recipe => recipe.category)
    // recipes!: Recipe[]
    
}