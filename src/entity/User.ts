// bcryptjs is for encrypt the password
import * as bcrypt from 'bcryptjs';
import { Entity, Unique, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { ObjectType, Field, ID, Int } from "type-graphql";
import { Recipe } from './Recipe'

@Entity()
@Unique(['email'])
@ObjectType()
export class User extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()    
    id!: number
    
    @Field(() => String)
    @Column()
    name!: string
    
    @Field(() => String)
    @Column()    
    email!: string
    
    
    @Field(() => String)
    @Column()        
    password!: string
    
    
    @OneToMany(type => Recipe, recipe => recipe.user)
    recipes!: Promise<Recipe[]>
    
    // encrypt password
    // hashPassword(): void {
    //     const salt = bcrypt.genSaltSync(10);        
    //     this.password = bcrypt.hashSync(this.password, salt);
    // }

    // For authentication 
    checkPassword(password: string ): boolean {
        return bcrypt.compareSync(password, this.password);
    }

}