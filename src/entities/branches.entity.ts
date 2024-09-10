import {
  Entity,
  Column,
  ManyToOne,
} from "typeorm";
import { Address } from "./address.entity";
import Model from "./model.entity";

export enum BranchType {
  COLLECTION_CENTER = "COLLECTION_CENTER",
  DISTRIBUTION_CENTER = "DISTRIBUTION_CENTER",
  SEASONAL_COLLECTION_CENTER  = "SEASONAL_COLLECTION_CENTER",
  WAREHOUSE="WAREHOUSE"
}

@Entity("branches") // Updated table name
export class Branches extends Model { // Updated class name
  @Column()
  name: string;

  @ManyToOne(() => Address, (address) => address.branches, { nullable: false })
  address: Address;
  
  @Column({ nullable: true })
  contactNumber?: string;

  @Column({ type: "text", nullable: true })
  notes?: string;

  @Column()
  capacity: number; // Maximum capacity in terms of storage units or volume

  @Column({
    type: "enum",
    enum: BranchType,
    default: BranchType.COLLECTION_CENTER, // Set a default type if needed
  })
  type: BranchType; // Branch type (e.g., Collection Center, Distribution Center)
}
