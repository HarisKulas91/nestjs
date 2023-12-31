import { Injectable } from '@nestjs/common';
import { Customer, Track } from '@prisma/client';
import { PDFDocument } from 'pdf-lib';
import * as fs from 'fs';
import fontKit from '@pdf-lib/fontkit';
import { PrismaService } from '../prisma.service';
import { join } from 'path';

/* 
  You don't need to change anything here unless you opted for Level 2.
*/

@Injectable()
export class CustomerService {
  robotoFont: Buffer;
  customerList: Customer[];

  constructor(private readonly prismaService: PrismaService) {
    this.robotoFont = fs.readFileSync(`${process.cwd()}/Roboto-Regular.ttf`);
    // Loading customers from a JSON file instead from the database is by design.
    this.customerList = JSON.parse(
      fs.readFileSync(`${process.cwd()}/customers.json`, {
        encoding: 'utf-8',
      }),
    );
  }

  async getCustomerTracks(customerId: number): Promise<Track[]> {
    const result = await this.prismaService.customer.findMany({
      where: {
        CustomerId: customerId,
      },
      select: {
        Invoice: {
          select: {
            InvoiceLine: {
              select: {
                Track: true,
              },
            },
          },
        },
      },
    });
    return result[0].Invoice.map((i) => i.InvoiceLine)
    .flat()
    .map((t) => t.Track);
  }

  async getCustomersPdf() {
    const fs = require('fs');
    if(!fs.existsSync(join(process.cwd(),'./src/customer/pdf/customers.pdf'))) {
      const pdfDoc = await PDFDocument.create();
        pdfDoc.registerFontkit(fontKit);
        const font = await pdfDoc.embedFont(this.robotoFont);
        const page = pdfDoc.addPage();
        const fontSize = 12;
    
        this.customerList.forEach((c, i) => {
          page.drawText(`${c.CustomerId} ${c.FirstName} ${c.LastName}`, {
            x: 5,
            y: i * fontSize * 2,
            size: fontSize,
            font,
          });
        });
        const pdf = await pdfDoc.save();

        fs.writeFileSync(join(process.cwd(),'./src/customer/pdf/customers.pdf'), pdf);
        return pdf;
    } else {
      return new Uint8Array(fs.readFileSync(join(process.cwd(),'./src/customer/pdf/customers.pdf')));
    }  
  }
}
