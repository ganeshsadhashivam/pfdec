import { Entity, Column, ManyToOne, OneToOne } from 'typeorm';
import Model from './model.entity';
import { Customer } from './customer.entity';

@Entity('office_use_only')
export class OfficeUseOnly extends Model {
  @Column({ name: 'proposer_bd_name', nullable: true })
  proposerBDName: string;

  @Column({ name: 'recommended_by', nullable: true })
  recommendedBy: string;

  @Column({ name: 'approved_by', nullable: true })
  approvedBy: string;

  @Column({ name: 'relationship_manager', nullable: true })
  relationshipManager: string;

  @Column({ name: 'customer_verification_completed', nullable: true })
  customerVerificationCompleted: boolean;

  @Column({ name: 'verification_agency', nullable: true })
  verificationAgency: string;

  @Column({ name: 'validity_period', nullable: true })
  validityPeriod: string;

  @Column({ name: 'due_diligence_done', nullable: true })
  dueDiligenceDone: boolean;

  @Column({ name: 'credit_worthiness_due', nullable: true })
  creditWorthinessDue: string;

  @Column({ name: 'key_account_person_assigned', nullable: true })
  keyAccountPersonAssigned: string;

  @Column({ name: 'ledger_created_date', nullable: true })
  ledgerCreatedDate: Date;

  @Column({ name: 'ledger_created_by', nullable: true })
  ledgerCreatedBy: string;

  @Column({ name: 'ledger_verified_approved_by', nullable: true })
  ledgerVerifiedApprovedBy: string;

  @Column({ name: 'created_by', nullable: true })
  createdBy: string;

  @Column({ name: 'created_date', nullable: true })
  createdDate: Date;

  @Column({ name: 'additional_notes', type: 'text', nullable: true })
  additionalNotes: string;

  @OneToOne(() => Customer, (customer) => customer.officeUseOnly)
  customer: Customer;
}
