import { ObjectType, Field, ID } from "type-graphql";
import { Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    Generated,        
    BaseEntity,
    Unique    
    // ManyToOne
} from 'typeorm'
// import { Category } from './Category'
// import { User } from './User'

@Entity()
@Unique(['name'])
@ObjectType()
export class Recipe extends BaseEntity{
    // poner el decorador Generated("uuid");
    @Field(() => ID)
    @PrimaryGeneratedColumn()    
    id!: string

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
    // @ManyToOne(type => Category, category => category.recipes)    
    // category!: Category
    
    
    // @ManyToOne(type => User, user => user.recipes)
    // user!: User
}