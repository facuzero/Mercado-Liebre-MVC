module.exports = {
    show : async (req,res) => {

        if(!req.session.cart){
            return res.status(500).json({
                ok : false,
                msg : 'Comuníquese con el administrador!'
            })
        }

        let response = {
            ok: true,
            meta : {
                total : req.session.cart.length
            },
            data : req.session.cart
        }

        return res.status(200).json(response)
    }
}