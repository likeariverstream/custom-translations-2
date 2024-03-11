import { Controller, Post } from '@nestjs/common';

@Controller('translations')
export class TranslationsController {
  @Post()
  create() {}
}
