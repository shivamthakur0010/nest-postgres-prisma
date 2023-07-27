import { HttpException, HttpStatus } from '@nestjs/common';

export const errfunction = (string: string, status?: number) => {
  // console.log({ status });
  throw new HttpException(`${string}`, status || HttpStatus.BAD_REQUEST);
};

export const RelationError = (error: any) => {
  console.log({ error: error.meta || error });
  const err = error.meta?.cause
    ? error.meta?.cause
    : error.meta?.field_name
    ? 'relation error ' + error.meta.field_name.split('_').join(' ')
    : error?.response
    ? error.response
    : 'either u are missing some fields or entered some extra fields';
  errfunction(`${err}`);
};
