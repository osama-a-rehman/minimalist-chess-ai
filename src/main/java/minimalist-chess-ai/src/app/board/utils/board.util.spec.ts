import { Bishop } from '../pieces/bishop';
import { King } from '../pieces/king';
import { Knight } from '../pieces/knight';
import { None } from '../pieces/none';
import { Pawn } from '../pieces/pawn';
import { Color, Rank } from '../pieces/piece';
import { Queen } from '../pieces/queen';
import { Rook } from '../pieces/rook';
import { File } from '../pieces/piece';
import { Board, BoardUtil } from './board.util';
import { isEqual } from 'lodash';

//@ts-ignore
const Chess = require('chess.js');

describe('Board Utilitiy', () => {
	let gameClient: any;

	beforeEach(() => {
		gameClient = new Chess();
	});

	it('Game Client should be created', () => {
		expect(gameClient).toBeTruthy();
	});

	it('should get board from game client (Staring Game)', () => {
		const actualBoard = BoardUtil.getBoardFromGameClient(gameClient);
		const expectedBoard = getStartingBoard();

		expect(isEqual(expectedBoard, actualBoard)).toBeTruthy(
			"Expected and Actual Boards don't match"
		);
	});

	it('should get board from game client (Ruy-Lopez Game)', () => {
		gameClient.move('e4');
		gameClient.move('e5');
		gameClient.move('Nf3');
		gameClient.move('Nc6');
		gameClient.move('Bb5');

		const actualBoard = BoardUtil.getBoardFromGameClient(gameClient);
		const expectedBoard = getRuyLopezBoard();

		expect(actualBoard).toEqual(expectedBoard);

		expect(isEqual(expectedBoard, actualBoard)).toBeTruthy(
			"Expected and Actual Boards don't match"
		);
	});

	function getStartingBoard(): Board {
		const rank8 = [
			(() => {
				const x = new Rook(Color.BLACK);
				x.file = 'a';
				x.rank = 8;
				return x;
			})(),
			(() => {
				const x = new Knight(Color.BLACK);
				x.file = 'b';
				x.rank = 8;
				return x;
			})(),
			(() => {
				const x = new Bishop(Color.BLACK);
				x.file = 'c';
				x.rank = 8;
				return x;
			})(),
			(() => {
				const x = new Queen(Color.BLACK);
				x.file = 'd';
				x.rank = 8;
				return x;
			})(),
			(() => {
				const x = new King(Color.BLACK);
				x.file = 'e';
				x.rank = 8;
				return x;
			})(),
			(() => {
				const x = new Bishop(Color.BLACK);
				x.file = 'f';
				x.rank = 8;
				return x;
			})(),
			(() => {
				const x = new Knight(Color.BLACK);
				x.file = 'g';
				x.rank = 8;
				return x;
			})(),
			(() => {
				const x = new Rook(Color.BLACK);
				x.file = 'h';
				x.rank = 8;
				return x;
			})(),
		];
		const rank7 = [
			(() => {
				const x = new Pawn(Color.BLACK);
				x.file = 'a';
				x.rank = 7;
				return x;
			})(),
			(() => {
				const x = new Pawn(Color.BLACK);
				x.file = 'b';
				x.rank = 7;
				return x;
			})(),
			(() => {
				const x = new Pawn(Color.BLACK);
				x.file = 'c';
				x.rank = 7;
				return x;
			})(),
			(() => {
				const x = new Pawn(Color.BLACK);
				x.file = 'd';
				x.rank = 7;
				return x;
			})(),
			(() => {
				const x = new Pawn(Color.BLACK);
				x.file = 'e';
				x.rank = 7;
				return x;
			})(),
			(() => {
				const x = new Pawn(Color.BLACK);
				x.file = 'f';
				x.rank = 7;
				return x;
			})(),
			(() => {
				const x = new Pawn(Color.BLACK);
				x.file = 'g';
				x.rank = 7;
				return x;
			})(),
			(() => {
				const x = new Pawn(Color.BLACK);
				x.file = 'h';
				x.rank = 7;
				return x;
			})(),
		];

		const rank6_to_3 = ([6, 5, 4, 3] as Rank[]).map((rank) => {
			const allFiles: File[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
			return allFiles.map((file) => {
				const piece = new None(Color.NONE);
				piece.file = file;
				piece.rank = rank;
				return piece;
			});
		});

		const rank2 = [
			(() => {
				const x = new Pawn(Color.WHITE);
				x.file = 'a';
				x.rank = 2;
				return x;
			})(),
			(() => {
				const x = new Pawn(Color.WHITE);
				x.file = 'b';
				x.rank = 2;
				return x;
			})(),
			(() => {
				const x = new Pawn(Color.WHITE);
				x.file = 'c';
				x.rank = 2;
				return x;
			})(),
			(() => {
				const x = new Pawn(Color.WHITE);
				x.file = 'd';
				x.rank = 2;
				return x;
			})(),
			(() => {
				const x = new Pawn(Color.WHITE);
				x.file = 'e';
				x.rank = 2;
				return x;
			})(),
			(() => {
				const x = new Pawn(Color.WHITE);
				x.file = 'f';
				x.rank = 2;
				return x;
			})(),
			(() => {
				const x = new Pawn(Color.WHITE);
				x.file = 'g';
				x.rank = 2;
				return x;
			})(),
			(() => {
				const x = new Pawn(Color.WHITE);
				x.file = 'h';
				x.rank = 2;
				return x;
			})(),
		];
		const rank1 = [
			(() => {
				const x = new Rook(Color.WHITE);
				x.file = 'a';
				x.rank = 1;
				return x;
			})(),
			(() => {
				const x = new Knight(Color.WHITE);
				x.file = 'b';
				x.rank = 1;
				return x;
			})(),
			(() => {
				const x = new Bishop(Color.WHITE);
				x.file = 'c';
				x.rank = 1;
				return x;
			})(),
			(() => {
				const x = new Queen(Color.WHITE);
				x.file = 'd';
				x.rank = 1;
				return x;
			})(),
			(() => {
				const x = new King(Color.WHITE);
				x.file = 'e';
				x.rank = 1;
				return x;
			})(),
			(() => {
				const x = new Bishop(Color.WHITE);
				x.file = 'f';
				x.rank = 1;
				return x;
			})(),
			(() => {
				const x = new Knight(Color.WHITE);
				x.file = 'g';
				x.rank = 1;
				return x;
			})(),
			(() => {
				const x = new Rook(Color.WHITE);
				x.file = 'h';
				x.rank = 1;
				return x;
			})(),
		];

		return [rank8, rank7, ...rank6_to_3, rank2, rank1];
	}

	function getRuyLopezBoard(): Board {
		const rank8 = [
			(() => {
				const x = new Rook(Color.BLACK);
				x.file = 'a';
				x.rank = 8;
				return x;
			})(),
			(() => {
				const x = new None(Color.NONE);
				x.file = 'b';
				x.rank = 8;
				return x;
			})(),
			(() => {
				const x = new Bishop(Color.BLACK);
				x.file = 'c';
				x.rank = 8;
				return x;
			})(),
			(() => {
				const x = new Queen(Color.BLACK);
				x.file = 'd';
				x.rank = 8;
				return x;
			})(),
			(() => {
				const x = new King(Color.BLACK);
				x.file = 'e';
				x.rank = 8;
				return x;
			})(),
			(() => {
				const x = new Bishop(Color.BLACK);
				x.file = 'f';
				x.rank = 8;
				return x;
			})(),
			(() => {
				const x = new Knight(Color.BLACK);
				x.file = 'g';
				x.rank = 8;
				return x;
			})(),
			(() => {
				const x = new Rook(Color.BLACK);
				x.file = 'h';
				x.rank = 8;
				return x;
			})(),
		];
		const rank7 = [
			(() => {
				const x = new Pawn(Color.BLACK);
				x.file = 'a';
				x.rank = 7;
				return x;
			})(),
			(() => {
				const x = new Pawn(Color.BLACK);
				x.file = 'b';
				x.rank = 7;
				return x;
			})(),
			(() => {
				const x = new Pawn(Color.BLACK);
				x.file = 'c';
				x.rank = 7;
				return x;
			})(),
			(() => {
				const x = new Pawn(Color.BLACK);
				x.file = 'd';
				x.rank = 7;
				return x;
			})(),
			(() => {
				const x = new None(Color.NONE);
				x.file = 'e';
				x.rank = 7;
				return x;
			})(),
			(() => {
				const x = new Pawn(Color.BLACK);
				x.file = 'f';
				x.rank = 7;
				return x;
			})(),
			(() => {
				const x = new Pawn(Color.BLACK);
				x.file = 'g';
				x.rank = 7;
				return x;
			})(),
			(() => {
				const x = new Pawn(Color.BLACK);
				x.file = 'h';
				x.rank = 7;
				return x;
			})(),
		];

		const rank6_to_3 = ([6, 5, 4, 3] as Rank[]).map((rank) => {
			const allFiles: File[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
			return allFiles.map((file) => {
				const piece = new None(Color.NONE);
				piece.file = file;
				piece.rank = rank;
				return piece;
			});
		});

		const e4 = new Pawn(Color.WHITE);
		e4.file = 'e';
		e4.rank = 4;
		rank6_to_3[2][4] = e4;

		const e5 = new Pawn(Color.BLACK);
		e5.file = 'e';
		e5.rank = 5;
		rank6_to_3[1][4] = e5;

		const Nf3 = new Knight(Color.WHITE);
		Nf3.file = 'f';
		Nf3.rank = 3;
		rank6_to_3[3][5] = Nf3;

		const Nc6 = new Knight(Color.BLACK);
		Nc6.file = 'c';
		Nc6.rank = 6;
		rank6_to_3[0][2] = Nc6;

		const Bb5 = new Bishop(Color.WHITE);
		Bb5.file = 'b';
		Bb5.rank = 5;
		rank6_to_3[1][1] = Bb5;

		const rank2 = [
			(() => {
				const x = new Pawn(Color.WHITE);
				x.file = 'a';
				x.rank = 2;
				return x;
			})(),
			(() => {
				const x = new Pawn(Color.WHITE);
				x.file = 'b';
				x.rank = 2;
				return x;
			})(),
			(() => {
				const x = new Pawn(Color.WHITE);
				x.file = 'c';
				x.rank = 2;
				return x;
			})(),
			(() => {
				const x = new Pawn(Color.WHITE);
				x.file = 'd';
				x.rank = 2;
				return x;
			})(),
			(() => {
				const x = new None(Color.NONE);
				x.file = 'e';
				x.rank = 2;
				return x;
			})(),
			(() => {
				const x = new Pawn(Color.WHITE);
				x.file = 'f';
				x.rank = 2;
				return x;
			})(),
			(() => {
				const x = new Pawn(Color.WHITE);
				x.file = 'g';
				x.rank = 2;
				return x;
			})(),
			(() => {
				const x = new Pawn(Color.WHITE);
				x.file = 'h';
				x.rank = 2;
				return x;
			})(),
		];
		const rank1 = [
			(() => {
				const x = new Rook(Color.WHITE);
				x.file = 'a';
				x.rank = 1;
				return x;
			})(),
			(() => {
				const x = new Knight(Color.WHITE);
				x.file = 'b';
				x.rank = 1;
				return x;
			})(),
			(() => {
				const x = new Bishop(Color.WHITE);
				x.file = 'c';
				x.rank = 1;
				return x;
			})(),
			(() => {
				const x = new Queen(Color.WHITE);
				x.file = 'd';
				x.rank = 1;
				return x;
			})(),
			(() => {
				const x = new King(Color.WHITE);
				x.file = 'e';
				x.rank = 1;
				return x;
			})(),
			(() => {
				const x = new None(Color.NONE);
				x.file = 'f';
				x.rank = 1;
				return x;
			})(),
			(() => {
				const x = new None(Color.NONE);
				x.file = 'g';
				x.rank = 1;
				return x;
			})(),
			(() => {
				const x = new Rook(Color.WHITE);
				x.file = 'h';
				x.rank = 1;
				return x;
			})(),
		];

		return [rank8, rank7, ...rank6_to_3, rank2, rank1];
	}
});
