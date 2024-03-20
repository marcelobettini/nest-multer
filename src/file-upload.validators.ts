import { FileValidator } from '@nestjs/common';
import * as fileType from 'file-type-mime';
export interface CustomUploadTypeValidatorOptions {
  fileType: string[];
}
export class CustomUploadFileTypeValidator extends FileValidator {
  private _allowedMimeTypes: string[];
  constructor(
    protected readonly validationOptions: CustomUploadTypeValidatorOptions,
  ) {
    super(validationOptions);
    this._allowedMimeTypes = this.validationOptions.fileType;
  }
  public isValid(file?: Express.Multer.File): boolean {
    const response = fileType.parse(file.buffer);
    //sql changed to image ext will make response undefined
    return this._allowedMimeTypes.includes(response?.mime);
  }
  public buildErrorMessage(): string {
    return `Only files of type ${this._allowedMimeTypes.join(
      ', ',
    )} can be uploaded`;
  }
}