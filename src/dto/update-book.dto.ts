import { PartialType } from '@nestjs/swagger';
import { CreateBookDto } from './create-book.dto';
import { IsString, IsOptional, IsArray, IsBoolean, IsNumber, IsUUID } from 'class-validator';

export class UpdateBookDto extends PartialType(CreateBookDto) {

    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    author?: string;

    @IsNumber()
    @IsOptional()
    year?: number;
    
    @IsArray()
    @IsOptional()
    genre?: string[];

    @IsString()
    @IsOptional()
    coverImage?: string;

    @IsNumber()
    @IsOptional()
    rating?: number;

    @IsBoolean()
    @IsOptional()
    isFavorite?: boolean;
}


