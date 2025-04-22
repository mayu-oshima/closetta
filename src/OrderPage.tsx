import {useState, FormEvent} from 'react';

import styled from 'styled-components';
import { media } from './styles/media';
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

  const [paymentSelect, setPaymentSelect] = useState('');

  return(
    <SMainBox>
      <PageTtl>お届け先 / お支払い方法入力・<br className='_pc-none'/>注文内容の確認</PageTtl>
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
              <h2 className='mini_ttl'>お支払い方法</h2>
              <div className='payment'>
                <div className='item'>
                  <label className='label'>
                    <input className='input_radio' type="radio" name='payment' value="credit" onChange={e => setPaymentSelect(e.target.value)}/>
                    <span className='ttl_item'>クレジットカード</span>
                  </label>
                  <SSubBox open={'credit' === paymentSelect}>
                    <div className='box credit'>
                      <label className='sub_item'>
                        <span className='sub_ttl_item'>カード番号</span>
                        <input className='sub_input' type="text" name='credit_num'/>
                      </label>
                      <label className='sub_item'>
                        <span className='sub_ttl_item'>セキュリティコード</span>
                        <input className='sub_input' type="text" name='security_code'/>
                      </label>
                      <label className='sub_item'>
                        <span className='sub_ttl_item'>有効期限</span>
                        <div className='sub_input expiry'>
                          <div className='item_expiry'>
                            <select className='expiry_select' name="expiry_month">
                              <option value="01">01</option>
                              <option value="02">02</option>
                              <option value="03">03</option>
                              <option value="04">04</option>
                              <option value="05">05</option>
                              <option value="06">06</option>
                              <option value="07">07</option>
                              <option value="08">08</option>
                              <option value="09">09</option>
                              <option value="10">10</option>
                              <option value="11">11</option>
                              <option value="12">12</option>
                            </select>
                            <span className="unit">月</span>
                          </div>
                          <div className='item_expiry'>
                            <select className='expiry_select' name="expiry_year">
                              <option value="25">25</option>
                              <option value="26">26</option>
                              <option value="27">27</option>
                              <option value="28">28</option>
                              <option value="29">29</option>
                              <option value="30">30</option>
                              <option value="31">31</option>
                              <option value="32">32</option>
                              <option value="33">33</option>
                              <option value="34">34</option>
                              <option value="35">35</option>
                            </select>
                            <span className="unit">年</span>
                          </div>
                        </div>
                      </label>
                      <label className='sub_item'>
                        <span className='sub_ttl_item'>支払い回数</span>
                        <select className='sub_input' name="times">
                          <option value="">一括払い</option>
                          <option value="">2回払い</option>
                          <option value="">3回払い</option>
                          <option value="">6回払い</option>
                          <option value="">12回払い</option>
                          <option value="">24回払い</option>
                          <option value="">リボ払い</option>
                          <option value="">ボーナス払い</option>
                        </select>
                      </label>
                    </div>
                  </SSubBox>
                </div>
                <div className='item'>
                  <label className='label'>
                    <input className='input_radio' type="radio" name='payment' value="delivery" onChange={e => setPaymentSelect(e.target.value)}/>
                    <span className='ttl_item'>代金引換<span className='small'>（手数料：¥330）</span></span>
                  </label>
                </div>
                <div className='item'>
                  <label className='label'>
                    <input className='input_radio' type="radio" name='payment' value="conveni" onChange={e => setPaymentSelect(e.target.value)}/>
                    <span className='ttl_item'>コンビニ<span className='small'>（手数料：¥330）</span></span>
                  </label>
                  <SSubBox open={'conveni' === paymentSelect}>
                    <div className='box conveni'>
                      <label className='sub_item'>
                        <input className='input_radio' type="radio" value='lawson' name='conveni'/>
                        <span className='sub_ttl_item'>ローソン</span>
                      </label>
                      <label className='sub_item'>
                        <input className='input_radio' type="radio" value='familyM' name='conveni'/>
                        <span className='sub_ttl_item'>ファミリーマート</span>
                      </label>
                      <label className='sub_item'>
                        <input className='input_radio' type="radio" value='ministop' name='conveni'/>
                        <span className='sub_ttl_item'>ミニストップ</span>
                      </label>
                      <label className='sub_item'>
                        <input className='input_radio' type="radio" value='daily' name='conveni'/>
                        <span className='sub_ttl_item'>デイリーヤマザキ</span>
                      </label>
                      <label className='sub_item'>
                        <input className='input_radio' type="radio" value='7eleven' name='conveni'/>
                        <span className='sub_ttl_item'>セブンイレブン</span>
                      </label>
                    </div>
                  </SSubBox>
                </div>
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
  ${media.sp`
    
  `}
`;

const PageTtl = styled.h1`
  font-size: 3.5rem;
  color: #fff;
  text-align: center;
  margin-bottom: 50px;
  ${media.sp`
    font-size: 2.3rem;
    margin-bottom: 30px;
  `}
`;

const SCartBox = styled.form`
  display: flex;
  align-items: flex-start;
  color: #fff;
  ${media.sp`
    display: block;
  `}
  .input_radio {
    margin-right: 13px;
  }
  .warp_content {
    flex: 1;
    .content {
      &:nth-child(n+2) {
        margin-top: 70px;
        ${media.sp`
          margin-top: 40px;
        `}
      }
    }
    .mini_ttl {
      font-size: 1.8rem;
      border-bottom: 1px solid #fff;
      margin-bottom: 50px;
      font-weight: 700;
      padding-bottom: 10px;
      ${media.sp`
        font-size: 1.6rem;
        margin-bottom: 30px;
      `}
    }
    .address {
      .item {
        display: flex;
        align-items: center;
        font-size: 1.6rem;
        &:nth-child(n+2) {
          margin-top: 40px;
          ${media.sp`
            margin-top: 23px;
          `}
        }
        .ttl_item {
          width: 200px;
          margin-right: 10px;
          ${media.sp`
            width: 80px;
            margin-right: 5px;
          `}
        }
        .input {
          flex: 1;
          padding: 5px;

        }
      }
    }
    .payment {
      .item {
        &:nth-child(n+2) {
          margin-top: 20px;
        }
        .label {
          display: flex;
          align-items: center;
        }
        .ttl_item {
          flex: 1;
          .small {
            font-size: 70%;
          }
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
          font-size: 1.5rem;
          ${media.sp`
            margin-left: 15px;
            font-size: 1.3rem;
          `}
        }
        .price {
          font-size: 1.5rem;
          margin-left: 20px;
          ${media.sp`
            margin-left: 10px;
          `}
        }
      }
    }
  }
  .confirm {
    padding: 50px;
    margin: 0 auto;
    border: 1px solid #555;
    margin-left: 60px;
    ${media.sp`
      padding: 20px;
      margin-left: 0;
      margin-top: 20px;
    `}
    .box_total {
      display: flex;
      justify-content: space-between;
      font-size: 2.0rem;
      font-weight: 700;
      margin-bottom: 20px;
      ${media.sp`
        font-size: 1.8rem;
        margin-bottom: 15px;
      `}
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

const SSubBox = styled.div<{open: boolean}>`
  transition: all .4s ease;
  max-height: ${props => props.open ? '1000px' : '0'};
  opacity: ${props => props.open ? '1' : '0'};
  overflow: hidden;
  .box {
    background-color: #555;
    padding: 30px;
    margin-top: 15px;
    ${media.sp`
      padding: 15px;
      font-size: 1.3rem;
    `}
    .sub_item {
      display: flex;
      align-items: center;
      &:nth-child(n+2) {
        margin-top: 30px;
        ${media.sp`
          margin-top: 15px;
        `}
      }
    }
    &.credit {
      .sub_ttl_item {
        width: 170px;
        margin-right: 10px;
        ${media.sp`
          width: 100px;
          margin-right: 5px;
        `}
      }
      .sub_input {
        flex: 1;
        &.expiry {
          display: flex;
          justify-content: space-between;
          .item_expiry {
            width: 48.5%;
            display: flex;
            align-items: center;
            .expiry_select {
              flex: 1;
            }
            .unit {
              margin-left: 7px;
            }
          }
        }
      }
    }
    &.conveni {

    }
  }
`;