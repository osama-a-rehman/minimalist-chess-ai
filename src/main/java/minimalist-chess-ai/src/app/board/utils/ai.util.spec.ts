import { Color } from '../pieces/piece';
import { AiUtil } from './ai.util';

//@ts-ignore
const Chess = require('chess.js');

describe('AI Utilitiy', () => {
	let gameClient: any;

	beforeEach(() => {
		gameClient = new Chess();
	});

	it('Game Client should be created', () => {
		expect(gameClient).toBeTruthy();
	});

	it('should get best move as Nf6 when d4 at depth=2', () => {
		gameClient.move('d4');

		const actualBestMove = AiUtil.calculateBestMove(
			gameClient,
			Color.BLACK,
			2
		);
		const expectedBestMove = 'Nf6';

		expect(actualBestMove).toBe(expectedBestMove);
	});

	it('should get best move as e4 for Black when g3 e5, Bg2 Nf6, Nf3 at depth=2', () => {
		gameClient.move('g3');
		gameClient.move('e5');
		gameClient.move('Bg2');
		gameClient.move('Nf6');
		gameClient.move('Nf3');

		const actualBestMove = AiUtil.calculateBestMove(
			gameClient,
			Color.BLACK,
			2
		);
		const expectedBestMove = 'e4';

		expect(actualBestMove).toBe(expectedBestMove);
	});

	it('should go for Jerome gambit in an Italian Game at depth=2', () => {
		gameClient.move('e4');
		gameClient.move('e5');
		gameClient.move('Nf3');
		gameClient.move('Nc6');
		gameClient.move('Bc4');
		gameClient.move('Bc5');

		const actualBestMove = AiUtil.calculateBestMove(
			gameClient,
			Color.WHITE,
			2
		);
		const expectedBestMove = 'Bxf7+';

		expect(actualBestMove).toBe(expectedBestMove);
	});
});
