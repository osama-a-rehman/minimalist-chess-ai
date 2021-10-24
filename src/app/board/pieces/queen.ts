import { Color, Piece, PieceType } from './piece';

export class Queen extends Piece {
	constructor(color: Color) {
		super(color);

		this.type = PieceType.QUEEN;
		this.imageUrl = this.getImageUrl();
	}
}
