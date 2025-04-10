import { IsNotEmpty, IsString, IsNumber, IsArray, IsUrl, IsOptional } from 'class-validator';

export class ArtistDTO {
  id!: any;
 
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  bornCity!: string;

  @IsNotEmpty()
  @IsString()
  birthdate!: string;

  @IsOptional()
  @IsUrl()
  img?: string;

  @IsNotEmpty()
  @IsNumber()
  rating!: number;

  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  songs!: number[];
}