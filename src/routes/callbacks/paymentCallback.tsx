import {useEffect} from "react";


function PaymentCallback() {



    useEffect((): void => {
        const queryString = window.location.search;
        console.log(queryString);

        const urlParams = new URLSearchParams(queryString);
        const property = urlParams.get('from')
        const status = urlParams.get('redirect_status')

        if(status == 'succeeded' && property){
             window.location.href = property
        }else{


             window.location.href = 'error'
        }


    }, []);


    return (
     <div>

     </div>
    );
}

export default PaymentCallback;