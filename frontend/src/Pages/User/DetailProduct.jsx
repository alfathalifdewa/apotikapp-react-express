// src/Pages/User/DetailProduct.js
import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Plus, Dash } from 'react-bootstrap-icons';
import Header from '../../Components/User/Header';
import Footer from '../../Components/User/Footer';
import { Container, Row, Col, Breadcrumb, Image, Button } from 'react-bootstrap';
import '../../assets/css/DetailProduct.css';
import api from '../../api';
import FloatingCart from '../../Components/User/FloatingCart';
import { CartContext } from '../../contexts/CartContext';

const DetailProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [itemCount, setItemCount] = useState(1);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data.product);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(number);
  };

  const handleAddToCart = async () => {
    try {
      await addToCart(id, itemCount);
      setItemCount(1); // Reset itemCount after adding to cart
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleIncrement = () => {
    setItemCount(itemCount + 1);
  };

  const handleDecrement = () => {
    if (itemCount > 1) {
      setItemCount(itemCount - 1);
    }
  };

  return (
    <>
      <Header />
      <FloatingCart />
      <Container className="detail-product-container">
        <Breadcrumb className="breadcrumb">
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>
            Beranda
          </Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/products' }}>
            Product
          </Breadcrumb.Item>
          <Breadcrumb.Item active>{product?.productName}</Breadcrumb.Item>
        </Breadcrumb>
        {product ? (
          <Row className="detail-product">
            <Col md={4} className="detail-product-image">
              <Image src={product.image} alt={product.productName} fluid />
            </Col>
            <Col md={8} className="product-details">
              <h3>{product.productName}</h3>
              <h4 className="detail-product-price">
                <span>{formatRupiah(product.price)}</span>
              </h4>
              <p className="per-strip">Per STRIP</p>
              <div className="detail-product-actions">
                <Button variant="primary" className="cart-button" onClick={handleAddToCart}>
                  + Tambah ke Keranjang
                </Button>
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <Button variant="outline-primary" className="cart-button" onClick={handleDecrement}>
                    <Dash />
                  </Button>
                  <span>{itemCount}</span>
                  <Button variant="primary" className="cart-button" onClick={handleIncrement}>
                    <Plus />
                  </Button>
                </div>
              </div>
              <hr />
              <div className="product-deskripsi">
                <h3>Deskripsi</h3>
                <p>{product.desc}</p>
                <h4>Indikasi / Kegunaan</h4>
                <p>{product.indication}</p>
                <h4>Kandungan / Komposisi</h4>
                <p>{product.composition}</p>
                <h4>Dosis</h4>
                <p>{product.dose}</p>
                <h4>Cara Pemakaian</h4>
                <p>{product.howtouse}</p>
                <h4>Golongan</h4>
                <p>{product.group}</p>
                <h4>Efek Samping</h4>
                <p>{product.effect}</p>
                <h4>Nomor Ijin Edar (NIE)</h4>
                <p>{product.nie}</p>
              </div>
            </Col>
          </Row>
        ) : (
          <p>Loading...</p>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default DetailProduct;
