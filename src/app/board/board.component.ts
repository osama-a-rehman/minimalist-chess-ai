import { Component, OnInit } from '@angular/core';
import { Color, Piece, Rank, File } from './pieces/piece';
import { Board, BoardUtil } from './utils/board.util';
import { AiUtil } from './utils/ai.util';
import { AiService } from './services/ai.service';

//@ts-ignore
const Chess = require("chess.js");

@Component({
	selector: 'app-board',
	templateUrl: './board.component.html',
	styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
	private _gameClient: any = new Chess();
	private _board: Board = BoardUtil.getBoardFromGameClient(this._gameClient);
	public get board() {
		return this._board;
	}

	private _currentMove: Color = Color.WHITE;

	public focusedPiece: Piece | null = null;
	public possibleMoves: Array<{
		rank: Rank;
		file: File;
		notatedMove: string;
	}>;

	public Color = Color;

	constructor(private aiService: AiService) {
	}

	ngOnInit(): void {
		this.aiService.calculateBestMove(this._gameClient.fen(), Color.WHITE, 2).subscribe(data => {
			console.log(data);
		});
	}

	public couldMove({ rank, file }: { rank: Rank; file: File }): boolean {
		return this.possibleMoves.some(
			(p) => rank === p.rank && file === p.file
		);
	}

	public onSquareClick(piece: Piece): void {
		if (this._currentMove != Color.WHITE) {
			return;
		}

		if (this.focusedPiece != undefined) {
			const move = this.possibleMoves.find(
				(move) => move.file === piece.file && move.rank === piece.rank
			);
			if (move) {
				this._gameClient.move(move.notatedMove);
				this.resetFocus();
				this.switchMove();
				this._board = BoardUtil.getBoardFromGameClient(
					this._gameClient
				);

				this.makeAiMove();
				return;
			}

			// Reset focus
			if (piece.color === Color.NONE) {
				this.resetFocus();
			}
		}

		if (piece.color === Color.NONE) return;

		this.focusedPiece = piece;
		this.possibleMoves = this._gameClient.moves({
			square: `${piece.file}${piece.rank}`,
			verbose: true
		})
			.map((move) =>
			({
				notatedMove: move.san,
				file: move.to[0],
				rank: +move.to[1],
			})
			);
	}

	private makeAiMove() {
		this.resetFocus();

		this.aiService.calculateBestMove(this._gameClient.fen(), Color.BLACK, 2).subscribe(bestMoveNotated => {
			this._gameClient.move(bestMoveNotated);
			this.switchMove();
			this._board = BoardUtil.getBoardFromGameClient(
				this._gameClient
			);
		});

	}

	private resetFocus() {
		this.focusedPiece = null;
		this.possibleMoves = [];
	}

	private switchMove() {
		this._currentMove = this._currentMove === Color.WHITE ? Color.BLACK : Color.WHITE;
	}
}
