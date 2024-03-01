import webloading from '../public/webloading.json';
import Lottie from "lottie-react";

const loading = () => {
  return (
    <div className=" min-h-screen flex items-center justify-center">
        <Lottie style={{height:200,width:'100%',}} animationData={webloading} />
    </div>
  )
}

export default loading