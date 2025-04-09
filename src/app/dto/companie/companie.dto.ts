import { IsNotEmpty, IsNumber, IsString, IsArray, IsOptional } from 'class-validator';

export class CompanieDTO {
  id!: any;

  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  country!: string;

  @IsNotEmpty()
  @IsNumber()
  createYear!: number;

  @IsNotEmpty()
  @IsNumber()
  employees!: number;

  @IsNotEmpty()
  @IsNumber()
  rating!: number;

  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  songs!: number[];
}