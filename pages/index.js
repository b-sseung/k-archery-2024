import Head from 'next/head';
import styled, { css } from 'styled-components';
import Body from '@/src/components/Body';

const ParentBox = styled.div(
  // flexCol,
  css`
    align-items: center;
    height: 100vh;
    background: white;
    overflow-x: hidden;

    /* iOS only */
    @supports (-webkit-touch-callout: none) {
      height: -webkit-fill-available;
    }
  `
);

export default function Home() {
  return (
    <ParentBox>
      <Head></Head>
      <Body></Body>
    </ParentBox>
  );
}
