import { Column, Entity, OneToMany, ManyToOne, OneToOne, JoinColumn } from "typeorm";

import Model from "./model.entity";

import { VendorSubcategory } from "./vendorSubcategory.entity";
import { Address } from "./address.entity";
import { VendorCategory } from "./vendorCategory.entity";
import { Status } from "../utils/status.enum";

@Entity("vendor")
export class Vendor extends Model {
  @Column("character varying", {
    name: "business_name",
    unique: true,
    length: 40,
  })
  name: string;

  @Column("character varying", { name: "contact_name", length: 40 ,nullable:true})
  contactname: string;

  @Column("character varying", { name: "contact_phone", length: 40 ,nullable:true})
  contactphone: string;

  @Column("character varying", { name: "email", length: 100, unique: true })
  email: string; // Added email field with unique constraint
  @Column("character varying", { name: "gstn", length: 40 })
  gstn: string;

  @Column("text", { name: "description", nullable: true })
  description: string;

  @Column("character varying", { name: "website", length: 100, nullable: true })
  website: string;
  // @OneToOne(() => Address, (address) => address.vendor, { cascade: true })
  // @JoinColumn()
  // address: Address; // Establish one-to-many relationship with Address entity

  @Column({
    type: "enum",
    enum: Status,
    default: Status.PENDING,
    name: "status",
  })
  status: Status;
  @ManyToOne(() => VendorSubcategory, (subcategory) => subcategory.vendors)
  subcategory: VendorSubcategory;
  @ManyToOne(() => VendorCategory, (category) => category.vendorSubcategories)
  category: VendorCategory; 
}
