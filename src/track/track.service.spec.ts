import { Test, TestingModule } from '@nestjs/testing';
import { PageOptionsDto } from "../common/dto/PageOptionsDto.dto";
import { PrismaService } from '../prisma.service';
import {
  MockContext,
  Context,
  createMockContext,
} from '../../test/mocks/prisma.mock';
import { TrackService } from './track.service';

describe('TrackService', () => {
  let service: TrackService;
  let mockCtx: MockContext;
  let ctx: Context;

  beforeEach(async () => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrackService],
    })
      .useMocker((token) => {
        if (token === PrismaService) {
          return ctx.prisma;
        }
      })
      .compile();

    service = module.get<TrackService>(TrackService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get tracks', async () => {
    const result = [{
      
        TrackId: 1,
        Name: 'name',
        AlbumId: null,
        MediaTypeId: 1,
        GenreId: null,
        Composer: null,
        Milliseconds: 1,
        Bytes: null,
        UnitPrice: 1.1,
      
    }];

    mockCtx.prisma.track.findMany.mockResolvedValue(result as any);

    const pageData: PageOptionsDto = {
      skip: 1,
      take: 1,
      page: 1
    };

    const expected = { "data": [
      {
        TrackId: 1,
        Name: 'name',
        AlbumId: null,
        MediaTypeId: 1,
        GenreId: null,
        Composer: null,
        Milliseconds: 1,
        Bytes: null,
        UnitPrice: 1.1,
      }],
      "meta": {
        "page": 1,
        "take": 1,
        "itemCount": undefined,
        "pageCount": NaN,
        "hasPreviousPage": false,
        "hasNextPage": false
      }
    };

    await expect(service.getTracks(pageData)).resolves.toEqual(expected);
  });
});
