import { Body, Controller, Get, Param, Post, Redirect, Render, } from '@nestjs/common';
import { AppService } from './app.service';
import db from './db';
import { MacskaDTO } from './macska.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async ListMacskak(){
    const [rows] = await db.execute(
      'SELECT suly, szem_szin FROM macskak ORDER BY suly DESC'
    );
    return {
      macskak: rows,
    };
  }

  @Get('cats/new')
  @Render('form')
  newMacskakForm() {
    return {};
  }

  @Post('cats/new')
  @Redirect()
  async newMacska(@Body() macskak: MacskaDTO) {
    const [result]: any = await db.execute(
      'INSERT INTO macskak (szem_szin, suly) VALUES (?, ?)',
      [macskak.szem_szin, macskak.suly],
    );
    return {
      url: '/',
    };
  }

  @Get('cats/:szem_szin')
  @Render('show')
  async showMacskak(@Param('szem_szin') szem_szin: string) {
    const [rows] = await db.execute(
      'SELECT suly, szem_szin FROM macskak WHERE szem_szin = ?',
      [szem_szin],
    );
    return { macskak: rows };
  }
}
