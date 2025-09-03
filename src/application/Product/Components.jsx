import ProductKit from './ProductKit';

const Components = ({ components, setAlertMsg, setTrig, setCartTrig }) => {
  return (
    <div className="row justify-content-center">
      {components
      .filter(components => components.shown)
      .map(component => (
        <ProductKit 
          key={component.productCode}
          kit={component} 
          id={component.productCode}
          setAlertMsg={setAlertMsg}
          setTrig={setTrig}
          setCartTrig ={setCartTrig}
        />
      ))
      }
    </div>
  )
}

export default Components