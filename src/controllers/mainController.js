const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = require('../utils/toThousand');
const toDiscount = require('../utils/toDiscount');

const db = require('../database/models');
const { Op } = require("sequelize");


const controller = {
	index: (req, res) => {

		req.session.cart = [];

		// Do the magic
		let novedades = db.Product.findAll({
			include: [{ all: true }],
			where: {
				sectionId: 1,
				discount: {
					[Op.lt]: 20
				}
			}
		})
		let cuidados = db.Product.findAll({
			include: ['section', 'images'],
			where: {
				sectionId: 2
			}
		})
		let ofertas = db.Product.findAll({
			include: [{ association: 'images' }],
			where: {
				discount: {
					[Op.gte]: 20
				}
			}
		})

		Promise.all([novedades, cuidados, ofertas])
			.then(([novedades, cuidados, ofertas]) => {



				return res.render('index', {
					novedades,
					cuidados,
					ofertas,
					toThousand,
					toDiscount
				})
			})
			.catch(error => console.log(error));

	},
	search: (req, res) => {
		// Do the magic
		db.Product.findAll({
			include: [{ all: true }],
			where: {
				[Op.or]: [
					{
						name: {
							[Op.substring]: req.query.keywords
						}
					},
					{
						description: {
							[Op.substring]: req.query.keywords
						}
					}
				]
			}
		})
			.then(products => {
				return res.render('results', {
					products,
					toThousand,
					toDiscount,
					keywords: req.query.keywords
				})
			})

	},
};

module.exports = controller;
