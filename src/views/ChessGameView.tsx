import React from "react";
import { Box } from "@material-ui/core";
import { ChessGameComponent } from "./components/ChessGameComponent";
// import { SideView } from "./SideView";


export const ChessGameView = () => {
  return (
    <Box
      display={'flex'}
      bgcolor={'gray'}
      height={'100vh'}
    >
      {/*<SideView />*/}
      <ChessGameComponent />
    </Box>
  )
}
