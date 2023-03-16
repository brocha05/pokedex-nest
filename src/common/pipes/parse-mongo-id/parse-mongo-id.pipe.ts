import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    //el método transform recibe el valor en la variable value 
    //Abajo tenemos nuestras validaciones, si no es un mongoid tira un error
    if( !isValidObjectId(value)){
      throw new BadRequestException(`${value} is not a valid MongoID`)
    }
    //De otro modo quiere decir que es un mongoid válido y regresamos la misma data.
    return value;
  }
}
