const cxaProduto = document.querySelector('.cxa_produtos');
const catCozinha = document.querySelector('#cat01');
const catEsporte = document.querySelector('#cat02');
const catJardinagem = document.querySelector('#cat03');

const btnComprar = document.querySelector('.btn_comprar');
const cxaComprar = document.querySelector('.cxa_comprar');


catCozinha.addEventListener("click", () =>{
    fazRequisicao("cat01");
} );
catEsporte.addEventListener("click", () =>{
    fazRequisicao("cat02");
});
catJardinagem.addEventListener("click", () => {
    fazRequisicao("cat03");
})

function fazRequisicao(arg){

    cxaProduto.innerHTML = '';
    cxaComprar.style.display = "none";

    fetch('http://localhost:3000/', {
    method: 'POST',
    headers: { "Content-Type" : "application/json" },
    body: JSON.stringify({
        query:`
        query{
            categoria(id:"${arg}"){
               nome
               produtos{
                  nome
                  preco
                  img
               }
            }
         }
        `
    })
}).then(res => res.json()).then(data =>{

    const produtos = data.data.categoria.produtos;
    produtos.forEach(p => {
        const container = document.createElement('div');
        const img = document.createElement('div');
        const prodNome = document.createElement('p');
        const prodPreco = document.createElement('p');
        const comprar = document.createElement('p');

        prodNome.innerText = p.nome;
        prodPreco.innerText = `R$ ${p.preco}0`;
        img.style.backgroundImage = `url(./produtos/img/${p.img}.jpg)`;

        cxaProduto.append(container);
        container.append(img);
        container.append(prodNome);
        container.append(prodPreco);

        container.classList.add('cxaProduto');
        img.classList.add('img_produto');
        comprar.classList.add('comprar_produto');
    }) 
})
}


//////////


btnComprar.addEventListener("click", () =>{
    cxaProduto.innerHTML = '';
    cxaComprar.style.display = "flex"; 
});


//////////

const cxaSelecaoProduto = document.querySelector('.cxaSelecao_produto');
const cxaSelecaoCliente = document.querySelector('.cxaSelecao_usuario_compra');

fetch('http://localhost:3000/', {
    method: 'POST',
    headers: {"Content-Type" : "application/json"},
    body: JSON.stringify({
        query: `
        query{
            produtos {
              nome
              preco
            }
            usuarios{
               nome 
               email
            }
          }
        
        `
    })
}).then(res => res.json()).then(data =>{

    const produtos = data.data.produtos;
    produtos.forEach(p => {
        const opcao = document.createElement('option');
        opcao.value = p.preco;
        opcao.innerText = p.nome;
        cxaSelecaoProduto.append(opcao);
    })

    const usuarios = data.data.usuarios;
    usuarios.forEach(u => {
        const opcao = document.createElement('option');
        opcao.value = u.email;
        opcao.innerText = u.nome;
        cxaSelecaoCliente.append(opcao);
    })

})

//

const btnConfirmarCompra = document.querySelector('.selecao_produto_comprarBtn');
const cxaQtd = document.querySelector('.qtd_produto');

btnConfirmarCompra.addEventListener("click", () => {
    const preco = cxaSelecaoProduto.options[cxaSelecaoProduto.selectedIndex].value;

    const nomeProd = cxaSelecaoProduto.options[cxaSelecaoProduto.selectedIndex].innerText;

    const qtd = cxaQtd.value;

    const valorTotal = preco * qtd;

    const nomeCliente = cxaSelecaoCliente.options[cxaSelecaoCliente.selectedIndex].innerText;

    const emailCliente = cxaSelecaoCliente.options[cxaSelecaoCliente.selectedIndex].value;

    window.alert(`Total R$${valorTotal.toFixed(2)}
${nomeProd}(R$${(preco*1).toFixed(2)}) x ${qtd}
Comprado por: ${nomeCliente}
email: ${emailCliente}`);
})
