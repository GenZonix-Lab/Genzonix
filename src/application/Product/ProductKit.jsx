import { StorageImage } from '@aws-amplify/ui-react-storage';
import useToken from '../../hooks/useToken';
import { useNavigate } from 'react-router-dom';

const cartApi = `https://yn5xuarjc7.execute-api.ap-south-1.amazonaws.com/3alim/cart`

const ProductKit = ({kit, id, setAlertMsg, setTrig,setCartTrig}) => {
  const token = useToken();
  const navigate = useNavigate()

  const handleAddToCart = async (productCode,price,title,image,category) => {
    const data = {productCode,title,price,image,category,quantity: 1}
    try{
      const postData = {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`, // Cognito JWT token
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
      const res = await fetch(cartApi, postData);
      const result = await res.json();
      setTrig(Date.now())
      if (result.success) {
        setCartTrig((trig)=>(trig+1))
        setAlertMsg("Added to cart!")
      } else if(result.message=="Not enough stock") {
        setAlertMsg("Out of stock")
      }
    }
    catch (error){
      if (error.name === 'UserUnAuthenticatedException' || error.message?.includes('User needs to be authenticated') || error.message?.includes("tokens is undefined")) {
        setAlertMsg('Please login / Sign-Up')
        setTimeout(()=>(navigate(`/Auth`)),3000)
      } else {
        console.error('Add to cart error:', error);
        setAlertMsg('We apologize for the inconvenience. Our support team is working to resolve the issue.')
      }
    }
  };
  const handleBuyNow = async(price,delivery,title,category,productCode)=>{
    try{
      const response=await fetch(cartApi,{
      method: "POST",
      headers: {
            'Authorization': `Bearer ${token}`, // Cognito JWT token
            'Content-Type': 'application/json'
          },
      body: JSON.stringify({
        productCode : productCode || '',
        category : category || '',
        title : title || '',
        quantity : 1,
        price : price || 0, 
        delivery: delivery || 0,
        type : 'buyout',
      })
    });
    const data= await response.json();
    console.log(data)
    } catch (error){
      console.error("Error Message: ",error)
    } finally{
      navigate('buyout')
    }
  };

  return (
    <div key={id} className="card card-app col-12 col-sm-8 col-md-5 col-lg-4 col-xl-3 m-3 d-flex" style={{maxWidth : "20rem"}}>
        <StorageImage 
            alt={kit.title}
            className='card-img-top p-2 mt-2'
            path={kit.meta.thumbnail}
            borderRadius={34}
            fallbackSrc="/images/defaultImage.webp" 
        />
        <div className="card-body row">
            <div>
                <h5 className="card-title truncate-title">{kit.title}</h5>
                <p className="card-text truncate-description">{kit.description}</p>
            </div>
            {kit.stock !== 0 ?
            <div>
                <div className="d-flex justify-content-between">
                    <div>
                        <em className='text-decoration-line-through text-danger fs-6 f-manrope'>₹ {kit.mrp}</em>
                        <p className='text-warning p-0 m-0 fs-6 f-manrope'>{kit.discount}% off</p>
                    </div>
                    <div>
                    <p className='p-0 m-0 fs-4 p-1 f-manrope' style={{color:'#00e42aff'}}>₹ {kit.price}</p>
                </div>
            </div>
            <div className='d-flex justify-content-around'>
                <button 
                    className="btn btn-default m-2" 
                    onClick={()=>{
                        handleAddToCart(id,kit.price,kit.title,kit.meta?.thumbnail,kit.category)
                        }
                    }
                >
                    Add Cart
                </button>
                {(kit.category!=='iot' && kit.category !== 'robotics' && kit.category !== 'ai')?
                <div className="d-none"></div>:
                <button 
                    className="btn btn-default m-2" 
                    onClick={()=>{
                        handleBuyNow(kit.price,kit.price>400?0:49,kit.title,kit.category,id)
                        }
                    }
                >
                    Buy Now
                </button>}

            </div>
            </div>:
            <div className='text-end align-self-end'>
                <em className='fs-6 align-item-end' style={{ color: kit.stock!==0 ? 'green' : 'red' }}>{kit.stock !==0?"in stock":"out of stock"}</em>
            </div>}
        </div>
    </div>
  )
}

export default ProductKit

