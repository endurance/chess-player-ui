import { PieceType } from "../../img";
import { PieceMovement } from "./types";
import { PawnMover } from "./pawn-mover";
import { RookMover } from "./rook-mover";
import { KnightMover } from "./knight-mover";
import { BishopMover } from "./bishop-mover";
import { QueenMover } from "./queen-mover";
import { KingMover } from "./king-mover";

type ConstructorMap = Record<PieceType, { new(): PieceMovement }>;

const map: ConstructorMap = {
  [PieceType.PAWN]: PawnMover,
  [PieceType.ROOK]: RookMover,
  [PieceType.KNIGHT]: KnightMover,
  [PieceType.BISHOP]: BishopMover,
  [PieceType.QUEEN]: QueenMover,
  [PieceType.KING]: KingMover,
};

export const getMovementObj = (pieceType: PieceType) => map[pieceType];
