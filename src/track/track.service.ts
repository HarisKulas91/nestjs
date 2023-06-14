import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { TrackDto } from "./dto/track.dto";
import { Page } from "../common/dto/Page.dto";
import { PageMeta } from "../common/dto/PageMeta.dto";
import { PageOptionsDto } from "../common/dto/PageOptionsDto.dto";

@Injectable()
export class TrackService {
  constructor(private readonly prismaService: PrismaService) {}

  async getTracks(pageOptionsDto: PageOptionsDto): Promise<Page<TrackDto>> {
    const itemCount = await this.prismaService.track.count();
    const entitites  = await this.prismaService.track.findMany({skip: Number(pageOptionsDto.skip), take:Number(pageOptionsDto.take)});
    const pageMetaDto = new PageMeta({ itemCount, pageOptionsDto });

    return new Page(entitites, pageMetaDto);
  }
}
