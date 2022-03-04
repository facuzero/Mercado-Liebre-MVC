const db = require('../database/models');

const productVerify = (carrito, id) => {

    let index = -1;

    for (let i = 0; i < carrito.length; i++) {
        
        if(carrito[i].id === +id){
            index = i;
            break
        }
    }

    return index
}


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

            let index = productVerify(req.session.cart,req.params.id);

            if(index === -1){
                let product = await db.Product.findByPk(req.params.id,{
                    include : [
                        {association : 'images',
                            attributes : ['file']
                        }
                    ]
                });
    
                if(!product){
                    return res.status(500).json({
                        ok : false,
                        msg : 'Comuníquese con el administrador!'
                    })
                }
    
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
    
            }else{
                let product = req.session.cart[index]
                product.amount++;
                product.total = product.amount * product.price;
                req.session.cart[index] = product
            }

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