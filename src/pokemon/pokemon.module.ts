import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    MongooseModule.forFeature([//Importamos un módulo en el que pasamos como argumento la clase
    //Y el nombre del esquema para crear la colección en mongo
      {
        name: Pokemon.name,
        schema: PokemonSchema,
      },
    ]),
  ],
  exports: [MongooseModule], //Exportamos lo que queremos exponer, en este caso el mongooseModulo
  //Que a su vez tiene el modelo de los pokemon 
})
export class PokemonModule {}
