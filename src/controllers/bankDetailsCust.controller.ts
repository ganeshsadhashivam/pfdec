import { Request, Response, NextFunction } from 'express';
import {
  controller,
  httpGet,
  httpPost,
  request,
  response,
  requestParam,
  next,
  httpDelete,
  httpPatch,
} from 'inversify-express-utils';
import { inject } from 'inversify';

import { TYPES } from '../types';
import AppError from '../utils/appError';
import { BankDetailsCustService } from '../services/bank-deatilsCust.service';
import { BankDetailsCust } from '../entities/bankDetailsCust.entity';
import { upload } from '../middleware/multerConfig';
import { FileType } from '../utils/status.enum';
import path from 'path';

@controller('/customer-bank-details')
export class BankDetailsCustController {
  constructor(
    @inject(TYPES.BankDetailsCustService)
    private bankDetailsCustService: BankDetailsCustService
  ) {}

  @httpPost('/', upload.single('file'))
  public async createCustomerBankDetails(
    @request() req: Request,
    @response() res: Response,
    @next() next: NextFunction
  ) {
    try {
      // console.log(req.body.bankDetailsCust)
      // Ensure req.body is parsed correctly
      if (typeof req.body.bankDetailsCust === 'string') {
        // Parse the bankDetailsCust if it's a JSON string
        const bankDetailsData = JSON.parse(req.body.bankDetailsCust);
        console.log("in bankDetailsData ",bankDetailsData)
        const file=req.file
         // Handle 'other' type of account
      if (bankDetailsData.typeOfAccount === 'Other' && bankDetailsData.otherTypeOfAccount) {
        bankDetailsData.typeOfAccount = bankDetailsData.otherTypeOfAccount;
      }

      // Validate if copy of cancelled cheque is required
      if (bankDetailsData.copyOfCancelledCheque === 'true') {
        if (!file) {
          return next(new AppError(400, 'A copy of the cancelled cheque must be provided.'));
        }
        // Process file
        bankDetailsData.chequePath = `uploads/${file.filename}`;
        const ext = path.extname(file.originalname).toLowerCase();
        bankDetailsData.chequeType = ext === '.pdf' ? FileType.PDF : FileType.IMAGE;
      } else {
        // Ensure reason is provided if no cheque is given
        if (!bankDetailsData.reasonNoCheque ||bankDetailsData.reasonNoCheque.trim() === '') {
          return next( new AppError(400, 'Reason for not providing the copy of the cancelled cheque is required.'));
        }
      }

      // Create and save bank details using the service
      const bankDetails = await this.bankDetailsCustService.createBankDetails(bankDetailsData);

      return res.status(201).json({
        status: 'success',
        message: 'Customer bank details created successfully',
        //data: bankDetails,
      });
      } else {
        // Handle unexpected data type
        return next(new AppError(400, 'Invalid data format for bankDetailsCust'));
      }
    } catch (err) {
      next(err);
    }
  }


  @httpGet('/')
  public async getAllCustomerBankDetails(
    @request() req: Request,
    @response() res: Response,
    @next() next: NextFunction
  ) {
    try {
      const bankDetails = await this.bankDetailsCustService.findAll();

      if (!bankDetails || bankDetails.length === 0) {
        return next(new AppError(404, 'No customer bank details found'));
      }

      res.status(200).json({
        status: 'success',
        data: bankDetails,
      });
    } catch (err) {
      next(err);
    }
  }

  @httpGet('/:id')
  public async getCustomerBankDetailsById(
    @requestParam('id') id: string,
    @response() res: Response,
    @next() next: NextFunction
  ) {
    try {
      const bankDetails = await this.bankDetailsCustService.findById(id);

      if (!bankDetails) {
        return next(new AppError(404, 'Customer bank details not found'));
      }

      res.status(200).json({
        status: 'success',
        data: bankDetails,
      });
    } catch (err) {
      next(err);
    }
  }

  @httpPatch('/:id')
  public async updateCustomerBankDetails(
    @requestParam('id') id: string,
    @request() req: Request<{}, {}, BankDetailsCust>,
    @response() res: Response,
    @next() next: NextFunction
  ) {
    try {
      const bankDetailsData = req.body;
      const updatedBankDetails = await this.bankDetailsCustService.update(id, bankDetailsData);

      if (!updatedBankDetails) {
        return next(new AppError(404, 'Customer bank details not found or could not be updated'));
      }

      res.status(200).json({
        status: 'success',
        message: 'Customer bank details updated successfully',
      });
    } catch (err) {
      next(err);
    }
  }

  @httpDelete('/:id')
  public async deleteCustomerBankDetails(
    @requestParam('id') id: string,
    @response() res: Response,
    @next() next: NextFunction
  ) {
    try {
      const result = await this.bankDetailsCustService.delete(+id);

      if (!result) {
        return next(new AppError(404, 'Customer bank details not found or could not be deleted'));
      }

      res.status(200).json({
        status: 'success',
        message: 'Customer bank details deleted successfully',
      });
    } catch (err) {
      next(err);
    }
  }
}
