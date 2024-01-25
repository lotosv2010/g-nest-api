import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable, map } from 'rxjs';

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // console.log('这里在拦截器执行之前', context);
    return next.handle().pipe(
      map((res) => {
        // console.log('这里在拦截器执行之后', res);
        const data = plainToInstance(this.dto, res.data, {
          // 设置为true之后，所有经过该interceptor的接口都需要设置Expose或Exclude
          // Expose就是设置哪些字段需要暴露，Exclude就是设置哪些字段不需要暴露
          // excludeExtraneousValues: true,
        });
        return {
          ...res,
          data,
        };
      }),
    );
  }
}
