import styled from 'styled-components';

export const SMainBox = styled.div`
  padding: 40px 0;
`;

export const PageTtl = styled.h1`
  font-size: 3.5rem;
  color: #fff;
  text-align: center;
`;

export const SFormBoxWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
`;

export const SFormBox = styled.div`
  padding: 50px;
  margin: 0 auto;
  border: 1px solid #555;
  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .input {
    padding: 10px;
    border: none;
    width: 300px;
    &:nth-child(n+2) {
      margin-top: 20px;
    }
  }
  button {
    margin-top: 40px;
    padding: 10px;
    border: none;
    font-size: 1.6rem;
    width: 100%;
    background-color: #ddd;
  }
`;