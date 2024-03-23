import { FileValidator } from '@nestjs/common';
import * as fileType from 'file-type-mime';

/*
En estas líneas, se importan dos módulos. 
FileValidator es un módulo proporcionado por NestJS para validar archivos. 
file-type-mime es una librería externa que se utilizará para determinar el 
tipo MIME de un archivo basado en su contenido.
*/

export interface CustomUploadTypeValidatorOptions {
  fileType: string[];
}

/*
Aquí se define una interfaz CustomUploadTypeValidatorOptions, que especifica 
las opciones que se pueden pasar al constructor de CustomUploadFileTypeValidator.
*/

export class CustomUploadFileTypeValidator extends FileValidator {
  private _allowedMimeTypes: string[];
  constructor(
    protected readonly validationOptions: CustomUploadTypeValidatorOptions,
  ) {
    super(validationOptions);
    this._allowedMimeTypes = this.validationOptions.fileType;
  }

  /* Se define una clase CustomUploadFileTypeValidator que extiende de FileValidator. 
  Esta clase se utiliza para validar los tipos de archivo permitidos. 
  En el constructor, se recibe un objeto de opciones validationOptions que se espera 
  que sea del tipo CustomUploadTypeValidatorOptions. Luego, se llama al constructor de 
  la clase base FileValidator con estas opciones y se inicializa la propiedad 
  _allowedMimeTypes con los tipos de archivo permitidos.
  */

  public isValid(file?: Express.Multer.File): boolean {
    const response = fileType.parse(file.buffer);
    //sql changed to image ext will make response undefined
    return this._allowedMimeTypes.includes(response?.mime);
  }

  /*
El método isValid verifica si el archivo pasado como parámetro es válido. 
Utiliza la función fileType.parse para obtener el tipo MIME del archivo basado en su contenido. 
Luego, verifica si el tipo MIME está incluido en la lista de tipos de archivo permitidos 
almacenados en _allowedMimeTypes. 
Se usa el operador opcional (?.) para manejar el caso en que 'response' sea undefined. 
*/

  public buildErrorMessage(): string {
    return `Only files of type ${this._allowedMimeTypes.join(
      ', ',
    )} can be uploaded`;
  }
  /* 
El método buildErrorMessage construye un mensaje de error que indica los tipos de archivo permitidos. 
Concatena los tipos de archivo permitidos en un string utilizando join.
  */
}
