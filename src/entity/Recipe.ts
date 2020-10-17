import { Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    Generated,            
    ManyToOne
} from 'typeorm'
import { Category } from './Category'
import { User } from './User'

@Entity()
export class Recipe {
    // poner el decorador Generated("uuid");
    @PrimaryGeneratedColumn()
    @Generated('uuid')
    id!: string

    @Column()
    name!: string
    
    @Column()
    description!: string

    @Column("simple-array")
    ingredients!: string[]

    // A Recipe can have only one user and category
    @ManyToOne(type => Category, category => category.recipes)    
    category!: Category
    
    
    @ManyToOne(type => User, user => user.recipes)
    user!: User
}