import { Entity, Unique, Generated, PrimaryGeneratedColumn, Column } from 'typeorm'
// import { Entity, 
// Column, 
// PrimaryGeneratedColumn, 
// Generated,
// OneToMany,
// Unique
// } from 'typeorm'


import { Recipe } from './Recipe'

@Entity()
@Unique(['email'])
export class User {

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