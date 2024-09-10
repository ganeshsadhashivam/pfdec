import { Entity, Column, ManyToOne } from 'typeorm';
import Model from './model.entity';
import { Customer } from './customer.entity';
import { FileType } from '../utils/status.enum';


@Entity({ name: 'customer_bank_details' })
export class BankDetailsCust extends Model {
  
 

  @Column({ name: 'account_holder_name', nullable: false })
  accountHolderName: string;

  @Column({ name: 'bank_name', nullable: false })
  bankName: string;

  @Column({ name: 'branch', nullable: false })
  branch: string;

  @Column({ name: 'account_number', nullable: false })
  accountNumber: string;

  @Column({ name: 'ifsc_code', nullable: false })
  ifscCode: string;

  @Column({ name: 'type_of_account', nullable: false })
  typeOfAccount: string;

  @Column({ name: 'copy_of_cancelled_cheque', nullable: true })
  copyOfCancelledCheque: boolean;  // true or false

  @Column({ name: 'reason_no_cheque', nullable: true })
  reasonNoCheque: string; // Reason for not providing the copy

  @Column({ name: 'other_type_of_account', nullable: true })
  otherTypeOfAccount: string; // For 'other' type of account
  // Optional field to capture additional account type if 'type_of_account' is 'other'


  @Column({ name: 'bank_address', nullable: true })
  bankAddress: string;

  @Column ({name:'city/location',nullable:true})
  city:string;

  @Column({ name: 'cheque_copy_path', nullable: true })
  chequePath: string; // Path to the uploaded file

  @Column({ name: 'cheque_copy_type', type: 'enum', enum: FileType, nullable: true })
  chequeCopyType: FileType; // Type of the file (image, pdf, etc.)
  @ManyToOne(() => Customer, (customer) => customer.bankDetailsCust)
  customer: Customer;
}
