import { IsArray, IsNotEmpty, IsNumber, IsString, IsUrl } from "class-validator";

export class SongDTO {
  id!: any;

  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsUrl()
  poster!: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  genre!: string[];

  @IsNotEmpty()
  @IsNumber()
  year!: number;

  @IsNotEmpty()
  @IsNumber()
  duration!: number;

  @IsNotEmpty()
  @IsNumber()
  rating!: number;

  @IsNotEmpty()
  @IsNumber()
  artist!: number;
}