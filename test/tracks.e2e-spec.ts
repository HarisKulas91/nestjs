import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { TrackModule } from '../src/track/track.module';
import { PrismaService } from '../src/prisma.service';
import { AppModule } from '../src/app.module';


describe('TrackController (e2e)', () => {
  let app: INestApplication;
  let token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
        providers: [TrackModule, { provide: PrismaService, useValue: jest.fn() }]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: 'haris.kulas@gmail.com',
        password: 'HarisKulas!',
      });

    token = res.body.access_token;
  });

  let response = {
    "data": [
      {
        "TrackId": 1,
        "Name": "For Those About To Rock (We Salute You)",
        "AlbumId": 1,
        "MediaTypeId": 1,
        "GenreId": 1,
        "Composer": "Angus Young, Malcolm Young, Brian Johnson",
        "Milliseconds": 343719,
        "Bytes": 11170334,
        "UnitPrice": {
          "s": 1,
          "e": -1,
          "d": [
            9900000
          ]
        }
      },
      {
        "TrackId": 2,
        "Name": "Balls to the Wall",
        "AlbumId": 2,
        "MediaTypeId": 2,
        "GenreId": 1,
        "Composer": null,
        "Milliseconds": 342562,
        "Bytes": 5510424,
        "UnitPrice": {
          "s": 1,
          "e": -1,
          "d": [
            9900000
          ]
        }
      },
      {
        "TrackId": 3,
        "Name": "Fast As a Shark",
        "AlbumId": 3,
        "MediaTypeId": 2,
        "GenreId": 1,
        "Composer": "F. Baltes, S. Kaufman, U. Dirkscneider & W. Hoffman",
        "Milliseconds": 230619,
        "Bytes": 3990994,
        "UnitPrice": {
          "s": 1,
          "e": -1,
          "d": [
            9900000
          ]
        }
      },
      {
        "TrackId": 4,
        "Name": "Restless and Wild",
        "AlbumId": 3,
        "MediaTypeId": 2,
        "GenreId": 1,
        "Composer": "F. Baltes, R.A. Smith-Diesel, S. Kaufman, U. Dirkscneider & W. Hoffman",
        "Milliseconds": 252051,
        "Bytes": 4331779,
        "UnitPrice": {
          "s": 1,
          "e": -1,
          "d": [
            9900000
          ]
        }
      },
      {
        "TrackId": 5,
        "Name": "Princess of the Dawn",
        "AlbumId": 3,
        "MediaTypeId": 2,
        "GenreId": 1,
        "Composer": "Deaffy & R.A. Smith-Diesel",
        "Milliseconds": 375418,
        "Bytes": 6290521,
        "UnitPrice": {
          "s": 1,
          "e": -1,
          "d": [
            9900000
          ]
        }
      },
      {
        "TrackId": 6,
        "Name": "Put The Finger On You",
        "AlbumId": 1,
        "MediaTypeId": 1,
        "GenreId": 1,
        "Composer": "Angus Young, Malcolm Young, Brian Johnson",
        "Milliseconds": 205662,
        "Bytes": 6713451,
        "UnitPrice": {
          "s": 1,
          "e": -1,
          "d": [
            9900000
          ]
        }
      },
      {
        "TrackId": 7,
        "Name": "Let's Get It Up",
        "AlbumId": 1,
        "MediaTypeId": 1,
        "GenreId": 1,
        "Composer": "Angus Young, Malcolm Young, Brian Johnson",
        "Milliseconds": 233926,
        "Bytes": 7636561,
        "UnitPrice": {
          "s": 1,
          "e": -1,
          "d": [
            9900000
          ]
        }
      },
      {
        "TrackId": 8,
        "Name": "Inject The Venom",
        "AlbumId": 1,
        "MediaTypeId": 1,
        "GenreId": 1,
        "Composer": "Angus Young, Malcolm Young, Brian Johnson",
        "Milliseconds": 210834,
        "Bytes": 6852860,
        "UnitPrice": {
          "s": 1,
          "e": -1,
          "d": [
            9900000
          ]
        }
      },
      {
        "TrackId": 9,
        "Name": "Snowballed",
        "AlbumId": 1,
        "MediaTypeId": 1,
        "GenreId": 1,
        "Composer": "Angus Young, Malcolm Young, Brian Johnson",
        "Milliseconds": 203102,
        "Bytes": 6599424,
        "UnitPrice": {
          "s": 1,
          "e": -1,
          "d": [
            9900000
          ]
        }
      },
      {
        "TrackId": 10,
        "Name": "Evil Walks",
        "AlbumId": 1,
        "MediaTypeId": 1,
        "GenreId": 1,
        "Composer": "Angus Young, Malcolm Young, Brian Johnson",
        "Milliseconds": 263497,
        "Bytes": 8611245,
        "UnitPrice": {
          "s": 1,
          "e": -1,
          "d": [
            9900000
          ]
        }
      }
    ],
    "meta": {
      "page": 1,
      "take": 10,
      "itemCount": 3503,
      "pageCount": 351,
      "hasPreviousPage": false,
      "hasNextPage": true
    }
  };

  it('/tracks (GET)', () => {
    return request(app.getHttpServer())
      .get('/tracks')
      .query({take: 10, skip:0, page: 1})
      .expect(200)
      .set('Authorization', `Bearer ${token}`)
      .expect(response);
  });

});
