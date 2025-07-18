const OrderDetails = ({cart ,delivery, cost}) => {
    const delivery_charge=delivery || null
    const amount = cost || 0;
  return (
    <div>
        <table className="table table-color table-striped">
          <thead>
            <tr>
              <th scope="col" className="text-center">Product</th>
              <th scope="col" className="text-center">Quantity</th>
              <th scope="col" className="text-center">Price</th>
            </tr>
          </thead>
          <tbody >
          {cart.map((item) =>(              
                <tr key={item.productCode}>
                  <td>{item.title}</td>
                  <td className="text-center">{item.quantity}</td>
                  <td className="text-end">{Number(item.price).toFixed(2)}</td>
                </tr>
          ))}
                <tr className="text-end" style={delivery_charge == null ?{display:'none'}:{display:''}}>
                  <td colSpan={2} className="text-end px-5">
                    Delivery charge
                  </td>
                  <td>
                    {Number(delivery_charge).toFixed(2)}
                  </td>
                </tr>
                <tr className="fs-5 text-end">
                  <th colSpan={2} className="text-end px-5">
                    Total
                  </th>
                  <td>
                    {Number(amount).toFixed(2)}
                  </td>
                </tr>
          </tbody>
        </table>
    </div>
  )
}

export default OrderDetails