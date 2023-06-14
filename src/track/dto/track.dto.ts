import { IsNotEmpty, IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TrackDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  Name: string;

  @IsInt()
  @ApiProperty({type: Number, nullable:true})
  AlbumId: number|null;

  @IsInt()
  @ApiProperty({type: Number})
  MediaTypeId: number;

  @IsInt()
  @ApiProperty({type: Number, nullable:true})
  GenreId: number|null;

  @IsString()
  @ApiProperty({type: Number, nullable:true})
  Composer: string|null;

  @ApiProperty({type: Number, nullable:true})
  Milliseconds: number|null

  @ApiProperty({type: Number, nullable:true})
  Bytes: number|null
}