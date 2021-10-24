import { Component, OnInit } from '@angular/core';
import { Piece, Position } from './pieces/piece';
import { Board, BoardUtil } from './utils/board.util';

@Component({
	selector: 'app-board',
	templateUrl: './board.component.html',
	styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
	private _board: Board = BoardUtil.getInitialBoard();
	public get board() {
		return this._board;
	}

	public focusedPiece: Piece;
	public possibleMoves: Array<Position>;

	constructor() {}

	ngOnInit(): void {}

	public couldMove(position: Position): boolean {
		return this.possibleMoves.some(
			(p) => position.x === p.x && p.y === position.y
		);
	}

	public onPieceFocus(piece: Piece): void {
		this.focusedPiece = piece;
		this.possibleMoves = [];
	}
}
