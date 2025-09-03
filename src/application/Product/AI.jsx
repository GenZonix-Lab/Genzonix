import ProductKit from './ProductKit';

const AI = ({kits, setAlertMsg, setTrig,setCartTrig}) => {
  return (
    <div className="row justify-content-center justify-content-lg-start">
        {kits
        .filter(kit=>(kit.category==='ai'))
        .filter(kit => kit.shown)
        .map((kit)=>(
            <ProductKit 
              key={kit.id} 
              kit={kit} 
              id={kit.id} 
              setAlertMsg={setAlertMsg} 
              setTrig={setTrig}
              setCartTrig ={setCartTrig}
            />
        ))}
    </div>
  )
}

export default AI