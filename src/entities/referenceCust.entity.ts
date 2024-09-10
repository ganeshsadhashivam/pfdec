import { Entity,  Column, ManyToOne } from 'typeorm';

import Model from './model.entity';
import { Customer } from './customer.entity';


@Entity('references')
export class Reference extends Model{
  

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'address', nullable: false })
  address: string;

  @Column({ name: 'contact_number', nullable: false })
  contactNumber: string;

  @ManyToOne(() => Customer, (customer) => customer.references)
  customer: Customer;
}
