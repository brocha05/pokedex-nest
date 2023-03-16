import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)//Decorador que nos permite inyectar modelos en nuestro servicio
    //Le pasamos como parámetro el nombre de nuestro modelo
    private readonly pokemonModel: Model<Pokemon> //Inyectamos el modelo a través de Model y en el 
    //genérico le pasamos nuestro Modelo.
    ){}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto)//Insersión en la base de datos 
      //Se hacen asincronas las funciones con async y la inserción como es asincrona se maneja con await
      return pokemon; 
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(search: string) {

    let pokemon: Pokemon;//Se declara un pokemon con la forma de la entidad 

    //no
    if(!isNaN(+search)){//Verificamos si es number lo que llegó
      pokemon = await this.pokemonModel.findOne({no: search})//Se hace busqueda por no
    }

    //MongoID
    if(!pokemon && isValidObjectId(search)){//Se verifica si es un id de mongo con isValidObjectId
      pokemon = await this.pokemonModel.findById(search)//Se utiliza findById
    }

    //Name
    if(!pokemon){//Si no hay nada se busca por nombre y se hacen minusculas y quitan espacios.
      pokemon = await this.pokemonModel.findOne({name: search.toLowerCase().trim()})
    }


    if(!pokemon) throw new NotFoundException(`Pokemon with id, name or no: '${search}' not found.`)
    //Si no lo encuentra tira una notFoundException
    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term)//utilizamos el método anterior para comprobar que existe el pokemon
    let exist: boolean;

    if(updatePokemonDto.name){
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
      //Si el DTO trae un nombre lo estandarizamos a minusculas porque así lo guardamos en DB
    } 

    try {
      await pokemon.updateOne(updatePokemonDto)//Utilizamos un método que nos provee el modelo de
      //mongoose updateOne y le enviamos el DTO que recibimos
    } catch (error) {
      this.handleExceptions(error);
    }

    return {...pokemon.toJSON(), ...updatePokemonDto };
    //Para lograr ver en Postman la data ya convertida sobreescribimos el pokemon 
  }

  async remove(id: string) {
    // const pokemon = await this.findOne(id)
    // await pokemon.deleteOne();
    const result = this.pokemonModel.findByIdAndDelete(id)//utilizamos la funcion integrada del modelo para no hacer dos consultas a la base de datos.
    return result;
  }

  private handleExceptions(error: any){
    if(error.code === 11000){//Error donde encuentra llaves duplicadas
      throw new BadRequestException(`Pokemon exists in db ${JSON.stringify(error.keyValue)}`)
    }
    console.log(error)
    throw new InternalServerErrorException(`Can not create Pokemon - Check server logs`)
  }
}
