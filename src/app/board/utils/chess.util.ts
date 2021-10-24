import { Position } from '../pieces/piece';

export class Notation {
	private static fileRegex = /[a-h]/;
	private static rankRegex = /[1-8]/;

	public static getPositionFromNotation(notation: string): Position {
		const [file, rank] = [notation[0], notation[1]];

		if (
			!(
				notation.length === 2 &&
				Notation.fileRegex.test(file) &&
				Notation.rankRegex.test(rank)
			)
		) {
			throw Error(`Invalid Chess Notation: ${notation}`);
		}

		return {
			x: 7 - (rank.charCodeAt(0) - 49),
			y: file.charCodeAt(0) - 97,
		};
	}
}
