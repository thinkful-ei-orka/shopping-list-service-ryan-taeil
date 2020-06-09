require('dotenv').config()
const knex = require('knex');

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL,
})

function searchProductByName(searchTerm) {
    knexInstance
        .select('*')
        .from('shopping_list')
        .where('name', 'ILIKE', `%${searchTerm}%`)
        .then(data => {
            console.log(data)
        })
}

searchProductByName('Fish')

function paginateItems(pageNum) {
    const productsPerPage = 6
    const offset = productsPerPage * (pageNum - 1)
    knexInstance
        .select('*')
        .from('shopping_list')
        .limit(productsPerPage)
        .offset(offset)
        .then(data => {
            console.log(data)
        })
}

paginateItems(2)