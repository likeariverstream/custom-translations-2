import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TranslationsController } from './translations/translations.controller';
import { TranslationsService } from './translations/translations.service';


@Module({
  imports: [],
  controllers: [AppController, TranslationsController],
  providers: [AppService, TranslationsService],
})
export class AppModule {}
