import { Color, Piece } from '../pieces/piece';
import { Pawn } from '../pieces/pawn';
import { Notation } from './chess.util';
import { Rook } from '../pieces/rook';
import { Knight } from '../pieces/knight';
import { Bishop } from '../pieces/bishop';
import { King } from '../pieces/king';
import { Queen } from '../pieces/queen';

export type Board = Array<Array<Piece | undefined>>;
export type NotationalPieces = Array<{ notation: string; piece: Piece }>;

export class BoardUtil {
	public static getInitialBoard(): Board {
		const whitePieces: NotationalPieces = [
			...['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map((file) => ({
				notation: `${file}2`,
				piece: new Pawn(Color.WHITE),
			})),

			{ notation: 'a1', piece: new Rook(Color.WHITE) },
			{ notation: 'h1', piece: new Rook(Color.WHITE) },

			{ notation: 'b1', piece: new Knight(Color.WHITE) },
			{ notation: 'g1', piece: new Knight(Color.WHITE) },

			{ notation: 'c1', piece: new Bishop(Color.WHITE) },
			{ notation: 'f1', piece: new Bishop(Color.WHITE) },

			{ notation: 'd1', piece: new Queen(Color.WHITE) },
			{ notation: 'e1', piece: new King(Color.WHITE) },
		];

		const blackPieces: NotationalPieces = [
			...['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map((file) => ({
				notation: `${file}7`,
				piece: new Pawn(Color.BLACK),
			})),

			{ notation: 'a8', piece: new Rook(Color.BLACK) },
			{ notation: 'h8', piece: new Rook(Color.BLACK) },

			{ notation: 'b8', piece: new Knight(Color.BLACK) },
			{ notation: 'g8', piece: new Knight(Color.BLACK) },

			{ notation: 'c8', piece: new Bishop(Color.BLACK) },
			{ notation: 'f8', piece: new Bishop(Color.BLACK) },

			{ notation: 'd8', piece: new Queen(Color.BLACK) },
			{ notation: 'e8', piece: new King(Color.BLACK) },
		];

		let board = Array(8)
			.fill(undefined)
			.map((_) => Array(8).fill(undefined));

		for (const { notation, piece } of [...whitePieces, ...blackPieces]) {
			board = this.setPieceOnBoard(piece, notation, board);
		}

		return board;
	}

	private static setPieceOnBoard(
		piece: Piece,
		notation: string,
		board: Board
	): Board {
		const newBoard: Board = board.map((row) => row.slice());
		const { x, y } = Notation.getPositionFromNotation(notation);

		newBoard[x][y] = piece;
		return newBoard;
	}
}
