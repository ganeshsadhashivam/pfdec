import { Column, Entity, ManyToOne } from "typeorm";
import Model from "./model.entity";
import { Address } from "./address.entity";
import { OfficeUseOnly } from "./officeUseOnlyCust.entity";
export enum OFFICE_TYPE {
REGISTERED_OFFICE = "REGISTERED_OFFICE",
  CORPORATE_OFFICE ="CORPORATE_OFFICE"
}
@Entity("offices")
export class OfficesData extends Model {
 
    @Column()
    name: string;
  
    @ManyToOne(() => Address, (address) => address.officeData, { nullable: false })
    address: Address;
    @Column({ nullable: true })
    contactNumber?: string;
  
    @Column({ type: "text", nullable: true })
    notes?: string;
  
    @Column()
    capacity: number; // Maximum capacity in terms of storage units or volume
  
    //@Column({ default: true })
    //isActive: boolean; // Indicates if the warehouse is currently active or not

    @Column({
        type: "enum",
        enum: OFFICE_TYPE,
        default: OFFICE_TYPE.REGISTERED_OFFICE, // Set a default type if needed
      })
      type: OfficeUseOnly; // Location type (e.g., Collection Center, Distribution Center)
    
  }