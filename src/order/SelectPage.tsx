import {useState, FormEvent, useEffect} from 'react';

import styled from 'styled-components';
import { media } from '../styles/media';
import { SInner } from '../styles/inner';

import { useNavigate } from 'react-router-dom';

import { useCart } from '../providers/cart';
import { useUser } from '../providers/user';

import { auth, db } from '../firebase';
import { collection, addDoc, serverTimestamp, FieldValue } from 'firebase/firestore';


const SelectPage = () => {
  const { total } = useCart();
  const { latestOrder, setLatestOrder } = useUser();
  
  const navigate = useNavigate();

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!userData.payment) {
      alert('お支払い方法を選択してください');
      return;
    }

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      postal: formData.get('postal') as string,
      address: formData.get('address') as string,
      phone: formData.get('phone') as string,
      payment: userData.payment as string,
      credit: {
        credit_num: formData.get('credit_num') as string,
        security_code: formData.get('security_code') as string,
        expiry_month: formData.get('expiry_month') as string,
        expiry_year: formData.get('expiry_year') as string,
        times: formData.get('times') as string,
      },
      conveni: formData.get('conveni') as string,
      timestamp: serverTimestamp(),
    };

    const user = auth.currentUser;
    if(!user) {
      alert('ログインしていません');
      return;
    }

    try {
      await addDoc(collection(db, 'users', user.uid, 'orders'), data);
      setLatestOrder(data);
    } catch (error) {
      console.log('データの保存に失敗しました：' + error);
    }

    navigate('/order/confirm.html');
  }

  type userDataType = {
    name: string;
    postal: string;
    address: string;
    phone: string;
    payment: string;
    credit: {
      credit_num: string;
      security_code: string;
      expiry_month: string;
      expiry_year: string;
      times: string;
    },
    conveni: string;
    timestamp: FieldValue;
  };

  const [userData, setUserData] = useState<userDataType>({
    name: '',
    postal: '',
    address: '',
    phone: '',
    payment: '',
    credit: {
      credit_num: '',
      security_code: '',
      expiry_month: '',
      expiry_year: '',
      times: '',
    },
    conveni: '',
    timestamp: serverTimestamp(),
  });

  useEffect (() => {
    if(latestOrder) {
      setUserData(latestOrder);
    }
  }, [latestOrder]);


  return(
    <SMainBox>
      <PageTtl>お届け先・お支払い方法</PageTtl>
      <SInner>
        <SCartBox onSubmit={handleSubmit}>
          <div className='warp_content'>
            <div className='content'>
              <h2 className='mini_ttl'>お届け先</h2>
              <div className='address'>
                <label className='item'>
                  <span className='ttl_item'>お名前</span>
                  <input
                    className='input'
                    type="text"
                    name='name'
                    value={userData.name}
                    onChange={e => setUserData({...userData, name: e.target.value})}
                    required
                  />
                </label>
                <label className='item'>
                  <span className='ttl_item'>郵便番号</span>
                  <input
                    className='input'
                    type="text"
                    name='postal'
                    value={userData.postal}
                    onChange={e => setUserData({...userData, postal: e.target.value})}
                    required
                  />
                </label>
                <label className='item'>
                  <span className='ttl_item'>住所</span>
                  <input
                    className='input'
                    type="text"
                    name='address'
                    value={userData.address}
                    onChange={e => setUserData({...userData, address: e.target.value})}
                    required
                  />
                </label>
                <label className='item'>
                  <span className='ttl_item'>電話番号</span>
                  <input
                    className='input'
                    type="text"
                    name='phone'
                    value={userData.phone}
                    onChange={e => setUserData({...userData, phone: e.target.value})}
                    required
                  />
                </label>
              </div>
            </div>
            <div className='content'>
              <h2 className='mini_ttl'>お支払い方法</h2>
              <div className='payment'>
                <div className='item'>
                  <label className='label'>
                    <input className='input_radio'
                      type="radio"
                      name='payment'
                      value="credit"
                      checked={userData.payment === 'credit'}
                      onChange={e => setUserData(data => ({...data, payment: e.target.value}))}
                    />
                    <span className='ttl_item'>クレジットカード</span>
                  </label>
                  <SSubBox open={'credit' === userData.payment}>
                    <div className='box credit'>
                      <label className='sub_item'>
                        <span className='sub_ttl_item'>カード番号</span>
                        <input
                          className='sub_input'
                          type="text"
                          name='credit_num'
                          value={userData.credit.credit_num}
                          onChange={e => setUserData(data => ({
                            ...data,
                            credit: {
                              ...data.credit,
                              credit_num: e.target.value
                            }
                          }))}
                        />
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
                    <input
                      className='input_radio'
                      type="radio"
                      name='payment'
                      value="delivery"
                      checked={userData.payment === 'delivery'}
                      onChange={e => setUserData(data => ({...data, payment: e.target.value}))}
                    />
                    <span className='ttl_item'>代金引換<span className='small'>（手数料：¥330）</span></span>
                  </label>
                </div>
                <div className='item'>
                  <label className='label'>
                    <input className='input_radio'
                      type="radio"
                      name='payment'
                      value="conveni"
                      checked={userData.payment === 'conveni'}
                      onChange={e => setUserData(data => ({...data, payment: e.target.value}))}
                    />
                    <span className='ttl_item'>コンビニ<span className='small'>（手数料：¥330）</span></span>
                  </label>
                  <SSubBox open={'conveni' === userData.payment}>
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
          </div>
          <div className='confirm'>
            <div className='box_total'>
              <p>商品合計<span className='tax'>税込</span></p>
              <p className='total'>¥{total}</p>
            </div>
            <button className='btn' type='submit'>次へ進む</button>
          </div>
        </SCartBox>
      </SInner>
    </SMainBox>
  );
}

export default SelectPage;

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
      align-items: center;
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
      .total {
        font-size: 120%;
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