import React, { useEffect, useState } from "react";
import { ChessGame } from "../../chess/main";
import { Container } from "@material-ui/core";

export function ChessGameComponent() {
  const ref = React.useRef();
  const [game] = useState(() => new ChessGame());
  
  useEffect(() => {
    (async () => {
      await game.createApp();
      (ref.current as any).appendChild(game.app.view);
    })();
    return () => game.cleanup();
  }, []);
  
  useEffect(() => {
    game.Events.onError(console.log);
    game.Events.onTurnCompleted((arg) => {
      console.log(arg, "has just completed");
    })
  }, []);
  
  return (
    <Container>
      <div ref={ref}/>
    </Container>
  );
}
