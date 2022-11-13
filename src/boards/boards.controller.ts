// boards/boards.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Board } from './board.entity';
// import { Board, BoardStatus } from './board.model';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get(':/id')
  async getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardsService.createBoard(createBoardDto);
  }

  // @Get()
  // getAllBoards(): Board[] {
  //   return this.boardsService.getAllBoards();
  // }
  // @Post()
  // @UsePipes(ValidationPipe)
  // createBoard(@Body() creatBoardDto: CreateBoardDto): Board {
  //   return this.boardsService.createBoard(creatBoardDto);
  // }
  // @Get('/:id')
  // getBoardById(@Param('id') id: string): Board {
  //   return this.boardsService.getBoardById(id);
  // }
  // @Delete('/:id')
  // deleteBoardById(@Param('id') id: string): void {
  //   this.boardsService.deleteBoardById(id);
  // }
  // @Patch('/:id/status')
  // updateBoardById(
  //   @Param('id') id: string,
  //   @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  // ): Board {
  //   return this.boardsService.updateBoardById(id, status);
  // }
}
