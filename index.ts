const fs = require('fs')

const lerAquivo = (): unknown => {
    return JSON.parse(fs.readFileSync('./bd.json'))
}

const escreverArquivo = (dados: any): void => {
    fs.writeFileSync('./bd.json', JSON.stringify(dados))
}

type Endereco = {
    cep: string,
    rua: string,
    complemento?: string,
    bairro: string,
    cidade: string
}

type Usuario = {
    nome: string,
    email: string,
    cpf: string,
    profissao?: string,
    endereco: Endereco | null
}

const cadastrarUsuario = (dados: Usuario): Usuario => {
    const bd = lerAquivo() as Usuario[];

    bd.push(dados);

    escreverArquivo(bd);

    return dados

}

const listarUsuarios = (filtro?: string): Usuario[] => {
    const bd = lerAquivo() as Usuario[];
    const usuarios = bd.filter((usuario) => {
        if (filtro) {
            return usuario.profissao === filtro
        }
        return usuario

    })

    return usuarios
}


const detalharUsuario = (cpf: string): Usuario => {
    const bd = lerAquivo() as Usuario[];

    const usuario = bd.find((usuario) => {
        return usuario.cpf === cpf
    })

    if (!usuario) {
        throw new Error("usuario nao encontrado");

    }

    return usuario;
}

const atualizarUsuario = (cpf: string, dados: Usuario) => {
    const bd = lerAquivo() as Usuario[];

    const usuario = bd.find((usuario) => {
        return usuario.cpf === cpf
    })

    if (!usuario) {
        throw new Error("usuario nao encontrado");

    }

    Object.assign(usuario, dados)

    escreverArquivo(bd)
    return dados

}

const excluirUsuario = (cpf: string): Usuario => {
    const bd = lerAquivo() as Usuario[];

    const usuario = bd.find((usuario) => {
        return usuario.cpf === cpf
    })

    if (!usuario) {
        throw new Error("usuario nao encontrado");

    }

    const exclusao = bd.filter(usuario => {
        return usuario.cpf !== cpf
    })

    escreverArquivo(exclusao)

    return usuario;

}



const bd = lerAquivo()
console.log(bd);



// cadastrarUsuario({
//     nome: 'van',
//     email: 'sam@gmail.com',
//     cpf: '12345678902',
//     endereco: {
//         cep: '12345-678',
//         rua: 'avenida 31 de março',
//         bairro: 'centro',
//         cidade: 'capoeiras'
//     }
// })

// const sam = detalharUsuario('12345678901')
// atualizarUsuario('12345678901', {
//     nome: 'sam',
//     email: 'sam@gmail.com',
//     cpf: '12345678901',
//     profissao: 'mae',
//     endereco: {
//         cep: '12345-678',
//         rua: 'avenida 31 de março',
//         bairro: 'centro',
//         cidade: 'capoeiras'
//     }
// })