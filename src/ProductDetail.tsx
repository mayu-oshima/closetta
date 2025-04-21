import { useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { SInner } from './styles/inner';
import { media } from './styles/media';

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


	const [popup, setPopup] = useState<boolean>(false);

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
		setPopup(true);
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
			<SPopup popup={popup}>
				<button className='btn_close' onClick={() => setPopup(false)}></button>
				<p className='messsage'>カートにアイテムを入れました</p>
				<div className='box_product'>
					<img src={currentProduct.image} alt={currentProduct.name} />
					<div>
						<p>{currentProduct.name}</p>
						<p>¥{currentProduct.price}<span className='tax'>(税込)</span></p>
					</div>
				</div>
				<div className='box_popup'>
					<button className='popup_btn' onClick={() => setPopup(false)}>続けて買い物する</button>
					<Link className='popup_btn' to={'/cart/'}>カートを見る</Link>
				</div>
			</SPopup>
		</>
	);
};

const SProductBox = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	${media.sp`
		flex-direction: column;
		align-items: center;
	`}
`;

const SProductImg = styled.img`
	width: 49%;
	${media.sp`
		width: 100%;
	`}
`;

const SProductInfo = styled.div`
	padding: 50px;
	background-color: #fff;
	width: 49%;
	${media.sp`
		padding: 20px;
		width: 100%;
		margin-top: 20px;
	`}
`;

const SProductTtl = styled.h1`
	font-size: 2.0rem;
	${media.sp`
		font-size: 1.6rem;
	`}
`;

const SProductPrice = styled.p`
	color: #e62b4f;
	font-size: 5.0rem;
	font-weight: 700;
	${media.sp`
		font-size: 2.8rem;
	`}
	.tax {
		font-size: 30%;
		margin-left: 2px;
		${media.sp`
			font-size: 40%;
		`}
	}
`;

const SProductButton = styled.button`
	background-color: #000;
	border: none;
	padding: 10px 20px;
	border-radius: 0px;
	color: #fff;
	font-size: 1.8rem;
	${media.sp`
		padding: 8px 20px;
		font-size: 1.5rem;
	`}
`;

const SProductDescription = styled.p`
	margin-top: 20px;
`;

const SPopup = styled.div<{popup: boolean}>`
	position: fixed;
	bottom: 50px;
	right: 50px;
	background-color: #000;
	width: 320px;
	padding: 20px;
	padding-top: 15px;
	border: 1px solid #ccc;
	color: #fff;
	transition: all .4s ease;
	@media (min-width: 980px) {
		translate: ${props => (props.popup ? '0 0' : 'calc(100% + 60px) 0')};
	}
	@media(max-width: 979px) {
		width: 90%;
		max-width: 400px;
		bottom: 10px;
		left: 50%;
		translate: -50% 0;
		translate: ${props => (props.popup ? '-50% 0' : '-50% calc(100% + 60px)')};
	}
	.btn_close {
		width: 15px;
		height: 15px;
		position: absolute;
		top: 18px;
		right: 18px;
		&::before, &::after {
			content: '';
			display: block;
			width: 100%;
			height: 2px;
			background-color: #fff;
			rotate: 45deg;
			position: absolute;
			top: 50%;
			left: 50%;
			translate: -50% -50%;
		}
		&::after {
			rotate: -45deg;
		}
	}
	.messsage {
		border-bottom: 1px solid #fff;
		padding-bottom: 10px;
	}
	.box_product {
		display: flex;
		padding: 15px 0;
		border-bottom: 1px solid #fff;
		img {
			width: 35%;
			margin-right: 10px;
		}
		.tax {
			font-size: 70%;
		}
	}
	.box_popup {
		display: flex;
		justify-content: space-between;
		padding-top: 15px;
		.popup_btn {
			background-color: #fff;
			width: 48%;
			text-align: center;
			text-decoration: none;
			line-height: 1.2;
			padding: 6px 10px;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #222;
		}
	}
`;