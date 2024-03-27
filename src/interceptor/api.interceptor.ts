import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface response<T> {
  data: T;
}

@Injectable()
export class ApiSuccessInterceptor<T> implements NestInterceptor<T, response<T>> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
    const request = context.switchToHttp().getRequest();
    Logger.log(request.url, '正常接口请求');

    return next.handle().pipe(
      map((data) => {
        return {
          data: data,
          code: 200,
          message: 'success',
        };
      })
    );
  }
}
