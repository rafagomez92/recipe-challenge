import { Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    Generated, 
    // OneToMany 
} from 'typeorm'
// import { Recipe } from './Recipe';

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    @Generated('uuid')
    id!: string

    @Column()
    name!: string

    // @OneToMany(type => Recipe, recipe => recipe.category)
    // recipes!: Recipe[]
    
}