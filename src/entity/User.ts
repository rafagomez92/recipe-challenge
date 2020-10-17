import { MinLength, IsNotEmpty, IsEmail} from 'class-validator';
// import * as bcrypt from 'bcryptjs';
import { Entity, Unique, Generated, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { ObjectType, Field, ID } from "type-graphql";

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
@ObjectType()
export class User extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()    
    id!: string
    
    @Field(() => String)
    @Column()
    @IsNotEmpty()
    name!: string
    
    @Field(() => String)
    @Column()
    @IsEmail()
    email!: string
    
    
    @Field(() => String)
    @Column()
    @MinLength(6)
    @IsNotEmpty()
    password!: string
    
    
    // @OneToMany(type => Recipe, recipe => recipe.user)
    // recipes!: Recipe[]
    
    // encrypt password
    // hashPassword(): void {
    //     const salt = bcrypt.genSaltSync(10);        
    //     this.password = bcrypt.hashSync(this.password, salt);
    // }
}