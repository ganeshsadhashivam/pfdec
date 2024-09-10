import { Entity, Column, ManyToOne, OneToOne, OneToMany } from 'typeorm';
import { Customer } from './customer.entity';
import Model from './model.entity';
import { User } from './user.entity';
import { Farmer } from './farmer.entity';
import { Branches } from './branches.entity'; // Import the renamed entity
import { OfficesData } from './offices.entity';

@Entity('addresses')
export class Address extends Model {
  @Column({ name: 'address1', nullable: false })
  address1: string;

  @Column({ name: 'address2', nullable: true })
  address2: string;

  @Column({ name: 'location', nullable: false })
  location: string;

  @Column({ name: 'city', nullable: false })
  city: string;

  @Column({ name: 'state', nullable: false })
  state: string;

  @Column({ name: 'pincode', nullable: false })
  pincode: string;

  @ManyToOne(() => Customer, (customer) => customer.customerAddress)
  customer: Customer;

  // One-to-One relationship with User
  @OneToOne(() => User, (user) => user.address, { onDelete: 'CASCADE' })
  user: User;

  // One-to-One relationship with Farmer
  @OneToOne(() => Farmer, (farmer) => farmer.address, { onDelete: 'CASCADE' })
  farmer: Farmer;

  // One-to-Many relationship with Branches
  @OneToMany(() => Branches, (branch) => branch.address, { cascade: true })
  branches: Branches[];

  // One-to-Many relationship with OfficesData
  @OneToMany(() => OfficesData, (officeData) => officeData.address, { cascade: true })
  officeData: OfficesData[];
}
