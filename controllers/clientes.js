const Cliente = require('../models/clientes')

module.exports = app => {
    app.get('/clientes', (req, res) => {
        console.log("lista clientes")
        Cliente.lista(res)
    })

    app.get('/clientes/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Cliente.buscaPorId(id, res)
    })

    app.post('/clientes', (req, res) => {
       const cliente = req.body
       console.log(req.body);

       Cliente.adiciona(cliente, res)
    }) 

    app.patch('/clientes/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body

        Cliente.altera(id, valores, res)
    })

    app.delete('/clientes/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Cliente.deleta(id, res)
    })
}