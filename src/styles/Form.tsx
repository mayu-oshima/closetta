import styled from 'styled-components';
import { media } from './media';

export const SMainBox = styled.div`
  padding: 40px 0;
`;

export const PageTtl = styled.h1`
  font-size: 3.5rem;
  color: #fff;
  text-align: center;
  margin-bottom: 50px;
  ${media.sp`
    font-size: 2.5rem;
    margin-bottom: 30px;
  `}
`;

export const SFormBoxWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${media.sp`
    display: block;
  `}
`;

export const SFormBox = styled.div`
  padding: 50px;
  margin: 0 auto;
  border: 1px solid #555;
  ${media.sp`
    padding: 20px;
  `}
  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .input {
    padding: 10px;
    border: none;
    width: 300px;
    ${media.sp`
      width: 100%;
    `}
    &:nth-child(n+2) {
      margin-top: 20px;
      ${media.sp`
        margin-top: 15px;
      `}
    }
  }
  button {
    margin-top: 40px;
    padding: 10px;
    border: none;
    font-size: 1.6rem;
    width: 100%;
    background-color: #ddd;
    color: #000;
    ${media.sp`
      margin-top: 20px;
    `}
  }
`;