import { Entity, Column, ManyToOne, JoinColumn, EntityManager } from 'typeorm';

import Model from './model.entity';
import { Address } from './address.entity';
import { Customer } from './customer.entity';

@Entity('Customer_billing_details')

export class BillingDetailsCust extends Model{
  

  @ManyToOne(() => Address, { cascade: true, nullable: false })
  @JoinColumn()
  billingAddress: Address;

  @Column({ name: 'billing_name', nullable: false })
  billingName: string;

  @Column({ name: 'contact_person_name', nullable: false })
  contactPersonName: string;
  @Column({ name: 'commonly_known_as', nullable: true })
  commonlyKnownAs: string;
  @Column({ name: 'primary_contact_number', nullable: false })
  primaryContactNumber: string;
  @Column({ name: 'billing_format', nullable: true })
  billingFormat: string;

  @Column({ name: 'address_proof', nullable: true })
  addressProof: string;
  @Column({ name: 'secondary_contact_number', nullable: true })
  secondaryContactNumber: string;

  @Column({ name: 'email_primary', nullable: false })
  emailPrimary: string;

  @Column({ name: 'email_secondary', nullable: true })
  emailSecondary: string;

  @ManyToOne(() => Customer, (customer) => customer.billingDetails)
  customer: Customer;
}
