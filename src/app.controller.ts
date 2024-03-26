import {
  Controller,
  Post,
  Get,
  UploadedFile,
  UseInterceptors,
  ParseFilePipeBuilder,
  HttpStatus,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CustomUploadFileTypeValidator } from './file-upload.validators';
import { CONSTANTS } from './constants/constants';

@Controller() // Define un controlador de NestJS
export class AppController {
  constructor(private readonly appService: AppService) {} // Constructor del controlador, inyecta el servicio AppService
  @Get()
  public getHello(): string {
    return 'hello world';
  }
  @Post('upload') // Define una ruta POST '/upload'
  @UseInterceptors(FileInterceptor('file')) // Utiliza el interceptor de archivos de NestJS y especifica que el campo de la solicitud se llama 'file'
  public async uploadfile(
    @UploadedFile(
      // Decorador que indica que el parámetro será el archivo cargado
      new ParseFilePipeBuilder() // Crea un nuevo constructor de pipes para analizar el archivo
        .addValidator(
          // Agrega un validador personalizado para verificar el tipo MIME del archivo
          new CustomUploadFileTypeValidator({
            fileType: CONSTANTS.valid_mime_types, // Utiliza los tipos MIME válidos definidos en las constantes
          }),
        )
        .addMaxSizeValidator({ maxSize: CONSTANTS.max_bytes_pic_size }) // Agrega un validador para limitar el tamaño máximo del archivo
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }), // Construye la tubería con opciones adicionales, como el código de estado HTTP en caso de error
    )
    file: Express.Multer.File, // Parámetro del método que representa el archivo cargado
  ) {
    const res = await this.appService.handleUpload(file); // Llama al método handleUpload del servicio AppService para manejar la carga del archivo
    return res.url; // Devuelve la URL del archivo cargado
  }
}
