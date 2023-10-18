import { Injectable } from '@nestjs/common';
import { Client } from '@notionhq/client';
import { CreateNoteDto } from './create-note.dto';

@Injectable()
export class AppService {
  async createNotionRecord(createNoteDto: CreateNoteDto) {
    const notion = new Client({
      auth: process.env.NOTION_TOKEN,
    });

    return await notion.pages.create({
      parent: {
        type: 'database_id',
        database_id: 'ce1e6f54-e472-45ae-97c1-f316fe1fceff',
      },
      properties: {
        Title: {
          title: [
            {
              text: {
                content: createNoteDto.topic,
              },
            },
          ],
        },
        Tags: {
          type: 'rich_text',
          rich_text: [
            {
              text: {
                content: createNoteDto.tags,
              },
            },
          ],
        },
      },
      children: [
        {
          object: 'block',
          paragraph: {
            rich_text: [
              {
                text: {
                  content: createNoteDto.note,
                },
              },
            ],
            color: 'default',
          },
        },
      ],
    });
  }
}
