import styled from 'styled-components';
import { media } from './styles/media';
import { SInner } from './styles/inner';
import { Link, useLocation } from 'react-router-dom';
import { signOut, User } from 'firebase/auth';
import { useUser } from './providers/user';
import { auth } from './firebase';

export const Header = () => {
  const user: User | null = useUser();

  const location = useLocation();

  const logOut = () => {
    signOut(auth);
    alert('ログアウトしました');
  }

  return (
    <Sheader>
      <SInner>
        <SHeaderBox>
          <Link to={'/'} className='logo'>
            <img src="/images/closetta_logo.png" alt="" />
          </Link>
          <div className='info'>
            {user ? (
              <>
                <p className='user_name'>{user.email}様</p>
                <button className='btn' onClick={logOut}>ログアウト</button>
              </>
            ) : (
              <>
                <Link to={'/signup/'} state={{ from: location }} className='btn'>新規登録</Link>
                <Link to={'/login/'} state={{ from: location }} className='btn'>ログイン</Link>
              </>
            )}
            <Link className='btn' to={'/cart/'}>カート</Link>
          </div>
        </SHeaderBox>
      </SInner>
    </Sheader>
  );
};

const Sheader = styled.header`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  background-color: #0f0f0e;
  width: 100vw;
  color: #fff;
`;

const SHeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .logo {
    width: 150px;
    height: auto;
    padding: 15px 0;
    ${media.sp`
      width: 120px;
      padding: 10px 0;
    `}
    img {
      width: 100%;
    }
  }
  .btn {
    color: #fff;
    background-color: transparent;
    border: none;
    margin-left: 20px;
    text-decoration: none;
    cursor: pointer;
    padding: 15px 0;
    ${media.sp`
      font-size: 1.3rem;
      margin-left: 10px;
      padding: 10px 0;
    `}
  }
  .info {
    display: flex;
    .user_name {
      ${media.sp`
        display: none;
      `}
    }
  }
`;