import { Injectable } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    private movies : Movie[] = [];

    getAll() : Movie[] {
        return this.movies;
    }
    
    
}
