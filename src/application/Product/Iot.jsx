import ProductKit from './ProductKit';

const Iot = ({kits, setAlertMsg, setTrig, setCartTrig}) => {
  return (
    <div className="row justify-content-center justify-content-lg-start">
        {kits
        .filter(kit=>(kit.category==='iot'))
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

export default Iot