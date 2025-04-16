import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { SInner } from './styles/inner';

import { useCart } from './providers/cart';


export const ProductDetail = () => {
	const [currentProduct, setCurrentProduct] = useState<TProduct>({
		id: 0,
		name: '',
		category: '',
		price: 0,
		image: '',
		description: '',
	});

	type TProduct = {
		id: number;
		name: string;
		category: string;
		price: number;
		image: string;
		description: string;
	}

	const { id } = useParams();
	axios.get('/data.json').then(res => {
		const Product = res.data.find((item:TProduct) => item.id === Number(id));
		setCurrentProduct(Product);
	});

	const { cartItems, addToCart } = useCart()!;
	const cardAdd = () => {
		addToCart({
			id: currentProduct.id,
			name: currentProduct.name,
			price: currentProduct.price,
			image: currentProduct.image,
			quantity: 1,
		});
		alert('カートに追加しました');
	}

	return (
		<>
			<SInner>
				<SProductBox>
					<SProductImg src={currentProduct.image} alt={currentProduct.name} />
					<SProductInfo>
						<SProductTtl>{currentProduct.name}</SProductTtl>
						<SProductPrice>¥{currentProduct.price}<span className='tax'>税込</span></SProductPrice>
						<SProductButton onClick={cardAdd}>カートに入れる</SProductButton>
						<SProductDescription>{currentProduct.description}</SProductDescription>
					</SProductInfo>
				</SProductBox>
			</SInner>
		</>
	);
};

const SProductBox = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
`;

const SProductImg = styled.img`
	width: 49%;
`;

const SProductInfo = styled.div`
	padding: 50px;
	background-color: #fff;
	width: 49%;
`;

const SProductTtl = styled.h1`
	font-size: 2.0rem;
`;

const SProductPrice = styled.p`
	color: #e62b4f;
	font-size: 5.0rem;
	font-weight: 700;
	.tax {
		font-size: 30%;
		margin-left: 2px;
	}
`;

const SProductButton = styled.button`
	background-color: #000;
	border: none;
	padding: 10px 20px;
	border-radius: 0px;
	color: #fff;
	font-size: 1.8rem;
`;

const SProductDescription = styled.p`
	margin-top: 20px;
`;