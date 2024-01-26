import { Controller, Get } from '@nestjs/common';
import * as fp from 'fs';

const clientHtml = fp.readFileSync(
  './apps/monolithic/src/web-sockets/client.html',
);

/*
curl -X GET localhost:3000/web-sockets/client
*/
@Controller('web-sockets')
export class WebSocketsController {
  @Get('client')
  getClient(): string {
    return clientHtml.toString();
  }
}
