import { Global, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Global()
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}