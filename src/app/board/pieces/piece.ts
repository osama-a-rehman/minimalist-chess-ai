export enum Color {
	WHITE = 'white',
	BLACK = 'black',
}

export class Position {
	x: number;
	y: number;
}

export enum PieceType {
	PAWN = 'pawn',
	KNIGHT = 'knight',
	BISHOP = 'bishop',
	ROOK = 'rook',
	QUEEN = 'queen',
	KING = 'king',
}

export abstract class Piece {
	color: Color;
	position: Position;
	imageUrl: string;
	type: PieceType;

	constructor(color: Color) {
		this.color = color;
	}

	protected getImageUrl(): string {
		return `/assets/images/pieces/${this.color}-${this.type}.svg`;
	}
}
