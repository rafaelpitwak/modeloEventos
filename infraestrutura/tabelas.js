class Tabelas {
    init(conexao) {
        this.conexao = conexao
      
        this.criarCliente()
    }



    criarCliente() {
        const sql = `CREATE TABLE IF NOT EXISTS Cliente (
            id int NOT NULL AUTO_INCREMENT, 
            Nomecliente varchar(50) NOT NULL,  
            PRIMARY KEY(id)
            )`

        this.conexao.query(sql, erro => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('Tabela Cliente criada com sucesso')
            }
        })
    }
}

module.exports = new Tabelas