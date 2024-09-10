import { Entity,  Column, ManyToOne } from 'typeorm';

import Model from './model.entity';
import { Customer } from './customer.entity';

@Entity('payment_terms')
export class PaymentTerms extends Model {
  

  @Column({ name: 'payment_mode', nullable: false })
  paymentMode: string;

  @Column({ name: 'margin_deposit', nullable: true })
  marginDeposit: string;

  @Column({ name: 'security_deposit_details', nullable: true })
  securityDepositDetails: string;

  @Column({ name: 'initial_exposure_limit', nullable: true })
  initialExposureLimit: string;

  @ManyToOne(() => Customer, (customer) => customer.paymentTerms)
  customer: Customer;
}
