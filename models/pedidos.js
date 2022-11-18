const db = require('./db')
const Post = db.sequelize.define('pedidos',{
    cidade:{
        type: db.Sequelize.STRING
    },
    estado:{
        type: db.Sequelize.STRING
    },
    servico:{
        type: db.Sequelize.STRING
    },
    descricao:{
        type: db.Sequelize.TEXT
    }
})

// Post.sync({force:true})
module.exports = Post