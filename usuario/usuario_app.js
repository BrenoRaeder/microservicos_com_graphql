const cxaSelecao = document.querySelector('.cxaSelecao_usuario');
const cxaOpcoes = document.querySelector('.cxaSelecao_usuario');
const cxaUsuarios = document.querySelector('.cxa_usuarios');

fetch('http://localhost:3000/', {
    method: 'POST',
    headers: { "Content-Type" : "application/json" },
    body: JSON.stringify({
        query: `
        query{
            usuarios{
               nome,
               id 
            }
         }
        `
    })     
}).then(res => res.json()).then(data => {

    const usuarios = data.data.usuarios;
    usuarios.forEach(u => {
        const opcao = document.createElement('option');
        opcao.value = u.id;
        opcao.innerText = u.nome;
        cxaSelecao.append(opcao);
    })   
})



cxaSelecao.addEventListener("click", () =>{

    cxaUsuarios.innerHTML = '';
    
    const usuarioId = cxaSelecao.options[cxaSelecao.selectedIndex].value;

    fetch('http://localhost:3000/', {
    method: 'POST',
    headers: { "Content-Type" : "application/json" },
    body: JSON.stringify({
        query: `
        query{
            usuario(id: "${usuarioId}"){
               nome,
               id,
               email 
            }
         }
        `
    })     
}).then(res => res.json()).then(data => {

    const usuario = data.data.usuario;
    const ul = document.createElement('ul');
    cxaUsuarios.append(ul);
    
    const nome = document.createElement('li');
    const email = document.createElement('li');
    const id = document.createElement('li');

    nome.innerText = "nome: " + usuario.nome;
    email.innerText = "email: " + usuario.email;
    id.innerText = "Id do usuário: " + usuario.id;

    ul.append(nome);
    ul.append(email);
    ul.append(id);
})
})
