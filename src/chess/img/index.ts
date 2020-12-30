import {
  chess_bishop_black, chess_bishop_white,
  chess_king_black, chess_king_white,
  chess_knight_black, chess_knight_white,
  chess_pawn_black, chess_pawn_white,
  chess_queen_black, chess_queen_white,
  chess_rook_black, chess_rook_white,
} from "./main";

export enum PieceColor {
  BLACK = 'black',
  WHITE = 'white'
}

export enum PieceType {
  PAWN = 'pawn',
  ROOK = 'rook',
  KNIGHT = 'knight',
  BISHOP = 'bishop',
  QUEEN = 'queen',
  KING = 'king'
}

export const PieceImages = {
  [PieceColor.BLACK]: {
    [PieceType.PAWN]: chess_pawn_black,
    [PieceType.ROOK]: chess_rook_black,
    [PieceType.KNIGHT]: chess_knight_black,
    [PieceType.BISHOP]: chess_bishop_black,
    [PieceType.QUEEN]: chess_queen_black,
    [PieceType.KING]: chess_king_black,
  },
  [PieceColor.WHITE]: {
    [PieceType.PAWN]: chess_pawn_white,
    [PieceType.ROOK]: chess_rook_white,
    [PieceType.KNIGHT]: chess_knight_white,
    [PieceType.BISHOP]: chess_bishop_white,
    [PieceType.QUEEN]: chess_queen_white,
    [PieceType.KING]: chess_king_white,
  },
};
