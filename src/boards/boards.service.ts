import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private readonly boardRepository: BoardRepository,
  ) {}

  // getAllBoards(): Board[] {
  //     return this.boards;
  // }

  createBoard(_createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(_createBoardDto);
  }

  // createBoard(createBoardDto: CreateBoardDto) {
  //     const { title, description } = createBoardDto;

  //     const board: Board = {
  //         id: uuid(),
  //         title,
  //         description,
  //         status: BoardStatus.PUBLIC
  //     }

  //     this.boards.push(board);
  //     return board;
  // }

  async getBoardById(_id: number): Promise<Board> {
    const board = this.boardRepository.findOne(_id);
    if (!board) {
      throw new NotFoundException(`Can't find Board with id: ${_id}`);
    }
    return board;
  }

  // getBoardById(id: string): Board {
  //     const found = this.boards.find((board) => board.id === id);

  //     if (!found) {
  //         throw new NotFoundException(`Can't find Board with id ${id}`);
  //     }

  //     return found;
  // }

  async deleteBoard(_id: number): Promise<void> {
    const result = await this.boardRepository.delete(_id);
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id: ${_id}`);
    }
  }

  // deleteBoard(id: string): void {
  //     const found = this.getBoardById(id);
  //     this.boards = this.boards.filter((board) => board.id !== found.id);
  // }

  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //     const board = this.getBoardById(id);
  //     board.status = status;
  //     return board;
  // }
}
