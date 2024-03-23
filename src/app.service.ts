import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from 'cloudinary/cloudinary-response';
// const streamifier = require('streamifier');
@Injectable()
export class AppService {
  public async handleUpload(file: Express.Multer.File) {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      // Escuchar el evento 'finish' del stream para cerrarlo después de cargar el archivo
      uploadStream.on('finish', () => {
        /* El stream ha terminado, podemos resolver la promesa
        Aquí no necesitamos hacer nada, ya que la promesa se resolverá en el callback de 'upload_stream'.
        La razón por la que se agrega este listener de evento 'finish' es principalmente para asegurarse de que el stream de carga se cierre adecuadamente después de que el archivo se haya cargado en Cloudinary. 
        Aunque no estamos realizando ninguna acción específica dentro del callback, escuchar este evento garantiza que cualquier limpieza necesaria (como cerrar el stream) se realice correctamente antes de que la promesa se resuelva en el callback de 
        */
      });

      // Escribir el buffer del archivo en el stream de carga
      uploadStream.end(file.buffer);

      /*
El método uploadStream.end(file.buffer) se utiliza para indicar al stream de carga que ha finalizado la entrada de datos. Este método toma un argumento opcional que es el último conjunto de datos que se debe escribir en el stream antes de que se cierre.

En este contexto, file.buffer representa el contenido del archivo que se está cargando en Cloudinary. Al llamar a uploadStream.end(file.buffer), estamos escribiendo el contenido del archivo en el stream de carga. Después de que se hayan escrito todos los datos del archivo en el stream, el evento 'finish' se disparará, indicando que la carga del archivo ha finalizado.

Por lo tanto, uploadStream.end(file.buffer) se utiliza para iniciar el proceso de carga del archivo al escribir su contenido en el stream de carga. Una vez que se llama a este método y se han escrito todos los datos del archivo en el stream, el evento 'finish' se emitirá, lo que indica que la carga del archivo ha sido completada.
      */
    });
  }
}
