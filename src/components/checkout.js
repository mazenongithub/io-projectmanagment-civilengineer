import React from 'react'
import PM from './pm';
import StripeCheckout from 'react-stripe-checkout';
import { payInvoice } from './actions/api'
class CheckOut {
   
    stripeform() {
        const invoiceid = this.props.match.params.invoiceid;
        const amount = this.getamount();
        if (amount > 0) {

            return (
                <StripeCheckout
                    name="CivilEngineer.io"
                    description={`Payment for Invoice ID ${invoiceid}`}
                    amount={amount}
                    token={token => this.processStripe(token, amount)}
                    stripeKey={process.env.REACT_APP_STRIPE_PUBLIC}
                />
            )

        }

    }  
}
export default CheckOut;