// deliveryDetails.service.ts
import { injectable, inject } from "inversify";

import { DeliveryDetailsRepository } from "../repositories/deliveryDetails";
import { AddressRepository } from "../repositories/address.repository";
import { CustomerRepository } from "../repositories/customer.repository";
import {
  CreateDeliveryDetailsDto,
  UpdateDeliveryDetailsDto,
} from "../schemas/deliveryDetails.schema";
import { DeliveryDetails } from "../entities/deliveryDetailsCust.entity";
import { TYPES } from "../types"; // Custom types mapping for InversifyJS
import AppError from "../utils/appError";

@injectable()
export class DeliveryDetailsService {
  constructor(
    @inject(TYPES.DeliveryDetailsRepository)
    private readonly deliveryDetailsRepository: DeliveryDetailsRepository,
    @inject(TYPES.AddressRepository)
    private readonly addressRepository: AddressRepository,
    @inject(TYPES.CustomerRepository)
    private readonly customerRepository: CustomerRepository
  ) {}

  async create(data: CreateDeliveryDetailsDto): Promise<DeliveryDetails> {
    const address = await this.addressRepository.findOne({
      where: { id: data.deliveryAddressId },
    });
    if (!address) throw new AppError(400, "Address not found");

    const customer = await this.customerRepository.findOne({
      where: { id: data.customerId },
    });
    if (!customer) throw new AppError(401, "Customer not found");

    const deliveryDetails = this.deliveryDetailsRepository.create({
      deliveryAddress: address,
      deliveryTime: data.deliveryTime,
      receivingPersonName: data.receivingPersonName,
      receivingPersonMobileNo: data.receivingPersonMobileNo,
      receivingPersonAlternateNo: data.receivingPersonAlternateNo,
      emailPrimary: data.emailPrimary,
      emailSecondary: data.emailSecondary,
      customer: customer,
    });

    return this.deliveryDetailsRepository.save(deliveryDetails);
  }

  async findAll(): Promise<DeliveryDetails[]> {
    return this.deliveryDetailsRepository.find({
      relations: ["deliveryAddress", "customer"],
    });
  }

  async findOne(id: string): Promise<DeliveryDetails> {
    const deliveryDetails = await this.deliveryDetailsRepository.findOne({
      where: { id },
      relations: ["deliveryAddress", "customer"],
    });
    if (!deliveryDetails) throw new AppError(400, "DeliveryDetails not found");
    return deliveryDetails;
  }

  async update(
    id: string,
    data: UpdateDeliveryDetailsDto
  ): Promise<DeliveryDetails> {
    const deliveryDetails = await this.findOne(id);

    if (data.deliveryAddressId) {
      const address = await this.addressRepository.findOne({
        where: { id: data.deliveryAddressId },
      });
      if (!address) throw new AppError(400, "Address not found");
      deliveryDetails.deliveryAddress = address;
    }

    if (data.customerId) {
      const customer = await this.customerRepository.findOne({
        where: { id: data.customerId },
      });
      if (!customer) throw new AppError(400, "Customer not found");
      deliveryDetails.customer = customer;
    }

    Object.assign(deliveryDetails, data);

    return this.deliveryDetailsRepository.save(deliveryDetails);
  }

  async remove(id: number): Promise<void> {
    const result = await this.deliveryDetailsRepository.delete(id);
    if (result.affected === 0)
      throw new AppError(400, "DeliveryDetails not found");
  }
}
