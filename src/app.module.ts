import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({//Servir contenido estático, nos permite regresar contenido HTML
      //o aplicaciones en React/Angular/Vue, se tiene que installar el módulo @nestjs/serve-static
      //y añadir esta configuración en los imports del módulo principal.
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'),//Conexión a la base de datos
    PokemonModule, 
  ],
})
export class AppModule {}
