import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { createMovieDto } from './dto/creare-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {

    constructor(private readonly moviesService: MoviesService) {}

    @Get()
        getAll(): Movie[] {
            return this.moviesService.getAll();
        }

    @Get('search')
        search(@Query("year") searchingYear : string){
            return `we are searching for a movie made after: ${searchingYear}`
        }
        
    @Post()
        create(@Body() moviedata : createMovieDto) {
            return this.moviesService.create(moviedata);
        }


    @Get('/:id')
        getOne(@Param('id') movieid:number){
            return this.moviesService.getOne(movieid);
        }

  
    @Delete('/:id')
        remove(@Param('id') movieid : number){
            return this.moviesService.deleteOne(movieid);
        }
    
    @Patch('/:id')
        patch(@Param('id') movieid : number, @Body() updatedata : UpdateMovieDto){
            return this.moviesService.update(movieid, updatedata);
        }
}
