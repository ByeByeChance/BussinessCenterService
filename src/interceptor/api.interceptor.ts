import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface response<T> {
  data: T;
}

@Injectable()
export class ApiSuccessInterceptor<T> implements NestInterceptor<T, response<T>> {
  intercept(_context: ExecutionContext, next: CallHandler<T>): Observable<any> {
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
