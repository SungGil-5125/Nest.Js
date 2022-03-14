import { IsNumber, IsString } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { createMovieDto } from "./creare-movie.dto";

export class UpdateMovieDto extends PartialType(createMovieDto ){

}