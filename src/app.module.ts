import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({//Servir contenido estático, nos permite regresar contenido HTML
      //o aplicaciones en React/Angular/Vue, se tiene que installar el módulo @nestjs/serve-static
      //y añadir esta configuración en los imports del módulo principal.
      rootPath: join(__dirname, '..', 'public'),
    })
  ],
})
export class AppModule {}
