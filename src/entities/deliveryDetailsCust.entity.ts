import { Entity,  Column, ManyToOne, JoinColumn } from 'typeorm';
import Model from './model.entity';
import { Address } from './address.entity';
import { Customer } from './customer.entity';

@Entity('delivery_details')
export class DeliveryDetails extends Model{
  

  @ManyToOne(() => Address, { cascade: true, nullable: false })
  @JoinColumn()
  deliveryAddress: Address;

  @Column({ name: 'delivery_time', nullable: true })
  deliveryTime: string;

  @Column({ name: 'receiving_person_name', nullable: false })
  receivingPersonName: string;

  @Column({ name: 'receiving_person_mobile_no', nullable: false })
  receivingPersonMobileNo: string;

  @Column({ name: 'receiving_person_alternate_no', nullable: true })
  receivingPersonAlternateNo: string;

  @Column({ name: 'email_primary', nullable: false })
  emailPrimary: string;

  @Column({ name: 'email_secondary', nullable: true })
  emailSecondary: string;

  @ManyToOne(() => Customer, (customer) => customer.deliveryDetails)
  customer: Customer;
}
