import { Entity, Column, OneToMany, ManyToOne, OneToOne, JoinColumn } from "typeorm";

import Model from "./model.entity";
import { CustomerCategory } from "./customerCategory.entity";
import { CustomerType } from "./customerType.entity";
import { Address } from "./address.entity";
import { Status } from "../utils/status.enum";

import { Reference } from "./referenceCust.entity";
import { StatutoryDetails } from "./statutoryCust.entity";
import { BillingDetailsCust } from "./billingdetailsCust.entity";
import { DeliveryDetails } from "./deliveryDetailsCust.entity";
import { PaymentTerms } from "./paymentDetailsCust.entity";
import { OfficeUseOnly } from "./officeUseOnlyCust.entity";
import { BankDetailsCust} from "./bankDetailsCust.entity";

@Entity("customers")
export class Customer extends Model {
  @Column({ name: 'organisation_name', nullable: true})
  organisationName: string;

  @Column({ name: 'type_of_organisation', nullable: true })
  typeOfOrganisation: string;

  @ManyToOne(
    () => CustomerCategory,
    (customerCategory) => customerCategory.customers
  )
  customerCategory: CustomerCategory;

  @ManyToOne(() => CustomerType, (customerType) => customerType.customers)
  customerType: CustomerType;

  @OneToMany(() => BankDetailsCust, (bankDetails) => bankDetails.customer, { cascade: true })
  bankDetailsCust: BankDetailsCust[];

  @OneToMany(() => Reference, (reference) => reference.customer, { cascade: true })
  references: Reference[];

  @OneToMany(() => Address, (address) => address.customer, { cascade: true })
  customerAddress: Address[];
  @OneToMany(() => StatutoryDetails, (statutoryDetails) => statutoryDetails.customer, { cascade: true })
  statutoryDetails: StatutoryDetails[];

  @OneToMany(() => BillingDetailsCust, (billingDetails) => billingDetails.customer, { cascade: true })
  billingDetails: BillingDetailsCust[];

  @OneToMany(() => DeliveryDetails, (deliveryDetails) => deliveryDetails.customer, { cascade: true })
  deliveryDetails: DeliveryDetails[];
  @OneToMany(() => PaymentTerms, (paymentTerms) => paymentTerms.customer, { cascade: true })
  paymentTerms: PaymentTerms[];

  
  @OneToOne(() => OfficeUseOnly, (officeUseOnly) => officeUseOnly.customer, { cascade: true })
  @JoinColumn()
  officeUseOnly: OfficeUseOnly;

  @Column({ name: 'primary_contact_number', nullable: true })
  primaryContactNumber: string;

  @Column({ name: 'secondary_contact_number', nullable: true })
  secondaryContactNumber: string;

  @Column({ name: 'email_primary', nullable: true})
  emailPrimary: string;

  @Column({ name: 'email_secondary', nullable: true })
  emailSecondary: string;

  @Column({ name: 'key_mobile_number_accounts', nullable: true })
  keyMobileNumberAccounts: string;

  @Column({ name: 'key_mobile_number_owner', nullable: true })
  keyMobileNumberOwner: string;

  @Column({ name: 'mandi_licence_number', nullable: true })
  mandiLicenceNumber: string;

  @Column({ name: 'shops_registration_number', nullable: true })
  shopsRegistrationNumber: string;

  @Column({ name: 'customer_code', nullable:true})
  customerCode: string;
  
  
}
