import { Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    BaseEntity, 
    Unique    
    // OneToMany 
} from 'typeorm'
// import { Recipe } from './Recipe';
import { ObjectType, ID, Field } from 'type-graphql';
@Entity()
@Unique(['name'])
@ObjectType()
export class Category extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()    
    id!: string

    @Field(() => String)
    @Column()
    name!: string

    // @OneToMany(type => Recipe, recipe => recipe.category)
    // recipes!: Recipe[]
    
}