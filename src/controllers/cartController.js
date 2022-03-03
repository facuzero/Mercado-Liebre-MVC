module.exports = {
    show: async (req,res) => {//necesito req.session del mainController 43
        if(!req.session.cart){
            return res.status(500).json({//500 error de servidor
                ok:false,
                msg: 'Comuniquese con el admin'
            })
        }
        let response = {
            ok:true,
            meta:{
                //link:,
                total: req.session.cart.length
            },
            data: req.session.cart
        }
        return res.status(200).json(response);
    }
}