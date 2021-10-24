import { Color, Piece, PieceType } from './piece';

export class Knight extends Piece {
	constructor(color: Color) {
		super(color);

		this.type = PieceType.KNIGHT;
		this.imageUrl = this.getImageUrl();
	}
}
