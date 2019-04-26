// Essa file serve para armazenar a funcao obterPessoas e seus mecanismos
// File basicamente feita para ser exportada, como acontece ao final do code.


// Atribuindo um modulo ao const 'axios'
const axios = require('axios')
// Atribuindo uma URL para a const 'URL'
const URL = `https://swapi.co/api/people`

// Criando uma funcaoo async Promise que obtem as pessoas da URL pelo nome buscado
async function obterPessoas(nome){
	const url = `${URL}/?search=${nome}&format=json`
	const response = await axios.get(url)
	return response.data
}

// Exporta a funcao obterPessoas, para que outras files possam usar
module.exports = {
	obterPessoas
}

// Teste para ver se funciona, utilizando a pesquisa 'r2' Spoiler: funciona

obterPessoas('a')
	.then(function (resultado_pesquisa_r2){
		console.log('resultado', resultado_pesquisa_r2)
	})

	.catch(function (error){
		console.error('DEU RUIM', error)
	})

