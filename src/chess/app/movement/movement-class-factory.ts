import { PieceType } from "../../img";
import { PieceMovement } from "./types";
import { PawnMover } from "./pawn-mover";
import { RookMover } from "./rook-mover";
import { KnightMover } from "./knight-mover";

type ConstructorMap = Record<PieceType, { new(): PieceMovement }>;
const map: ConstructorMap = {
  [PieceType.PAWN]: PawnMover,
  [PieceType.ROOK]: RookMover,
  [PieceType.KNIGHT]: KnightMover,
  [PieceType.BISHOP]: PawnMover,
  [PieceType.QUEEN]: PawnMover,
  [PieceType.KING]: PawnMover,
};

export const getMovementObj = (pieceType: PieceType) => {
  return map[pieceType];
};
