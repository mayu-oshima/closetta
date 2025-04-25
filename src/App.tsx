import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled, {createGlobalStyle} from 'styled-components';
import { media } from './styles/media';

//ユーザー情報
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from './firebase';
import { UserProvider, useUser } from './providers/user';

//ページのインポート
import { ProductList } from './ProductList';
import { ProductDetail } from './ProductDetail';
import SignupPage from './Signup';
import LoginPage from './Login';
import CartPage from './CartPage';
import SelectPage from './order/SelectPage';
import ConfirmPage from './order/ConfirmPage';
import ThanksPage from './ThanksPage';

//パーツのインポート
import { Header } from './Header';

//カート
import { CartProvider } from './providers/cart';

export const App = () => {

  return (
    <UserProvider>
      <CartProvider>
        <BrowserRouter>
          <GlobalStyle/>
          <Header/>
          <SMain>
            <Routes>
              <Route path="/" element={<ProductList/>} />
              <Route path='/product/:id' element={<ProductDetail/>} />
              <Route path='/signup/' element={<SignupPage/>}/>
              <Route path='/login/' element={<LoginPage/>}/>
              <Route path='/cart/' element={<CartPage/>}/>
              <Route path='/order/select.html' element={<SelectPage/>}/>
              <Route path='/order/confirm.html' element={<ConfirmPage/>}/>
              <Route path='/thanks/' element={<ThanksPage/>}/>
            </Routes>
          </SMain>
        </BrowserRouter>
      </CartProvider>
    </UserProvider>
  );
}

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 10px;
  }
  body {
    font-family: "游ゴシック体", YuGothic, "游ゴシック Medium", "Yu Gothic Medium", "游ゴシック", "Yu Gothic", sans-serif;
    font-size: 1.5rem;
    color: #222;
    background-color: #0f0f0e;
    line-height: 1.7;
    letter-spacing: .03em;
    margin: 0;
    ${media.sp`
      font-size: 1.4rem;
    `}
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    button {
      background-color: transparent;
      border: none;
      cursor: pointer;
      transition: all .4s ease;
      &:hover {
        opacity: .6;
      }
    }
    a {
      transition: all .4s ease;
      &:hover {
        opacity: .6;
      }
    }
    input {
      border: none;
      &[type="text"] {
        padding: 5px;
      }
      &[type="radio"] {
        scale: 1.5;
      }
    }
    select {
      border: none;
      padding: 5px;
    }
  }
  ${media.pc`
    ._pc-none {
      display: none;
      }
  `}
  ${media.sp`
    ._sp-none {
      display: none;
      }
  `}
`;

const SMain = styled.main`
  padding: 80px 0;
  ${media.sp`
    padding: 60px 0;
  `}
`;