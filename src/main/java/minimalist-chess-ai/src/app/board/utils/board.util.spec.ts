import { Bishop } from '../pieces/bishop';
import { Knight } from '../pieces/knight';
import { Color } from '../pieces/piece';
import { Rook } from '../pieces/rook';
import { BoardUtil } from './board.util';

//@ts-ignore
const Chess = require('chess.js');

describe('Board Utilitiy', () => {
	let gameClient: BoardUtil;

	beforeEach(() => {
		gameClient = new Chess();
	});

	it('Game Client should be created', () => {
		expect(gameClient).toBeTruthy();
	});

	it('should get board from game client (Staring Game)', () => {
		const board = BoardUtil.getBoardFromGameClient(gameClient);
	});
});