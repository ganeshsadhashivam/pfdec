import { NextFunction, Response, Request } from 'express';
import { upload, processImage } from '../middleware/multerConfig';
import { FileEntity } from '../entities/files.entity';
import { AppDataSource } from '../utils/data-source';
import { controller, httpPost } from 'inversify-express-utils';

@controller('/api')
export class FileController {

  @httpPost('/', upload.single('file'), processImage) // Apply middleware in correct order
  public async uploadFileController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    console.log( req.file as Express.Multer.File
    );
    
    try {
      //console.log('File:', req.file.filename);
      if (!req.file) {
        return res.status(400).json({ status: 'error', message: 'No file uploaded' });
      }

      const fileData = {
        filePath: `uploads/${req.file.filename}`,
        fileType: req.file.mimetype
      };

      const fileRepository = AppDataSource.getRepository(FileEntity);
      const file = fileRepository.create(fileData);
      await fileRepository.save(file);

      res.status(201).json({
        status: 'success',
        message: 'File uploaded successfully',
        data: file
      });
    } catch (error) {
      next(error);
    }
  }
}
