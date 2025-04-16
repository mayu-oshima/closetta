import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { SInner } from './styles/inner';
import { SMainBox, PageTtl, SFormBoxWrap, SFormBox } from './styles/Form';
import { useNavigate, useLocation } from 'react-router-dom';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] =  useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      //「Firebase に、email と password を送って新しいユーザーを作る」処理
      await createUserWithEmailAndPassword(auth, email, password);
      alert('会員登録が完了しました。CLOSETTAでのお買い物をお楽しみください！');

      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });

    } catch(error) {
      alert(error.message);
    }
  };

  return (
    <SMainBox>
      <PageTtl>新規会員登録</PageTtl>
      <SInner>
        <SFormBoxWrap>
          <SFormBox>
            <form onSubmit={handleSignup}>
              <input className='input' type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder='メールアドレス'/>
              <input className='input' type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder='パスワード'/>
              <button type='submit'>登録する</button>
            </form>
          </SFormBox>
        </SFormBoxWrap>
      </SInner>
    </SMainBox>
  );
};

export default SignupPage;