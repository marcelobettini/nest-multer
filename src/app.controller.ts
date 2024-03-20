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
import { CustomUploadFileTypeValidator } from './file-upload.validators';
import { CONSTANTS } from './constants/constants';
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
            fileType: CONSTANTS.valid_mime_types,
          }),
        )
        .addMaxSizeValidator({ maxSize: CONSTANTS.max_bytes_pic_size })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    file,
  ) {
    return this.appService.handleUpload(file);
  }
}
