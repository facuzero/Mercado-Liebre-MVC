const db = require('../database/models')
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
    },
    add : async (req,res) => {
        try {

            let product = await db.Product.findByPk(req.params.id,{
                include : [
                    {association : 'images',
                        attributes : ['file']
                    }
                ]
            });

            const {id, name, price, discount} = product;

            let item = {
                id,
                name,
                price,
                discount,
                image : product.images[0].file,
                amount : 1,
                total : price
            }
            if(!req.session.cart){
                req.session.cart = []
            }
            
            req.session.cart.push(item)

            let response = {
                ok: true,
                meta : {
                    total : req.session.cart.length
                },
                data : req.session.cart
            }
    
            return res.status(200).json(response)
            
        } catch (error) {
            console.log(error)
        }
    }
}