/*
	UTILIZANDO CALLBACKS. O dir 03-promises contém a mesma pasta, mas utilizando PROMISES.
	
	00 Obter Usuario
	01 Resolvido o Usuario, obter Endereco
	02 Resolvido o Endereco, obter Telefone 
*/


function obterUsuario(callback){
	setTimeout(function () {
		return callback(null, {
			id: 1,
			nome: 'Aladin',
			dataNascimento: new Date()
		})
	}, 1000)
}

function obterTelefone(idUsuario, callback){
	setTimeout(function () {
		return callback(null, {
			telefone: 1199002,
			ddd: 11
		})
	}, 2000)
}

function obterEndereco(idUsuario, callback){
	setTimeout(function (){
		return callback(null, {
			rua: 'dos bobos',
			numero: 0,
		})
	}, 2000)
}

obterUsuario(function resolverUsuario(erro, usuario){
	// em javascript o valor null, "", 0 são iguais a false!
	if(erro){
		console.error('DEU RUIM em USUARIO', error)
		return;
	}
	obterTelefone(usuario.id, function resolverTelefone(erro1, telefone){
		if(erro1){
			console.error('DEU RUIM em TELEFONE', error)
			return;
		}
		obterEndereco(usuario.id, function resolverEndereco(erro2, endereco){
			if(erro2){
				console.error('DEU RUIM em ENDEREÇO', error)
				return;
			}

			console.log(`
				Nome: ${usuario.nome},
				Endereco: ${endereco.rua}, ${endereco.numero},
				Telefone: (${telefone.ddd})${telefone.telefone}
				`)
		})
	})
})
