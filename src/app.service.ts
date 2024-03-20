import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  public async handleUpload(file: Express.Multer.File) {
    return file;
  }
}
