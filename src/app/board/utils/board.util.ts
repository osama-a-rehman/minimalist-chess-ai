import { Color, Piece, Rank, File } from '../pieces/piece';
import { Pawn } from '../pieces/pawn';
import { Notation } from './chess.util';
import { Rook } from '../pieces/rook';
import { Knight } from '../pieces/knight';
import { Bishop } from '../pieces/bishop';
import { King } from '../pieces/king';
import { Queen } from '../pieces/queen';
import { None } from '../pieces/none';

export type Board = Array<Array<Piece | undefined>>;
export type NotationalPieces = Array<{ notation: string; piece: Piece }>;

export class BoardUtil {
	public static getBoardFromGameClient(gameClient: any): Board {
		const board: Board = Array(8)
			.fill(null)
			.map((_) => Array(8).fill(null));

		for (const square of gameClient.game.board.squares) {
			const { file, rank, piece } = square;
			const [x, y] = [
				BoardUtil.getXFromRank(rank),
				BoardUtil.getYFromFile(file),
			];

			if (!piece) {
				const nonePiece = new None(Color.NONE);
				nonePiece.file = file;
				nonePiece.rank = rank;
				board[x][y] = nonePiece;
				continue;
			}

			const color =
				piece.side.name === 'white' ? Color.WHITE : Color.BLACK;
			let boardPiece: Piece;

			switch (piece.type) {
				case 'pawn':
					{
					}
					boardPiece = new Pawn(color);
					break;
				case 'knight':
					boardPiece = new Knight(color);
					break;
				case 'bishop':
					boardPiece = new Bishop(color);
					break;
				case 'rook':
					boardPiece = new Rook(color);
					break;
				case 'queen':
					boardPiece = new Queen(color);
					break;
				case 'king':
					boardPiece = new King(color);
					break;
			}

			boardPiece.file = file;
			boardPiece.rank = rank;
			board[x][y] = boardPiece;
		}

		return board;
	}

	private static getYFromFile(file: File) {
		return file.charCodeAt(0) - 97;
	}
	private static getXFromRank(rank: Rank) {
		return 8 - rank;
	}
}
