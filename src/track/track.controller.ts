import { ClassSerializerInterceptor, Controller, Get, HttpCode, HttpStatus, Query, UseInterceptors } from '@nestjs/common';
import { TrackService } from './track.service';
import { Page } from "../common/dto/Page.dto";
import { PageOptionsDto } from "../common/dto/PageOptionsDto.dto";
import { TrackDto } from "./dto/track.dto";
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiPaginatedResponse } from '../common/decorators/ApiPaginatedResponse.decorator';
import { ResponseDto } from '../common/dto/ResponseDto.dto';

@Controller('tracks')
@ApiTags('Tracks')
@UseInterceptors(ClassSerializerInterceptor)
@ApiExtraModels(TrackDto)
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiPaginatedResponse(TrackDto)
  @ApiResponse({ status: 401, description: 'Unauthorized' , type: ResponseDto})
  @ApiResponse({ status: 500, description: 'Internal server error', type: ResponseDto })
  async getTracks(@Query() pageOptionsDto: PageOptionsDto): Promise<Page<TrackDto>> {
    return await this.trackService.getTracks(pageOptionsDto);
  }
}
