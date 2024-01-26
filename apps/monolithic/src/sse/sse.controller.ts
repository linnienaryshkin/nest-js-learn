import { Controller, Get, Sse } from '@nestjs/common';
import { Observable, interval, map } from 'rxjs';

export interface MessageEvent {
  data: string | object;
  id?: string;
  type?: string;
  retry?: number;
}

/*
curl -X GET localhost:3000/sse/client
curl -X GET localhost:3000/sse/server
*/
@Controller('sse')
export class SseController {
  @Get('client')
  getClient(): string {
    return '<script>const sse = new EventSource("http://localhost:3000/sse/server"); sse.onmessage = function(event) { console.log(event); };</script>';
  }

  @Sse('server')
  connectServer(): Observable<MessageEvent> {
    return interval(1000).pipe(
      map(() => ({ data: { hello: 'world ' + Date.now() } })),
    );
  }
}
