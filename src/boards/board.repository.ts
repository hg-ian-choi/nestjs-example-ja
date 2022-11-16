import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  async getAllBoards(): Promise<Board[]> {
    return this.find();
  }

  async getBoardById(_id: number): Promise<Board> {
    const board = this.findOne(_id);
    if (!board) {
      throw new NotFoundException(`Can't find Board with id: ${_id}`);
    }
    return board;
  }

  async createBoard(_createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = _createBoardDto;

    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });

    await this.save(board);
    return board;
  }

  async deleteBoard(_id: number): Promise<void> {
    const result = await this.delete(_id);
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id: ${_id}`);
    }
  }

  async updateBoardStatus(_id: number, _status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(_id);

    board.status = _status;
    await this.save(board);

    return board;
  }
}
