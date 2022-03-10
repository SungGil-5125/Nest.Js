import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
    @Get()
        getAll(): string{
            return "this will return all";
        }
    @Get('search')
        search(@Query("year") searchingYear : string){
            return `we are searching for a movie made after: ${searchingYear}`
        }
        
    @Get('/:id')
        getOne(@Param('id') movieid:string){
            return `this will return one movie with the id: ${movieid}`
        }

    @Post()
        create(@Body() moviedata): string {
            return moviedata;
        }

    @Delete('/:id')
        remove(@Param('id') movieid : string){
            return `this will delete a movie with the id: ${movieid}`
        }
    
    @Patch('/:id')
        patch(@Param('id') movieid : string, @Body() updatedata){
            return {
                updatedMovie: movieid,
                ...updatedata,
            }
        }
}
