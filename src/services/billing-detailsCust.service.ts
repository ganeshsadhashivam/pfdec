import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { BillingDetailsCustRepository } from "../repositories/billingDetailsCust.repository";
import { BillingDetailsCust } from "../entities/billingdetailsCust.entity";

@injectable()
export class BillingDetailsCustService {


    constructor(
        @inject(TYPES.BillingDetailsCustRepository)
        private readonly billingDetailsCustRepository: BillingDetailsCustRepository,
      ) {}


      async createdetails(billingDetails: BillingDetailsCust): Promise<BillingDetailsCust> {
        const billingDetaile = await this.billingDetailsCustRepository.create(billingDetails)
        return await this.billingDetailsCustRepository.save( billingDetaile);
      }
    
}