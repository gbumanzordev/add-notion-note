import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateNoteDto } from './create-note.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getMessage(): string {
    return 'App is running!';
  }

  @Post('add-note')
  async postNote(@Body() createNoteDto: CreateNoteDto) {
    return await this.appService.createNotionRecord(createNoteDto);
  }
}
