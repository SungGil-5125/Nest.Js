import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    private movies : Movie[] = [];

    getAll() : Movie[] {
        return this.movies;
    }

    getOne(id : string) : Movie {
        const movie = this.movies.find(movie => movie.id === +id);

        if(!movie){
            throw new NotFoundException(`movie with id ${id} not found`)
        }

        return movie;
    }
    
    deleteOne(id : string): boolean {
        this.getOne(id);
        this.movies.filter(movie => movie.id !== +id);
        return true;
    }
    
    create(moviedata) {
        this.movies.push({
            id : this.movies.length + 1,
            ...moviedata,
        })
    }
}
 