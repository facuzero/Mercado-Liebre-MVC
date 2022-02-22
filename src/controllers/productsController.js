const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = require('../utils/toThousand');
const toDiscount = require('../utils/toDiscount');

const db = require('../database/models')

const controller = {
	// Root - Show all products
	index: (req, res) => {
		// Do the magic
		let hogar = db.Category.findOne({
			where : {
				name : 'hogar'
			},
			include : [
				{association : 'products',
				include : [{all:true}]}
			]
		})
		let informatica = db.Category.findOne({
			where : {
				name : 'informatica'
			},
			include : [
				{association : 'products',
				include : [{all:true}]}
			]
		})
		let audio = db.Category.findOne({
			where : {
				name : 'audio y video'
			},
			include : [
				{association : 'products',
				include : [{all:true}]}
			]
		})
		let celulares = db.Category.findOne({
			where : {
				name : 'celulares'
			},
			include : [
				{association : 'products',
				include : [{all:true}]}
			]
		})
		Promise.all([hogar,informatica,audio,celulares])
		.then(([hogar,informatica,audio,celulares]) => {
			return res.render('products',{
				hogar,
				informatica,
				audio,
				celulares,
				toThousand,
				toDiscount
			})
		})
		.catch(error => console.log(error))
		
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		// Do the magic
		db.Product.findByPk(req.params.id,{
			include :[{all:true}]
		})
		.then(product => {
			return res.render('detail',{
				product,
				toDiscount,
				toThousand
			})
		})
	},

	// Create - Form to create
	create: (req, res) => {
		// Do the magic
		let categories = db.Category.findAll();
		let sections = db.Section.findAll();
		Promise.all([categories,sections])
			.then(([categories,sections]) => {
				return res.render('product-create-form',{
					categories,
					sections
				})
			})
			.catch(error => console.error(error))

	},
	
	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
		const {name,price,discount,category,section,description} = req.body;

		db.Product.create({
			name : name.trim(),
			price,
			discount,
			categoryId : category,
			sectionId : section,
			description : description.trim(),
		})
			.then( product => {
				if(req.files.length > 0) {
					let images = req.files.map(img => {
						let image = {
							file : img.filename,
							productId : product.id
						}
						return image
					})
					db.Image.bulkCreate(images,{validate : true})
						.then( () => console.log('imagenes guardadas'))
				}
				return res.redirect('/products')
			})
			.catch(error => console.log(error))
	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
		return res.render('product-edit-form',{
			product : products.find(product => product.id === +req.params.id)
		})
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
		const {name,price,discount,category,description} = req.body;

		let productModified = {
			id : +req.params.id,
			name: name.trim(),
			price : +price,
			discount : +discount,
			category,
			description: description.trim(),
			image: 'default-image.png'
		}
		
		let productsModified = products.map(product => product.id === +req.params.id ? productModified : product)

		fs.writeFileSync(path.join(__dirname,'..','data','productsDataBase.json'),JSON.stringify(productsModified,null,3),'utf-8');

		res.redirect('/products/detail/' + req.params.id)
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
		let productsModified = products.filter(product => product.id !== +req.params.id )
		fs.writeFileSync(path.join(__dirname,'..','data','productsDataBase.json'),JSON.stringify(productsModified,null,3),'utf-8');
		res.redirect('/products')

	}
};

module.exports = controller;