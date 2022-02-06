import { Color, Piece, PieceType } from './piece';

export class Rook extends Piece {
	constructor(color: Color) {
		super(color);

		this.type = PieceType.ROOK;
		this.imageUrl = this.getImageUrl();
	}
}
