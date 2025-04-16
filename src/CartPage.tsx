import styled from 'styled-components';
import { SInner } from './styles/inner';

import { Link } from 'react-router-dom';

import { useCart } from './providers/cart';

const CartPage = () => {
const { cartItems, removeFromCart, updateQuantity, total } = useCart();

  return(
    <SMainBox>
      <PageTtl>ショッピングカート</PageTtl>
      <SInner>
          { cartItems.length !== 0 ? (
            <SCartBox>
              <div className='warp_ul_cart'>
                <ul className='ul_cart'>
                  {cartItems.map(item => (
                    <li key={item.id}>
                      <img className='img' src={item.image} alt={item.name} />
                      <div className='name'>
                        <p>{item.name}</p>
                        <p>¥{item.price}</p>
                      </div>
                      <div className='quantity'>
                        <select className='sele_quantity' value={item.quantity} onChange={e => updateQuantity(item.id, Number(e.target.value))}>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                        </select>
                        <button className='delete_btn' onClick={() => removeFromCart(item.id)}>削除</button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className='total'>
                  <div className='box_total'>
                    <p>商品合計</p>
                    <p>¥{total}</p>
                  </div>
                </div>
              </div>
              <div className='tocash'>
                <Link className='btn' to={'/order/'}>レジへ進む</Link>
                <div className='continue'>
                  <Link to={'/'}>ショッピングを続ける</Link>
                </div>
              </div>
            </SCartBox>
          ) : (
            <SEmptyBox>
              <p className='message'>カートは空です</p>
              <Link className='btn' to={'/'}>ショッピングを続ける</Link>
            </SEmptyBox>
          ) }
      </SInner>
    </SMainBox>
  );
}

export default CartPage;

const SMainBox = styled.div`
  padding: 40px 0;
`;

const PageTtl = styled.h1`
  font-size: 3.5rem;
  color: #fff;
  text-align: center;
  margin-bottom: 70px;
`;

const SCartBox = styled.div`
  display: flex;
  align-items: flex-start;
  color: #fff;
  margin-top: 50px;
  .warp_ul_cart {
    flex: 1;
    .ul_cart {
      & > li {
        display: flex;
        align-items: center;
        padding: 40px 0;
        &:first-child {
          padding-top: 0;
        }
        &:nth-child(n+2) {
          border-top: 1px solid #555;
        }
        .img {
          width: 200px;
        }
        .name {
          flex: 1;
          margin-left: 20px;
          font-size: 1.8rem;
        }
        .quantity {
          .sele_quantity {
            padding: 5px;
          }
          .delete_btn {
            color: #fff;
            margin-left: 20px;
          }
        }
      }
    }
    .total {
      display: flex;
      justify-content: flex-end;
      border-top: 1px solid #555;
      padding-top: 40px;
      .box_total {
        display: flex;
        justify-content: space-between;
        width: 260px;
        font-size: 1.8rem;
      }
    }
  }
  .tocash {
    padding: 50px;
    margin: 0 auto;
    border: 1px solid #555;
    margin-left: 60px;
    .btn {
      padding: 10px;
      border: none;
      font-size: 1.6rem;
      width: 100%;
      background-color: #ddd;
      display: block;
      text-align: center;
      color: #000;
      text-decoration: none;
      min-width: 270px;
    }
    .continue {
      text-align: center;
      margin-top: 20px;
      a {
        color: #fff;
        text-decoration: none;
      }
    }
  }
`;

const SEmptyBox = styled.div`
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