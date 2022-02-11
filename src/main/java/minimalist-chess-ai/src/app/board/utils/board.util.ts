import { Color, Piece, Rank, File } from '../pieces/piece';
import { Pawn } from '../pieces/pawn';
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

		const gameBoard = gameClient.board();

		for (let r = 0; r < 8; r++) {
			for (let c = 0; c < 8; c++) {
				const piece = gameBoard[r][c];
				const [rank, file] = [
					BoardUtil.getRankFromX(r),
					BoardUtil.getFileFromY(c),
				];

				if (!piece) {
					const nonePiece = new None(Color.NONE);
					nonePiece.file = file;
					nonePiece.rank = rank;
					board[r][c] = nonePiece;
					continue;
				}

				const color = piece.color === 'w' ? Color.WHITE : Color.BLACK;
				const boardPieces = {
					p: new Pawn(color),
					n: new Knight(color),
					b: new Bishop(color),
					r: new Rook(color),
					q: new Queen(color),
					k: new King(color),
				};
				const boardPiece: Piece = boardPieces[piece.type];
				boardPiece.file = file;
				boardPiece.rank = rank;
				board[r][c] = boardPiece;
			}
		}

		return board;
	}

	private static getRankFromX(x: number): Rank {
		if (!(0 <= x && x < 8)) throw Error(`Invalid x: ${x}`);

		return (8 - x) as Rank;
	}

	private static getFileFromY(y: number): File {
		if (!(0 <= y && y < 8)) throw Error(`Invalid y: ${y}`);

		return String.fromCharCode(y + 97) as File;
	}
}
