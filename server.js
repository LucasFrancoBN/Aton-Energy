if(process.env.NODE_ENV !== "production"){
    require("dotenv").config()
}
//Bibliotecas Instaladas
const express = require("express")
const app = express()
const bcrypt = require("bcrypt")
const passport = require("passport")
const initializePassport = require("./passport-config")
const flash = require ("express-flash")
const session = require ("express-session")
const methodOverride = require ("method-override")
const Sequelize = require('sequelize')
const Post = require ('./models/pedidos')






initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

const users = []

app.use('/public', express.static('public'))
app.use(express.urlencoded({extended:false}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    is_logged_in: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride("_method"))

//Processo de Login
app.post("/login", checkNotAuthenticated, passport.authenticate("local", {
    successRedirect: "/usuario",
    failureRedirect: "/login",
    failureFlash: true
}))

//Processo de Registro
app.post("/cadastro", checkNotAuthenticated, async (req, res) =>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        })
        console.log(users)
        res.redirect("/login")
    } catch (e){
        console.log(e);
        res.redirect("/cadastro")
    }
})
//Início Rotas
//Rota Visualização
app.get('/posts', checkAuthenticated, function(req, res){
    Post.findAll({order:[['id', 'DESC']]}).then(function(posts){
        res.render("posts.ejs", {posts:posts})
    })
})
//Rota Home Página não restrita
app.get('/home', checkNotAuthenticated, function(req, res){
    Post.findAll({order:[['id', 'DESC']]}).then(function(posts){
        res.render("home.ejs", {posts:posts})
    })
})
//Rota Usuario
app.get('/usuario', checkAuthenticated, (req, res) =>{
    res.render("usuario.ejs", {name: req.user.name})
})

//Rota orcamento
app.get('/orcamento', checkAuthenticated, (req, res) =>{
    res.render("orcamento.ejs", {name: req.user.name})
})

//Rota Login
app.get('/login', checkNotAuthenticated, (req, res)=>{
    res.render("login.ejs")
})
//Rota de cadastro
app.get('/cadastro', checkNotAuthenticated, (req, res)=>{
    res.render("cadastro.ejs")
})
//Rota de contato
app.get('/contato', checkNotAuthenticated, (req, res)=>{
    res.render("Contato.ejs")
})


//Rota de index
app.get('/', checkNotAuthenticated, (req, res)=>{
    res.sendFile(__dirname + "/src/index.html")
})

//Rota de soluções Especifica
app.get('/biomassa', checkNotAuthenticated, (req, res)=>{
    res.sendFile(__dirname + "/src/Solucoes-Especificas/Energia-Biomassa.html")
})

app.get('/eolica', checkNotAuthenticated, (req, res)=>{
    res.sendFile(__dirname + "/src/Solucoes-Especificas/Energia-Eolica.html")
})

app.get('/solar', checkNotAuthenticated, (req, res)=>{
    res.sendFile(__dirname + "/src/Solucoes-Especificas/Energia-Solar.html")
})

app.get('/servicosEnergia', checkNotAuthenticated, (req, res)=>{
    res.sendFile(__dirname + "/src/Solucoes-Especificas/Serviços-Energia.html")
})

app.get('/smartGrid', checkNotAuthenticated, (req, res)=>{
    res.sendFile(__dirname + "/src/Solucoes-Especificas/Smart-Grid.html")
})

app.get('/smartPower', checkNotAuthenticated, (req, res)=>{
    res.sendFile(__dirname + "/src/Solucoes-Especificas/Smart-Power.html")
})

//Rota Preservação(sustentabilidade)
app.get('/preservacao', checkNotAuthenticated, (req, res)=>{
    res.sendFile(__dirname + "/src/sustentabilidade.html")
})

//Fim Rotas

//Inserção de Dados na tabela postagem
app.post('/add', function(req, res){
    Post.create({
        cidade: req.body.cidade,
        estado: req.body.estado,
        servico: req.body.servicos,
        descricao: req.body.descricao
    }).then(function(){
        res.redirect('/usuario')
    }).catch(function(){
        res.send("Houve um erro!")
    })
})

//Deletar os dados da tabela
app.get('/deletar/:id', function(req, res){
    Post.destroy({where: {'id': req.params.id}}).then(function(){
        res.redirect('/posts')
    }).catch(function(erro){
        res.send("A Postagem não existe.")
    })
})

//Comando para deslogar do sistema
app.delete("/logout", (req, res) =>{
    req.logout(req.user, err =>{
        if(err) return next(err)
        res.redirect("/")
    })
})

//Funções de Autenticação
function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}

function checkNotAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect("/")
    }
    next()
}

//Localhost
app.listen(8081)