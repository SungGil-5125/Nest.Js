import { IsNumber, IsString } from "class-validator";

export class createMovieDto{

    @IsString()
    readonly title : string;

    @IsNumber()
    readonly year : number;

    @IsString({each : true})
    readonly genres : string[];
}