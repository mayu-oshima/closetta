import styled from 'styled-components';
import { media } from './styles/media';
import { SInner } from './styles/inner';
import { Link, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { useUser } from './providers/user';
import { auth } from './firebase';
import { useCart } from './providers/cart';

export const Header = () => {
  const { cartItems } = useCart();
  const cartNum = () => {
    const num = cartItems.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0)
    let result: string = '';
    if(num > 9) {
      result = '9+';
    } else {
      result = String(num);
    }
    return result;
  }

  const { userAccount, setLatestOrder } = useUser();

  const location = useLocation();

  const logOut = () => {
    signOut(auth);
    setLatestOrder(null);
    alert('ログアウトしました');
  }

  return (
    <Sheader>
      <SInner>
        <SHeaderBox cartNum={cartNum()}>
          <Link to={'/'} className='logo'>
            <img src="/images/closetta_logo.png" alt="" />
          </Link>
          <div className='info'>
            {userAccount ? (
              <>
                <p className='user_name'>{userAccount.email}様</p>
                <button className='btn' onClick={logOut}>ログアウト</button>
              </>
            ) : (
              <>
                <Link to={'/signup/'} state={{ from: location }} className='btn'>新規登録</Link>
                <Link to={'/login/'} state={{ from: location }} className='btn'>ログイン</Link>
              </>
            )}
            <Link className='btn' to={'/cart/'}>
              <div className='cart'>
                <p className='num'>{cartNum()}</p>
                <img src='/images/icon_cart.png' alt='CLOSETTA'/>
              </div>
            </Link>
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

const SHeaderBox = styled.div<{cartNum: string}>`
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
    .cart {
      width: 25px;
      position: relative;
      .num {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 13px;
        height: 13px;
        background-color: #ff0e0e;
        border-radius: 50%;
        font-weight: 700;
        font-size: 1.0rem;
        position: absolute;
        top: -1px;
        left: 3px;
        letter-spacing: -.09em;
        transition: all .3s ease;
        scale: ${props => props.cartNum !== '0' ? '1' : '0'};
      }
      img {
        width: 100%;
      }
    }
  }
  .info {
    display: flex;
    align-items: center;
    .user_name {
      ${media.sp`
        display: none;
      `}
    }
  }
`;