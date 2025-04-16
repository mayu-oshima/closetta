import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { SInner } from './styles/inner';


export const ProductList = () => {
  type listProductsType = {
    id: number;
    name: string;
    category: string;
    price: number;
    image: string;
    description: string;
  }
  const [listProducts, setListProducts] = useState<listProductsType[]>([]);
  
  axios
  .get('/data.json')
  .then(result => {
    setListProducts(result.data);
  })
  return (
    <>
      <SInner>
        <SListProducts>
          {listProducts.map(product => (
            <li>
              <SroductLink to={`/product/${product.id}`}>
                <SProductImg src={product.image} alt={product.name} />
                <SProductCategory>{product.category}</SProductCategory>
                <SProductPrice>¥{product.price}</SProductPrice>
              </SroductLink>
            </li>
          ))}
        </SListProducts>
      </SInner>
    </>
  );
}




const SListProducts = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  &::before, &::after {
    content: '';
    display: block;
    width: 24%;
    order: 1;
  }
  > li {
    width: 24%;
    list-style-type: none;
    text-decoration: none;
    &:nth-child(n + 5) {
      margin-top: 40px;
    }
  }
`;

const SroductLink = styled(Link)`
  text-decoration: none;
  color: #fff;
`;

const SProductName = styled.h3`
  font-size: 2.5rem;
`;

const SProductImg = styled.img`
  width: 100%;
`;

const SProductCategory = styled.p`
  
`;

const SProductPrice = styled.p`
  font-size: 2.0rem;
`;