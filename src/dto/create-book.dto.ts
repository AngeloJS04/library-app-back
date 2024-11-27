import { IsString, IsInt, IsOptional, IsBoolean, IsArray, IsUUID, IsNumber } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsInt()
  year: number;

  @IsArray()
  @IsString({ each: true })
  genre: string[];

  @IsOptional()
  @IsString()
  coverImage?: string;

  @IsOptional()
  @IsNumber()
  rating?: number;

  @IsBoolean()
  isFavorite: boolean;

  @IsUUID()
  userId: any;
}
