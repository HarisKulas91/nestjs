import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";
import { PageMeta } from "./PageMeta.dto";

export class Page<T> {
  @IsArray()
  @ApiProperty()
  readonly data: T[];

  @ApiProperty({ type: () => PageMeta })
  readonly meta: PageMeta;

  constructor(data: T[], meta: PageMeta) {
    this.data = data;
    this.meta = meta;
  }
}