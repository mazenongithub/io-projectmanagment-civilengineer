import React from 'react'
import PM from './pm';
import StripeCheckout from 'react-stripe-checkout';
import { payInvoice } from './actions/api'
class CheckOut {
    async processStripe(token, amount) {
        const pm = new PM();
        const providerid = this.props.match.params.providerid;
        const invoiceid = this.props.match.params.invoiceid;
        const myuser = pm.getuser.call(this);
        if (myuser) {
            try {

                let response = await payInvoice(providerid, invoiceid, token, amount)
                console.log(response)
                if(response.hasOwnProperty("invoice")) {
                    const invoice = response.invoice;
                    const invoiceid = invoice.invoiceid;
                    const myinvoice = pm.getinvoicebyid.call(this,invoiceid)
                    const myproject = pm.getprojectbyid.call(this,this.props.match.params.projectid)
                    if(myproject) {
                        const i = pm.getprojectkeybyid.call(this,this.props.match.params.projectid)
                    if(myinvoice) {
                
                    const j = pm.getinvoicekeybyid.call(this,invoiceid)
                    myuser.projects.myproject[i].invoices.myinvoice[j] = response.invoice;
                    this.props.reduxUser(myuser)
                    this.setState({render:'render'})

                    }

                }
                }

                if(response.hasOwnProperty("message")) {
                    this.setState({message:response.message})
                }
              

            } catch (err) {
                alert(err)
            }

        }

    }

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