import React from 'react'


const AddInventory = () => {
  return (
    <>
        <div className="container">
        <h1 className="text-center">Add Product</h1><hr />
        <div className="form-group mx-lg-4 px-lg-5">
            <form action="" method="post">
                <div>
                    <label htmlFor="productCode">PRODUCT ID</label>
                    <input type="text" name="productcode" id="productcode" className='form-control' required/>
                </div>
                <div>
                    <label htmlFor="title" >TITLE</label>
                    <input type="text" name="title" id="title" className='form-control' required/>
                </div>
                <div>
                    <label htmlFor="description">DESCRIPTION</label>
                    <input type="text" name="description" id="description" className='form-control' />
                </div>
                <div>
                    <label htmlFor="category">CATEGORY</label>
                    <input type="text" name="category" id="category" className='form-control' required/>
                </div>
                <div>
                    <label htmlFor="brand">BRAND</label>
                    <input type="text" name="brand" id="brand" className='form-control' required/>
                </div>
                <div>
                    <label htmlFor="sku">SKU</label>
                    <input type="text" name="sku" id="sku" className='form-control' required/>
                </div>
                <div>
                    <label htmlFor="images">IMAGES</label>
                    <input type="file" name="images[]" id="images" className='form-control' multiple/>
                </div>
                <div>
                    <label htmlFor="thumbnail">THUMBNAIL</label>
                    <input type="file" name="thumbnail" id="thumbnail" className='form-control'/>
                </div>
                <div>
                    <label htmlFor="price">PRICE</label>
                    <input type="text" name="price" id="price" className='form-control' />
                </div>
                <div>
                    <label htmlFor="stock">STOCK</label>
                    <input type="text" name="stock" id="stock" className='form-control' />
                </div>
                <div>
                    <label htmlFor="returnPolicy">RETURN POLICY</label>
                    <input type="text" name="returnPolicy" id="returnPolicy" className='form-control' />
                </div>
                <div>
                    <label htmlFor="warrantyInformation">WARRANTY INFORMATION</label>
                    <input type="text" name="warrantyInformation" id="warrantyInformation" className='form-control' />
                </div>
                <div className="text-center p-3">
                    <button type='submit' className='btn btn-default py-2 text-center' onClick={()=>handleOption()}> <h5>Add items</h5> </button>
                </div>
            </form>
        </div>
        </div>
        <hr />
    </>
  )
}

export default AddInventory