import { Global, Injectable } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';

@Global()
@Injectable()
export class ErrorFunction {
  constructor() {}
  async errFunction(string: string, status?: number) {
    throw new HttpException(`${string}`, status || HttpStatus.BAD_REQUEST);
  }
  async RelationError(error: any) {
    console.log({ error: error.meta || error });
    const err = error.meta?.cause
      ? error.meta?.cause
      : error.meta?.field_name
      ? 'relation error ' + error.meta.field_name.split('_').join(' ')
      : error?.response
      ? error.response
      : 'either u are missing some fields or entered some extra fields';
    this.errFunction(`${err}`);
  }
}
