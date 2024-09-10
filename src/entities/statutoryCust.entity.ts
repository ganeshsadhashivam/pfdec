import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import Model from './model.entity';
import { Customer } from './customer.entity';


@Entity('statutory_details')
export class StatutoryDetails extends Model {
  

  @Column({ name: 'pan_number', nullable: false })
  panNumber: string;

  @Column({ name: 'aadhar_number', nullable: true })
  aadharNumber: string;

  @Column({ name: 'gst_registration_number', nullable: true })
  gstRegistrationNumber: string;

  @Column({ name: 'corporate_registration_details', nullable: true })
  corporateRegistrationDetails: string;

  @Column({ name: 'other_certifications', nullable: true })
  otherCertifications: string;

  @ManyToOne(() => Customer, (customer) => customer.statutoryDetails)
  customer: Customer;
}
