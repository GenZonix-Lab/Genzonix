import React from 'react'
import { NavLink } from 'react-router-dom';
const Inventory = () => {
    
        try {
            async function fetchdata() {
                const response = await fetch("https://ki4mm5ajnj.execute-api.ap-south-1.amazonaws.com/prod/add");
                if (!response.ok) {
                    throw new Error('Network response was not ok in fetch data ' + response.statusText);
                }
                const data = await response.json();
                const products = JSON.parse(data.body); // Assuming the body contains a JSON string
                const table=document.getElementById('productTable');
                table.innerHTML = "";
                products.forEach(element => {
                    const datas=[element.productCode,element.title,element.description,element.category,element.brand,element.sku,element.thumbnail,element.price,element.stock];
                    const tr=document.createElement('tr');
                    datas.forEach(data => {
                        const td = document.createElement('td');
                        td.textContent = data;
                        tr.appendChild(td);
                    });
                    table.appendChild(tr);
                });
             }
             fetchdata();
        } catch (error) {
            console.error('Error fetching products:', error);
        }
  return (
    <>
        <div className="container">
            <div>
                <h1 className="text-center">INVENTORY MANAGEMENT</h1>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Product ID</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Category</th>
                                <th>Brand</th>
                                <th>SKU</th>
                                <th>Images</th>
                                <th>Price</th>
                                <th>Stock</th>
                            </tr>
                        </thead>
                        <tbody id="productTable"></tbody>
                    </table>
                </div>
                <NavLink to='/posting' className="nav-link text-center">
                    <button className='btn btn-default p-1 px-2'>
                        <h5>AddProduct</h5>
                    </button>
                </NavLink>
            </div>
        </div>
        <hr />
    </>
  )
}

export default Inventory