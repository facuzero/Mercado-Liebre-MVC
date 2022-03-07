const db = require('../database/models')

module.exports = {
    register : (req,res) => {
        res.render('register')
    },
    login : (req,res) => {
        res.render('login')
    },
    processRegister : (req,res) => {

        const {nombre, apellido, email, pass } = req.body;
        
        db.User.create({
            name : nombre.trim(),
            email,
            password: pass,
        }).then(user => {
            req.session.userLogin = {
                id : user.id,
                name : user.name,
            }
            res.redirect('/')
        }).catch(error => console.log(error))

    },
    processLogin : (req,res) => {

        db.User.findOne({
            where : {
                email : req.body.email
            }
        }).then(user => {
            req.session.userLogin = {
                id : user.id,
                name : user.name,
            }


            req.session.cart = [];

            db.Order.findOne({
                where : {
                    userId : req.session.userLogin.id,
                    status : 'pending'
                },
                include : [
                    {
                        association : 'carts',
                        include : [
                            {
                                association : 'product',
                                include : ['images']
                            }
                        ]
                    }
                ]
            
            }).then(order => {
                if(order) {
                    order.carts.forEach(item => {
                        let product = {
                            id : item.productId,
                            name : item.product.name,
                            price : item.product.price,
                            discount : item.product.discount,
                            image : item.product.images[0].file,
                            amount : +item.quantity,
                            total : +item.product.price * item.quantity,
                            orderId : order.id
                        }
                        req.session.cart.push(product)
                    });
                }
                res.redirect('/')

            })


        }).catch(error => console.log(error))
      
    }
}