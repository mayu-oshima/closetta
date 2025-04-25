import {useState, FormEvent, useEffect} from 'react';

import styled, {css} from 'styled-components';
import { media } from '../styles/media';
import { SInner } from '../styles/inner';

import { useNavigate, Link } from 'react-router-dom';

import { useCart } from '../providers/cart';

import { auth, db } from '../firebase';
import { collection, getDocs, orderBy, query, limit } from 'firebase/firestore';


const ConfirmPage = () => {
  type latestOrderType = {
    name: string;
    postal: string;
    address: string;
    phone: string;
    payment: string;
  };
  const [latestOrder, setLatestOrder] = useState<latestOrderType | null>(null);

  const { cartItems, total, clearCart } = useCart();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearCart();
    navigate('/thanks/');
  }

  const user = auth.currentUser;
  if(user) {
    console.log(user.uid);
  }


  useEffect(() => {
    const fetchOrders = async () => {
      if(!user) return;

      const ordersRef = collection(db, 'users', user.uid, 'orders');
      const q = query(ordersRef, orderBy('timestamp', 'desc'), limit(1));
      const snapshot = await getDocs(q);
      console.log(snapshot);

      //if(!snapshot.empty) {
        const doc = snapshot.docs[0];
        console.log('hello');
        console.log(doc);

        setLatestOrder(doc.data() as any);
      //}
    }

    fetchOrders();
  }, [user]);


  return(
    <SMainBox>
      <PageTtl>注文内容の確認</PageTtl>
      <SInner>
        <SCartBox onSubmit={handleSubmit}>
          <div className='warp_content'>
            <div className='content'>
              <h2 className='mini_ttl'>お届け先</h2>
              <div>
                {latestOrder ? (
                  <>
                    <p>{latestOrder.name} 様</p>
                    <p>住所：〒{latestOrder.postal} {latestOrder.address}</p>
                    <p>電話：{latestOrder.phone}</p>
                  </>
                ) : (
                  <p>読み込み中</p>
                )}
              </div>
              <SButtonWrap>
                <SLink to={'/order/select.html'}>変更</SLink>
              </SButtonWrap>
            </div>
            <div className='content'>
              <h2 className='mini_ttl'>お支払い方法</h2>
              <div>
                {latestOrder?.payment === 'credit' && (
                  <p>クレジットカード</p>
                )}
                {latestOrder?.payment === 'delivery' && (
                  <p>代金引換 手数料：¥330</p>
                )}
                {latestOrder?.payment === 'conveni' && (
                  <p>コンビニ 手数料：¥330</p>
                )}
              </div>
              <SButtonWrap>
                <SLink to={'/order/select.html'}>変更</SLink>
              </SButtonWrap>
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
              <SButtonWrap>
                <SLink to={'/cart/'}>変更</SLink>
              </SButtonWrap>
            </div>
          </div>
          <div className='confirm'>
            <div className='box_total'>
              <p>商品合計<span className='tax'>税込</span></p>
              <p>¥{total}</p>
            </div>
            <SButton type='submit'>注文を確定する</SButton>
          </div>
        </SCartBox>
      </SInner>
    </SMainBox>
  );
}

export default ConfirmPage;

const SMainBox = styled.div`
  ${media.sp`
    
  `}
`;

const buttonStyle = css`
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
`;

const SButton = styled.button`
  ${buttonStyle}
`;

const SLink = styled(Link)`
  ${buttonStyle}
`;

const SButtonWrap = styled.div`
  text-align: center;
  margin-top: 40px;
  ${SButton},${SLink} {
    display: inline-block;
    width: auto;
  }
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
  }
`;