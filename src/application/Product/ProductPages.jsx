import React from 'react'
import { useParams } from 'react-router-dom';
import Buyout from './Buyout'
import Missing from '../../Missing'

const ProductPages = () => {
    const {productId} = useParams();
    const CompList = {
        "buyout": Buyout
    };
    const SelectedComp = CompList[productId] || Missing
  return (
    <div>
        <SelectedComp/>
    </div>
  )
}

export default ProductPages