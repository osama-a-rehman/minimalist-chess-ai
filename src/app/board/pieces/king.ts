import { Color, Piece, PieceType } from './piece';

export class King extends Piece {
	constructor(color: Color) {
		super(color);

		this.type = PieceType.KING;
		this.imageUrl = this.getImageUrl();
	}
}
