import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled, {createGlobalStyle} from 'styled-components';

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
import OrderPage from './OrderPage';
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
              <Route path='/order/' element={<OrderPage/>}/>
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
  }
`;

const SMain = styled.main`
  padding-top: 80px;
`;