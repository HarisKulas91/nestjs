import { CacheInterceptor, Controller, Get, Param, Res, UseInterceptors } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { Track } from '@prisma/client';
import { Response } from 'express';
import { Public } from '../app.controller';

import { CustomerService } from './customer.service';

/* 
  You don't need to change anything here unless you opted for Level 2.
*/
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @UseInterceptors(CacheInterceptor)
  @Public()
  @Get('/:id/tracks')
  @ApiExcludeEndpoint()
  async getCustomerTracks(@Param('id') customerId: number): Promise<Track[]> {
    return await this.customerService.getCustomerTracks(customerId);
  }

  @Public()
  @Get('/pdf')
  @ApiExcludeEndpoint()
  async getCustomersPdf(@Res() res: Response): Promise<any> {
    const pdf = await this.customerService.getCustomersPdf();

    res.attachment('customers.pdf');
    res.send(Buffer.from(pdf));
  }
}
