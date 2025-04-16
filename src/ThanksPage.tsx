import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ThanksPage = () => {
  return(
    <SMainBox>
      <SThanksBox>
        <p className='message'>ご注文ありがとうございます！</p>
        <Link className='btn' to={'/'}>トップページへ戻る</Link>
      </SThanksBox>
    </SMainBox>
  );
}

export default ThanksPage;

const SMainBox = styled.div`
  padding: 40px 0;
`;

const SThanksBox = styled.div`
  text-align: center;
  color: #fff;
  .message {
    font-size: 2.3rem;
    margin-bottom: 50px;
  }
  .btn {
    padding: 10px;
    border: none;
    font-size: 1.6rem;
    background-color: #ddd;
    text-align: center;
    color: #000;
    text-decoration: none;
    min-width: 270px;
  }
`;