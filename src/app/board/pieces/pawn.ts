import { Color, Piece, PieceType } from './piece';

export class Pawn extends Piece {
	constructor(color: Color) {
		super(color);

		this.type = PieceType.PAWN;
		this.imageUrl = this.getImageUrl();
	}
}
