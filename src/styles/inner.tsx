import styled from "styled-components";
import { media } from './media';

export const SInner = styled.div`
  width: 980px;
  margin: 0 auto;
  ${media.sp`
    width: 94%;
  `}
`;