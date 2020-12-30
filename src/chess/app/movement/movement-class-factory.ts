import { PieceType } from "../../img";
import { PawnMover } from "./pawn-mover";
import { PieceMovement } from "./types";

type ConstructorMap = Record<PieceType, { new (): PieceMovement }>;
const map: ConstructorMap = {
  [PieceType.PAWN]: PawnMover,
  [PieceType.ROOK]: PawnMover,
  [PieceType.KNIGHT]: PawnMover,
  [PieceType.BISHOP]: PawnMover,
  [PieceType.QUEEN]: PawnMover,
  [PieceType.KING]: PawnMover,
};

export const getMovementObj = (pieceType: PieceType) => {
  return map[pieceType];
}
