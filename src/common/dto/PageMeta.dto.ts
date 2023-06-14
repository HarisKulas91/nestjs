import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { PageMetaDtoParameters } from "./PageMetaDtoParameters.dto";

export class PageMeta{
  @ApiProperty()
  @Transform(({ value }) => Number(value))
  readonly page: number;

  @ApiProperty()
  @Transform(({ value }) => Number(value))
  readonly take: number;

  @ApiProperty()
  readonly itemCount: number;

  @ApiProperty()
  readonly pageCount: number;

  @ApiProperty()
  readonly hasPreviousPage: boolean;

  @ApiProperty()
  readonly hasNextPage: boolean;

  constructor({ pageOptionsDto, itemCount }: PageMetaDtoParameters) {
    this.page = pageOptionsDto.page;
    this.take = pageOptionsDto.take;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.take);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}