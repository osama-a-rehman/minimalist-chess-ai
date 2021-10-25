import { Color, Piece, PieceType } from "../pieces/piece";
import { Board, BoardUtil } from "./board.util";
import { PieceEvaluations } from "./piece-evaluations.util";

type PieceTypeToValueMap = { [key in PieceType]: number };
type PositionEvaluations = { [key in Color.WHITE | Color.BLACK]: number[][] };
type PiecePositionEvaluations = { [key in PieceType]: PositionEvaluations };

export class AiUtil {
    private static readonly pieceValues: PieceTypeToValueMap = {
        [PieceType.PAWN]: 10,
        [PieceType.KNIGHT]: 30,
        [PieceType.BISHOP]: 30,
        [PieceType.ROOK]: 50,
        [PieceType.QUEEN]: 90,
        [PieceType.KING]: 900
    };

    private static positionEvaluations: PiecePositionEvaluations = {
        [PieceType.PAWN]: {
            [Color.WHITE]: PieceEvaluations.whitePawnEvaluations,
            [Color.BLACK]: PieceEvaluations.whitePawnEvaluations.slice().reverse()
        },
        [PieceType.KNIGHT]: {
            [Color.WHITE]: PieceEvaluations.knightEvaluations,
            [Color.BLACK]: PieceEvaluations.knightEvaluations
        },
        [PieceType.BISHOP]: {
            [Color.WHITE]: PieceEvaluations.whiteBishopEvaluations,
            [Color.BLACK]: PieceEvaluations.whiteBishopEvaluations.slice().reverse()
        },
        [PieceType.ROOK]: {
            [Color.WHITE]: PieceEvaluations.whiteRookEvaluations,
            [Color.BLACK]: PieceEvaluations.whiteBishopEvaluations.slice().reverse(),
        },
        [PieceType.QUEEN]: {
            [Color.WHITE]: PieceEvaluations.queenEvaluations,
            [Color.BLACK]: PieceEvaluations.queenEvaluations
        },
        [PieceType.KING]: {
            [Color.WHITE]: PieceEvaluations.whiteKingEvaluations,
            [Color.BLACK]: PieceEvaluations.whiteKingEvaluations.slice().reverse()
        },
    };

    public static calculateBestMove(gameClient: any, color: Color, depth: number = 0): string {
        const possibleValidMoves = gameClient.moves();
        let bestMoveValue = Number.NEGATIVE_INFINITY;
        let bestMoveNotated: string;

        for (const notatedMove of possibleValidMoves) {
            gameClient.move(notatedMove);
            const valueAfterMove = AiUtil.minimax(gameClient, depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, color === Color.WHITE ? true : false);
            gameClient.undo();

            if (valueAfterMove >= bestMoveValue) {
                bestMoveValue = valueAfterMove;
                bestMoveNotated = notatedMove;
            }
        }

        console.log(bestMoveValue, bestMoveNotated)
        return bestMoveNotated;
    }

    private static minimax(gameClient: any, depth: number, alpha: number, beta: number, isMaximizing: boolean): number {
        if (depth == 0) {
            return -AiUtil.evaluateBoard(gameClient, isMaximizing ? Color.WHITE : Color.BLACK);
        }

        const possibleValidMoves = gameClient.moves();
        const minimaxFunction = isMaximizing ? Math.max : Math.min;
        let bestMoveValue = isMaximizing ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;

        for (const notatedMove of possibleValidMoves) {
            gameClient.move(notatedMove);
            bestMoveValue = minimaxFunction(bestMoveValue, AiUtil.minimax(gameClient, depth - 1, alpha, beta, !isMaximizing));
            gameClient.undo();

            if (isMaximizing)
                alpha = minimaxFunction(alpha, bestMoveValue);
            else
                beta = minimaxFunction(beta, bestMoveValue);

            if (beta <= alpha)
                return bestMoveValue;
        }

        return bestMoveValue;
    }
    private static evaluateBoard(gameClient: any, moveColor: Color) {
        const board: Board = BoardUtil.getBoardFromGameClient(gameClient);
        let evaluationValue = 0;

        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                const piece: Piece = board[r][c];

                if (piece.color != Color.NONE) {
                    evaluationValue += AiUtil.getPieceValue(piece.type, piece.color, r, c);
                }
            }
        }

        return moveColor === Color.WHITE ? evaluationValue : -evaluationValue;
    }
    private static getPieceValue(pieceType: PieceType, pieceColor: Color, r: number, c: number): number {
        return AiUtil.pieceValues[pieceType] + AiUtil.positionEvaluations[pieceType][pieceColor][c][r];
    }
}
