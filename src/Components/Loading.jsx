import { ThreeDot } from 'react-loading-indicators';

const Loading = () => {
  return (
    <div className="text-center m-5">
        <ThreeDot variant="bounce" color="#cae8ff" size={150} text="please wait" textColor="#549acf" />
    </div>
    
  )
}

export default Loading