import styled from "styled-components";

import { useRef } from "react";
import { NieveEffect } from "../../hooks/NieveEffect";
export const  NieveComponente = ({children }) =>{
  const canvasRef = useRef(null);
  return (
    <Container >
        {children }
      <canvas ref={canvasRef}></canvas>
      <NieveEffect canvasRef={canvasRef} />
    </Container>
  );
}
const Container = styled.div`
//   position: absolute;
  top: 0;
  left: 0;
  canvas {
    position: absolute;
    top: 0;
    left: 0;
  }
`;