// deliveryDetails.schema.ts
import { z } from "zod";

export const createDeliveryDetailsSchema = z.object({
  deliveryAddressId: z.string(),
  deliveryTime: z.string().optional(),
  receivingPersonName: z.string().min(1),
  receivingPersonMobileNo: z.string().min(1),
  receivingPersonAlternateNo: z.string().optional(),
  emailPrimary: z.string().email(),
  emailSecondary: z.string().email().optional(),
  customerId: z.string(),
});

export const updateDeliveryDetailsSchema =
  createDeliveryDetailsSchema.partial();

export type CreateDeliveryDetailsDto = z.infer<
  typeof createDeliveryDetailsSchema
>;
export type UpdateDeliveryDetailsDto = z.infer<
  typeof updateDeliveryDetailsSchema
>;
