import axios from "axios";
import React, {useEffect, useState} from 'react'
import MainLayout from "../layout/MainLayout";
// import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';



export default function CashierPage() {

  const [products, setProducts] = useState([]);

  const fetchProducts = async() => {
    const result = await axios.get('products');  // FIX ME 
    setProducts(await result.data);
  }
  
  useEffect(() =>{
    fetchProducts();
  }, []);

  // For testing, delete later
  useEffect(()=>{
    console.log(products);
  }, [products])

  return (
    <MainLayout>
      <div className='row'>
        <div className="column person">
            <h2>Online Orders</h2>
          </div>
        <div className='column ' id="col-products">
          {products.map((product, key) =>
            <div key={key} className='col-products-loop'>
              <Stack spacing={5}>
                {/* <Button variant="contained" style={{ maxHeight: '140px',minHeight: '140px', display: "block", textAlign: "center" }} sx={{ borderColor: 'primary.main' }} className='item'>
                  <div>{product.name}</div>
                  <div>${product.price}</div>
                </Button> */}
                <button className="item">
                  <div>{product.name}</div>
                  <div>${product.price}</div>
                </button>
              </Stack>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  )
}
