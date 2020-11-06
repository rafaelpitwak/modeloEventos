const moment = require('moment')
const conexao = require('../infraestrutura/conexao')

class Cliente {
    adiciona(cliente, res) {
        
        const clienteEhValido = cliente.nomeCliente.length >= 5

        const validacoes = [
           
            {
                nome: 'cliente',
                valido: clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if(existemErros) {
            res.status(400).json(erros)
        } else {
            const clienteValidado = {...cliente}

            const sql = 'INSERT INTO cliente SET ?'
    
            conexao.query(sql, clienteValidado, (erro, resultados) => {
                if(erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(200).json(cliente)
                }
            })
        }
       
    }

    lista(res) {
        const sql = 'SELECT * FROM cliente'

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, res) {
        const sql = `SELECT * FROM cliente WHERE id=${id}`

        conexao.query(sql, (erro, resultados) => {
            const cliente = resultados[0]
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(cliente)
            }
        })
    }

    altera(id, valores, res) {
             
        const sql = `UPDATE cliente SET ? WHERE id=?`

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores, id})
            }
        })
    }

    deleta(id, res) {
        const sql = 'DELETE FROM cliente WHERE id=?'

        conexao.query(sql, id, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Cliente