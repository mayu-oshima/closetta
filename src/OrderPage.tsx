import {FormEvent} from 'react';

import styled from 'styled-components';
import { SInner } from './styles/inner';

import { useNavigate } from 'react-router-dom';

import { useCart } from './providers/cart';

const OrderPage = () => {
  const { cartItems, total, clearCart } = useCart();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearCart();
    navigate('/thanks/');
  }

  return(
    <SMainBox>
      <PageTtl>お届け先入力・注文内容の確認</PageTtl>
      <SInner>
        <SCartBox onSubmit={handleSubmit}>
          <div className='warp_content'>
            <div className='content'>
              <h2 className='mini_ttl'>お届け先</h2>
              <div className='address'>
                <label className='item'>
                  <span className='ttl_item'>お名前</span>
                  <input className='input' type="text" name='name' required/>
                </label>
                <label className='item'>
                  <span className='ttl_item'>郵便番号</span>
                  <input className='input' type="text" name='postal' required/>
                </label>
                <label className='item'>
                  <span className='ttl_item'>住所</span>
                  <input className='input' type="text" name='address' required/>
                </label>
                <label className='item'>
                  <span className='ttl_item'>電話番号</span>
                  <input className='input' type="text" name='phone' required/>
                </label>
              </div>
            </div>
            <div className='content'>
              <h2 className='mini_ttl'>購入商品</h2>
              <ul className='ul_cart'>
                {cartItems.map(item => (
                  <li key={item.id}>
                    <img className='img' src={item.image} alt={item.name} />
                    <div className='name'>
                      <p>{item.name}</p>
                      <p>数量：{item.quantity}</p>
                    </div>
                    <p className='price'>
                    <p>¥{item.price}</p>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className='confirm'>
            <div className='box_total'>
              <p>商品合計<span className='tax'>税込</span></p>
              <p>¥{total}</p>
            </div>
            <button className='btn' type='submit'>注文を確定する</button>
          </div>
        </SCartBox>
      </SInner>
    </SMainBox>
  );
}

export default OrderPage;

const SMainBox = styled.div`
  padding: 40px 0;
`;

const PageTtl = styled.h1`
  font-size: 3.5rem;
  color: #fff;
  text-align: center;
`;

const SCartBox = styled.form`
  display: flex;
  align-items: flex-start;
  color: #fff;
  margin-top: 50px;
  .warp_content {
    flex: 1;
    .content {
      margin-top: 70px;
    }
    .mini_ttl {
      font-size: 1.8rem;
      border-bottom: 1px solid #fff;
      margin-bottom: 50px;
      font-weight: 700;
      padding-bottom: 10px;
    }
    .address {
      .item {
        display: flex;
        align-items: center;
        font-size: 1.6rem;
        &:nth-child(n+2) {
          margin-top: 40px;
        }
        .ttl_item {
          width: 200px;
        }
        .input {
          flex: 1;
          padding: 5px;

        }
      }
    }
    .ul_cart {
      & > li {
        display: flex;
        align-items: center;
        padding: 25px 0;
        &:first-child {
          padding-top: 0;
        }
        &:nth-child(n+2) {
          border-top: 1px solid #555;
        }
        .img {
          width: 100px;
        }
        .name {
          flex: 1;
          margin-left: 20px;
        }
      }
    }
  }
  .confirm {
    padding: 50px;
    margin: 0 auto;
    border: 1px solid #555;
    margin-left: 60px;
    .box_total {
      display: flex;
      justify-content: space-between;
      width: 260px;
      font-size: 2.0rem;
      font-weight: 700;
      margin-bottom: 20px;
      .tax {
        font-size: 60%;
        margin-left: 5px;
        font-weight: 500;
      }
    }
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

