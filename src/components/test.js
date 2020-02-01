getactualcsibyid(csiid) {
    let mycsi = false;
    const pm = new PM();
    const myinvoices = pm.getinvoices.call(this)
    if (myinvoices) {
        // eslint-disable-next-line
        myinvoices.map(myinvoice => {
            if (myosalprop.hasOwnProperty("bid")) {
                // eslint-disable-next-line
                myinvoice.bid.biditem.map(biditem => {
                    if (biditem.csiid === csiid) {
                        mycsi = { csiid, csi: biditem.csi, title: biditem.title }

                    }
                })
            }
        })


    }
    return mycsi;
}