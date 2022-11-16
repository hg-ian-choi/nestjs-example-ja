import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  // @Get('/')
  // getAllBoard(): Board[] {
  //     return this.boardsService.getAllBoards();
  // }

  @UsePipes(ValidationPipe)
  @Post()
  createBoard(@Body() _createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardsService.createBoard(_createBoardDto);
  }

  // @Post()
  // @UsePipes(ValidationPipe)
  // createBoard(
  //     @Body() createBoardDto: CreateBoardDto
  // ): Board {
  //     return this.boardsService.createBoard(createBoardDto);
  // }

  @Get('/:id')
  getBoardById(@Param('id', ParseIntPipe) _id: number): Promise<Board> {
    return this.boardsService.getBoardById(_id);
  }

  // @Get('/:id')
  // getBoardById(@Param('id') id: string): Board {
  //     return this.boardsService.getBoardById(id)
  // }

  @Delete(':id')
  deleteBoard(@Param('id', ParseIntPipe) _id: number): Promise<void> {
    return this.boardsService.deleteBoard(_id);
  }

  // @Delete('/:id')
  // deleteBoard(@Param('id') id: string): void {
  //     this.boardsService.deleteBoard(id);
  // }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) _id: number,
    @Body('status', BoardStatusValidationPipe) _status: BoardStatus,
  ): Promise<Board> {
    return this.boardsService.updateBoardStatus(_id, _status);
  }

  // @Patch('/:id/status')
  // updateBoardStatus(
  //     @Param('id') id: string,
  //     @Body('status', BoardStatusValidationPipe) status: BoardStatus
  // ) {
  //     return this.boardsService.updateBoardStatus(id, status);
  // }
}
