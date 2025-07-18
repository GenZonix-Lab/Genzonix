import React ,{useState,useEffect} from 'react'
import { fetchAuthSession } from 'aws-amplify/auth';
import { motion, AnimatePresence } from "framer-motion";
import { CgDetailsMore } from "react-icons/cg";
import { useNavigate } from "react-router";
import { IoMdClose } from "react-icons/io";
import OrderDetails from './OrderDetails'
import { Atom } from 'react-loading-indicators';
import ShowAlert from '../../Components/ShowAlert';
const orderApi = "https://x69g27a76e.execute-api.ap-south-1.amazonaws.com/prod/order"

const Order = () => {
    const [order, setOrder]=useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [cost,setCost] = useState(0);
    const [loading, setLoading] = useState(true);
    const [delivery,setDelivery] = useState(null);
    const [alert,setAlert] =useState('');
    const [trig,setTrig]=useState(0);
    const [orderIdCheck, setOrderIdCheck] = useState('');
    const navigate= useNavigate();

    const getToken = async () => {
      try{
        const session = await fetchAuthSession(); // await the session
        const token = session.tokens.idToken.toString(); // now you have the JWT string
        if (!token) {
          console.warn("User session not found. Redirecting to auth...");
          throw new Error("No idToken found in session");
        }
        return token;
      }catch(err){
        console.error("Error getting token:", err);
        setTrig(Date.now())
        setAlert("Please log in to continue.");
        window.location.href = "/Auth";
      }
    };
    const handleViewDetails = (orderId,item,cost,delivery) => {
        setSelectedOrder(item)
        setCost(cost)
        setDelivery(delivery)
        setOrderIdCheck(orderId)
    };
    useEffect(()=>{
        const fetchOrders=async()=>{
           try{
              setLoading(true);
              const token=await getToken();
              const response=await fetch(orderApi,{
                method:'GET',
                headers:{
                    'Authorization': `Bearer ${token}`,
                }
            })
            const data= await response.json();
            setOrder(data.map((order) => (
                {
                    razorpay_order_id:order.razorpay_order_id,
                    order_id: order.order_id,
                    ordered_at: new Date(order.ordered_at).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        }),
                    cost: order.cost,
                    delivery:order.delivery,
                    payment_status: order.payment_status,
                    products: order.products
                }
            )))
           }catch(err){
            console.error("Error fetching cart:", err);
          } finally{
            setLoading(false);
          }
        }
        fetchOrders();
    },[])
  return (
    <>
      <div className="container py-4 d-flex justify-content-center">
          {loading ? (
                      <Atom color="#8488df" size="large" text="Please wait..." textColor="#ff00df" />
                    ) : (
    <div className='container-fluid'>
      <ShowAlert
            message={alert}
            triggerKey={trig}
            type="info"
            duration={3000}
            redirectText=''
            redirectPath=''
          />
            <h4 
            className='text-center mb-4 '
            style={order.length === 0
              ?{
                  backgroundColor:'#f0f8ff',
                  color:'#050a30',
                  textAlign:'center',
                  padding:'50px',
                  font:"900 46px italic"}:{display:''}}>{order.length === 0 ?"Your Order is Empty":'Your Order Summary'}</h4>
            <table className="table table-secondary table-striped" style={order.length===0?{display:'none'}:{display:''}}>
                <thead>
                    <tr>
                        <th scope="col">Order ID</th>
                        <th scope="col">Order Date</th>
                        <th scope="col">Total Amount</th>
                        <th scope="col">Payment Status</th>
                        <th scope="col">Order Details</th>
                    </tr>
                </thead>
                <tbody>
                    {order.map((item) => (
                      <React.Fragment key={item.razorpay_order_id}>
                        <tr>
                          <td>{item.order_id}</td>
                          <td>{new Date(item.ordered_at).toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })}</td>
                          <td>₹{parseFloat(item.cost).toFixed(2)}</td>
                          <td>{item.payment_status}</td>
                          <td>
                            <button
                              className="btn btn-info"
                              onClick={() =>{
                                orderIdCheck!==item.order_id
                                ?handleViewDetails(item.order_id, item.products, item.cost, item.delivery)
                                :setOrderIdCheck('')
                            }}
                              >
                              {orderIdCheck!==item.order_id?<CgDetailsMore />:<IoMdClose/>}
                            </button>
                          </td>
                        </tr>
                            
                        {/* Always render this row — animate the content inside */}
                        <tr>
                          <td colSpan={5} style={{ padding: 0, border: "none" }}>
                            <AnimatePresence>
                              {orderIdCheck === item.order_id && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2, ease: "easeInOut" }}
                                  style={{ overflow: "hidden", backgroundColor: "#050a30",padding:'0px 0rem',margin:'0px'}}
                                >
                                  <OrderDetails
                                    cart={selectedOrder}
                                    delivery={delivery}
                                    cost={cost}
                                  />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
                </tbody>
              </table>
              </div>
              )}
                        
        </div>
        <hr />
    </>
  )
}

export default Order