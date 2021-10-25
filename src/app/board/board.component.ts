import { Component, OnInit } from '@angular/core';
import { Color, Piece, Rank, File } from './pieces/piece';
import { Board, BoardUtil } from './utils/board.util';
import * as chess from 'chess';

@Component({
	selector: 'app-board',
	templateUrl: './board.component.html',
	styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
	private _gameClient: any = chess.create({ PGN: true });
	private _board: Board = BoardUtil.getBoardFromGameClient(this._gameClient);
	public get board() {
		return this._board;
	}

	public focusedPiece: Piece | null = null;
	public possibleMoves: Array<{
		rank: Rank;
		file: File;
		notatedMove: string;
	}>;

	public Color = Color;

	constructor() {}

	ngOnInit(): void {
		console.log(this._gameClient);
	}

	public couldMove({ rank, file }: { rank: Rank; file: File }): boolean {
		// console.log(
		// 	rank,
		// 	file,
		// 	this.possibleMoves.some((p) => rank === p.rank && file === p.file)
		// );
		return this.possibleMoves.some(
			(p) => rank === p.rank && file === p.file
		);
	}

	public onSquareClick(piece: Piece): void {
		if (this.focusedPiece != undefined) {
			const move = this.possibleMoves.find(
				(move) => move.file === piece.file && move.rank === piece.rank
			);
			if (move) {
				this._gameClient.move(move.notatedMove);
				this.resetFocus();
				this._board = BoardUtil.getBoardFromGameClient(
					this._gameClient
				);
				return;
			}

			// Reset focus
			if (piece.color === Color.NONE) {
				this.resetFocus();
			}
		}

		if (piece.color === Color.NONE) return;

		this.focusedPiece = piece;
		this.possibleMoves = this._gameClient.validMoves
			.filter(
				(move) =>
					move.src.file === this.focusedPiece.file &&
					move.src.rank === this.focusedPiece.rank
			)
			.flatMap((move) =>
				move.squares.map((square) => ({
					notatedMove: '',
					file: square.file,
					rank: square.rank,
				}))
			);
		this.possibleMoves = this.possibleMoves.map((possibleMove) => {
			const moveEntry = Object.entries(
				this._gameClient.notatedMoves
			).find(
				([_, _move]) =>
					(<any>_move).src.file === piece.file &&
					(<any>_move).src.rank === piece.rank &&
					(<any>_move).dest.file === possibleMove.file &&
					(<any>_move).dest.rank === possibleMove.rank
			);

			return {
				file: possibleMove.file,
				rank: possibleMove.rank,
				notatedMove: moveEntry[0],
			};
		});
	}

	private resetFocus() {
		this.focusedPiece = null;
		this.possibleMoves = [];
	}
}
