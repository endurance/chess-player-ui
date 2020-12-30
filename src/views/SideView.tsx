import { Box, makeStyles, Typography } from "@material-ui/core";
import { PieceColor } from "../chess/img";


const useStyles = makeStyles({
  currentTurn: {
    fontSize: 36,
    textAlign: "center",
    textTransform: "capitalize",
  },
});

export const SideView = () => {
  /**
   * Watch for:
   * 1. The last move made
   * 2. Who's turn it is next
   * 3. How much time has passed before a move has been made
   * 4. Currently Selected Piece
   */
  const classes = useStyles();
  return (
    <Box
      width={300}
    >
      <Box
        width={300}
        height={125}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Typography classes={{root: classes.currentTurn}}>{PieceColor.WHITE} Turn</Typography>
      </Box>
      Side View
    </Box>
  );
};
