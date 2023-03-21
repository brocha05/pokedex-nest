import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios, { AxiosInstance } from 'axios';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios; //Patron adaptador para evitar dependencias de terceros.

  constructor(
    @InjectModel(Pokemon.name)//Decorador que nos permite inyectar modelos en nuestro servicio
    //Le pasamos como parámetro el nombre de nuestro modelo
    private readonly pokemonModel: Model<Pokemon> //Inyectamos el modelo a través de Model y en el 
    //genérico le pasamos nuestro Modelo.
  ){}

  async executeSeed() {
    //Se realiza petición HTTP con axios y se typea la respuesta con la interfaz creada PokeResponse
    const { data } = await this.axios.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=20',
    );
    //Se obtiene el número del Pokemon ya que no existia en sus atributos.
    data.results.forEach( async ({ name, url }) => {
      const no = +url.split('/').at(-2);
      const pokemon = await this.pokemonModel.create({name, no})//Usamos el modelo importado desde el otro módulo para insertar
    });

    return 'Seed executed';
  }
}
