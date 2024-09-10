import { inject } from "inversify";
import { controller, httpPost } from "inversify-express-utils";
import { TYPES } from "../types";
import { BillingDetailsCustService } from "../services/billing-detailsCust.service";
import AppError from "../utils/appError";
import { upload } from "../middleware/multerConfig";
import { NextFunction, Request, Response } from "express";

@controller('/customer-billing-details')
export class BillingDetailsCustController {
  constructor(
    @inject(TYPES.BillingDetailsCustService)
    private billingDetailsCustService: BillingDetailsCustService
  ) {}

  @httpPost('/upload-fields', upload.fields([
    { name: 'billingFormat', maxCount: 1 },
    { name: 'addressProof', maxCount: 1 }
  ]))
  public async uploadFilesWithFields(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (req.files) {
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };
        const billingFormatPath = files.billingFormat ? files.billingFormat[0].path : null;
        const addressProofPath = files.addressProof ? files.addressProof[0].path : null;
        // Handle the file paths (e.g., save them to the database)
        res.status(200).json({
          status: 'success',
          message: 'Files uploaded successfully.',
          data: { billingFormatPath, addressProofPath },
        });
      } else {
        return next(new AppError(400, 'No files uploaded'));
      }
    } catch (err) {
      next(err);
    }
  }
}  