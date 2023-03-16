import React, { ReactNode } from 'react';
import styled from 'styled-components';

import BigGradient from './assets/BigGradient.png';
import SmallGradient from './assets/SmallGradient.png';

interface ILayout {
  children?: ReactNode;
}

export default function Layout(props: ILayout) {
  const { children } = props;

  return (
    <Container>
      <LeftGradient src={SmallGradient} />
      <ContentWrapper>{children}</ContentWrapper>
      <RightGradient src={BigGradient} />
    </Container>
  );
}

const Container = styled.div`
  position: relative;

  width: 100%;
  height: 100vh;

  overflow: hidden;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;

  z-index: 1;
`;

const LeftGradient = styled.img`
  width: 1100px;
  height: 1000px;

  position: absolute;
  top: -45%;
  left: -35%;

  z-index: 0;
`;

const RightGradient = styled.img`
  width: 1200px;
  height: 1200px;

  position: absolute;
  bottom: -75%;
  right: -42%;

  z-index: 0;
`;
