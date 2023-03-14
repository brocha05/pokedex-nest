import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";//Se importa document para heredarlo en la clase 

@Schema()//Decorador propio de Nest que indica que es un esquema de base de datos esta entidad.
export class Pokemon extends Document{//Document permite añadir las características de un documento
    //de mongo a mi entidad y así poderla manipular más facilmente.
    @Prop({
        unique: true,
        index: true
    })
    name: string;

    @Prop({
        unique: true,
        index: true
    })
    no: number;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon)//Se debe exportar el esquema para 
//Cuando se genere la base de datos los detecte  y cree