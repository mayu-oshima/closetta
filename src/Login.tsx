import { FormEvent, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { SInner } from './styles/inner';
import { SMainBox, PageTtl, SFormBoxWrap, SFormBox } from './styles/Form';

import { useNavigate, useLocation } from 'react-router-dom';

//ユーザー情報
import { auth } from './firebase';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] =  useState('');

  const navigate = useNavigate();
  const location = useLocation();


  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      alert(`こんにちは！${result.user.email}さん`);

      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch(error: any) {
      alert(error.message);
    }
  };

  return (
    <SMainBox>
      <PageTtl>ログイン</PageTtl>
      <SInner>
        <SFormBoxWrap>
          <SFormBox>
            <form onSubmit={handleLogin}>
              <input className='input' type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder='メールアドレス'/>
              <input className='input' type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder='パスワード'/>
              <button type='submit'>ログイン</button>
            </form>
          </SFormBox>
        </SFormBoxWrap>
      </SInner>
    </SMainBox>
  );
};

export default LoginPage;