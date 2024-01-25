import { UseInterceptors } from '@nestjs/common';
import { SerializeInterceptor } from '../interceptors';

interface ClassConstructor {
  new (...args: any[]): any;
}

export const Serialize = (dto: ClassConstructor) =>
  UseInterceptors(new SerializeInterceptor(dto));
