import { Color, Piece, PieceType } from './piece';

export class Bishop extends Piece {
	constructor(color: Color) {
		super(color);

		this.type = PieceType.BISHOP;
		this.imageUrl = this.getImageUrl();
	}
}
