import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  ParseFilePipeBuilder,
  HttpStatus,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CustomUploadFileTypeValidator } from './app.validators';
const MAX_BYTES_PIC_SIZE = 2 * 1024 * 1024;
const VALID_MIME_TYPES = ['image/jpeg', 'image/png'];
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadfile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addValidator(
          new CustomUploadFileTypeValidator({
            fileType: VALID_MIME_TYPES,
          }),
        )
        .addMaxSizeValidator({ maxSize: MAX_BYTES_PIC_SIZE })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    file,
  ) {
    return file;
  }
}
