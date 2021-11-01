import { Color, Piece, PieceType } from "../pieces/piece";
import { Board, BoardUtil } from "./board.util";
import { PieceEvaluations } from "./piece-evaluations.util";

export class AiUtil {
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
                    evaluationValue += PieceEvaluations.getPieceValue(piece.type, piece.color, r, c);
                }
            }
        }

        return moveColor === Color.WHITE ? evaluationValue : -evaluationValue;
    }
}
