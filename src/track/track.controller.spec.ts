import { Test, TestingModule } from '@nestjs/testing';
import { PageOptionsDto } from "../common/dto/PageOptionsDto.dto";
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

describe('TrackController', () => {
  let trackController: TrackController;

  const tracks = { "data": [
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
      "take": 10,
      "itemCount": 3503,
      "pageCount": 351,
      "hasPreviousPage": false,
      "hasNextPage": true
    }
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
        controllers: [TrackController],
    })
      .useMocker((token) => {
        if (token === TrackService) {
          return {
            getTracks: jest.fn().mockResolvedValue(tracks),
          };
        }
      })
      .compile();

      trackController = app.get<TrackController>(TrackController);
  });

  it('should return customer tracks', async () => {
    const pageData: PageOptionsDto = {
      skip: 1,
      take: 10,
      page: 1
    };

    expect(await trackController.getTracks(pageData)).toBe(tracks);
  });
});
