User Model
This document describes the User entity, a TypeORM model used in the NestJS backend application. The User entity represents a user in the PostgreSQL database and includes fields for basic user information.
Table of Contents

Entity Overview
Fields
Usage
Example

Entity Overview
The User entity is defined using TypeORM decorators and is used to interact with the users table in the PostgreSQL database. It leverages class-validator for input validation and class-transformer for data transformation.
File: src/users/entities/user.entity.ts
Fields
The User entity includes the following fields:

Field
Type
Description
Constraints

id
string
Unique identifier for the user.
Primary key, generated using nanoid.

email
string
User's email address.
Unique, not null, validated as email.

name
string
User's full name.
Not null, max length 100.

createdAt
Date
Timestamp when the user was created.
Auto-generated, not null.

updatedAt
Date
Timestamp when the user was last updated.
Auto-generated, not null.

Usage
The User entity is used with TypeORM's repository pattern in NestJS services to perform CRUD operations. It integrates with the @nestjs/typeorm module for database interactions.
Example Entity Code
import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
import { nanoid } from 'nanoid';

@Entity('users')
export class User {
@PrimaryColumn()
id: string = nanoid();

@Column({ unique: true })
@IsEmail()
@IsNotEmpty()
email: string;

@Column()
@IsNotEmpty()
@MaxLength(100)
name: string;

@CreateDateColumn()
createdAt: Date;

@UpdateDateColumn()
updatedAt: Date;
}

Integration in NestJS

Module Setup: Import the entity in a NestJS module (e.g., UsersModule).
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
imports: [TypeOrmModule.forFeature([User])],
// ... controllers, services
})
export class UsersModule {}

Service Usage: Use the repository in a service to perform database operations.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
constructor(
@InjectRepository(User)
private usersRepository: Repository<User>,
) {}

async create(email: string, name: string): Promise<User> {
const user = this.usersRepository.create({ email, name });
return this.usersRepository.save(user);
}

async findOne(id: string): Promise<User> {
return this.usersRepository.findOneBy({ id });
}
}

Example
Creating a User
