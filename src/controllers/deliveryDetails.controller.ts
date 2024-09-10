// deliveryDetails.controller.ts
import {
  controller,
  httpGet,
  httpPost,
  httpPut,
  httpDelete,
  requestBody,
  requestParam,
} from "inversify-express-utils";
import { inject } from "inversify";
import { DeliveryDetailsService } from "../services/deliveryDetails.service";
import {
  CreateDeliveryDetailsDto,
  UpdateDeliveryDetailsDto,
  createDeliveryDetailsSchema,
  updateDeliveryDetailsSchema,
} from "../schemas/deliveryDetails.schema";
import { TYPES } from "../types";

@controller("/delivery-details")
export class DeliveryDetailsController {
  constructor(
    @inject(TYPES.DeliveryDetailsService)
    private readonly deliveryDetailsService: DeliveryDetailsService
  ) {}

  @httpPost("/")
  async create(@requestBody() body: any) {
    const data: CreateDeliveryDetailsDto =
      createDeliveryDetailsSchema.parse(body);
    return this.deliveryDetailsService.create(data);
  }

  @httpGet("/")
  async findAll() {
    return this.deliveryDetailsService.findAll();
  }

  @httpGet("/:id")
  async findOne(@requestParam("id") id: string) {
    return this.deliveryDetailsService.findOne(id);
  }

  @httpPut("/:id")
  async update(@requestParam("id") id: string, @requestBody() body: any) {
    const data: UpdateDeliveryDetailsDto =
      updateDeliveryDetailsSchema.parse(body);
    return this.deliveryDetailsService.update(id, data);
  }

  @httpDelete("/:id")
  async remove(@requestParam("id") id: number) {
    return this.deliveryDetailsService.remove(id);
  }
}
