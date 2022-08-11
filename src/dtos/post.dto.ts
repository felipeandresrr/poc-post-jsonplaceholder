

import {
  IsString,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class PostDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: `id post` })
  id: number;
  
  ​@IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `title` })
  title: string;
  
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'body post'})​
  body: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: `id user` })
  userId: number;

}


export class UpdatePostDto extends PartialType(PostDto) {}
