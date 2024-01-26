import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';

/*
curl http://localhost:3000
curl http://localhost:3000/send
curl http://localhost:3000/emit

TODO: Understand how to client.send/emit from the command line.

curl -X POST http://localhost:3001 -d '{"cmd":"sum","data":[1,2,3,4,5]}'
curl telnet://localhost:3001
nc -z localhost 3001
/dev/null > /dev/tcp/localhost/3001
echo "Your message" | nc localhost 3001
echo -n '{"event": "my_event", "data": {"key": "value"}}' | nc localhost 3000
echo -n '{"cmd":"sum","data":[1,2,3,4,5]}' | nc -v localhost 3001
*/
@Controller()
export class MicroservicesController {
  @MessagePattern({ cmd: 'sum' })
  accumulate(data: number[]): number {
    console.log('accumulate', data);

    return (data ?? []).reduce((a, b) => a + b);
  }

  // Client

  constructor(@Inject('CLIENT_SERVICE') private readonly client: ClientProxy) {}

  @Get('send')
  send(): Observable<number> {
    const pattern = { cmd: 'sum' };
    const data = [1, 2, 3, 4, 5];

    console.log('send', pattern, data);

    return this.client.send<number>(pattern, data);
  }

  @Get('emit')
  emit(): Observable<number> {
    const pattern = { cmd: 'sum' };
    const data = [1, 2, 3, 4, 5];

    console.log('emit', pattern, data);

    return this.client.emit<number>(pattern, data);
  }

  @Get()
  hello(): string {
    return 'microservices: Meow!';
  }
}
