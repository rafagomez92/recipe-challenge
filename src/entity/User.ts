import { Entity, Unique, Generated, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm'
// import { Entity, 
// Column, 
// PrimaryGeneratedColumn, 
// Generated,
// OneToMany,
// Unique
// } from 'typeorm'


// import { Recipe } from './Recipe'

@Entity()
@Unique(['email'])
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    @Generated('uuid')
    id!: string
    
    @Column()
    name!: string
    
    @Column()
    email!: string
    
    @Column()
    password!: string

    // @OneToMany(type => Recipe, recipe => recipe.user)
    // recipes!: Recipe[]
}