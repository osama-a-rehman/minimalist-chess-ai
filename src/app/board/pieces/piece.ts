export type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type File = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h';

export enum Color {
	WHITE = 'white',
	BLACK = 'black',
	NONE = 'none',
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
	imageUrl: string;
	type: PieceType;
	rank: Rank;
	file: File;

	constructor(color: Color) {
		this.color = color;
	}

	protected getImageUrl(): string {
		return `/assets/images/pieces/${this.color}-${this.type}.svg`;
	}
}
