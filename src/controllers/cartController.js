const db = require('../database/models')
module.exports = {
    show: async (req,res) => {//necesito req.session del mainController 43
        req.sessionCart=[]
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
    },
    add : async(req,res) => {
        try {
            let product = await db.Product.findByPk(req.params.id,{
                includes:[{ //Se trae todas las asociaciones
                    all : true
                }]
            })}
            const {id,name,price,discount}= product
            
            let item = {
                id,
                name,
                price,
                discount,
                image : product.images[0],
                amount:1,
                total:price
            }
            req.session.cart.push(item)
            console.log(product)
            let response = {
                ok:true,
                /* meta:{
                    total: req.session.cart.length
                }, */
                data: req.session.cart
            }
            return res.status(200).json(response);
        } catch (error) {
            console.log(error)
        }
    }
}