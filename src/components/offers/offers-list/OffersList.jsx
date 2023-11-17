import React, { useEffect } from "react";
import { Col, Empty, Row, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Offer } from "@spanic/react-interview-components";
import { changeSelectedQty } from "../../../store/offers-slice";
import { fetchOffers } from "../../../thunks/offers.thunks";
import styled from "styled-components";

export default function OffersList() {
  const dispatch = useDispatch();
  const { offers, loading } = useSelector((state) => state.offers);

  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);

  const onChangeQty = (id, selectedQty) => {
    dispatch(changeSelectedQty({ id, selectedQty }));    
  };
  
  const OfferWrapper = ({ id, title, description, price, selectedQty }) => (
    <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
      <Offer
        data={{ id, title, description, price }}
        onChangeQty={(qty) => onChangeQty(id, qty)}
        selectedQty={selectedQty}
      />
    </Col>
  ); 

  if (loading) {
    return (
      <SpinContainer>
        <Spin />
      </SpinContainer>
    );
  }

  return offers.length ? (
    <Row gutter={[16, 16]}>
      {offers.map((offer) => (
        <OfferWrapper key={offer.id} {...offer} onChangeQty={onChangeQty} />
      ))}
    </Row>
  ) : (
    <Empty />
  );
}

const SpinContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;
