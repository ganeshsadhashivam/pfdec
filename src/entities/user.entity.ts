import {
  Entity,
  Column,
  BeforeInsert,
  OneToMany,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import 'reflect-metadata';
import bcrypt from "bcryptjs";
import Model from "./model.entity";
import { Address } from "./address.entity";
import { Role } from "./role.entity";



@Entity("employees")
export class User extends Model {
  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => Role, (role) => role.users, { nullable: true })
  @JoinColumn({ name: "roleId" })
  role: Role;

  @Column({ nullable: true })
  employeeId: string; // Employee ID or unique identifier

  @Column({ type: "date", nullable: true })
  joiningDate: Date;
  @Column({ type: "date", nullable: true })
  relocationDate: Date;
  @Column({ nullable: true })
  relocationPlace:string
  @OneToOne(() => Address, (address) => address.user, {
    cascade: true,
    nullable: true,
  })
  @JoinColumn() // Specify the join column
  address: Address; // Should be a single Address

  @BeforeInsert()
  async hashPassword() {
    if (this.password) this.password = await bcrypt.hash(this.password, 12);
  }

  static async comparePasswords(
    candidatePassword: string,
    hashedPassword: string
  ) {
    // Ensure both candidatePassword and hashedPassword are not null or undefined
    if (!candidatePassword || !hashedPassword) {
      throw new Error("Invalid candidate or hashed password");
    }

    // Log or debug the values of candidatePassword and hashedPassword
    //console.log('Candidate Password:', candidatePassword);
    //console.log('Hashed Password:', hashedPassword);

    // Perform password comparison
    return await bcrypt.compare(candidatePassword, hashedPassword);
    //return await bcrypt.compare(candidatePassword, hashedPassword);
  }

  toJSON() {
    return { ...this, password: undefined, verified: undefined };
  }
}
