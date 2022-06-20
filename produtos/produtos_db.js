const produtos = [
    {
        id: "prod01",
        nome: "Panela",
        preco: 25.50,
        categoriaId: "cat01",
        img: "img01"
    },
    {
        id: "prod02",
        nome: "Bola de Futebol",
        preco: 60.50,
        categoriaId: "cat02",
        img: "img02"
    },
    {
        id: "prod03",
        nome: "Vaso",
        preco: 10.5,
        categoriaId: "cat03", 
        img: "img03"
    },
    {
        id: "prod04",
        nome: "Pratos",
        preco: 60.30,
        categoriaId: "cat01",
        img: "img04"
    },
    {
        id: "prod05",
        nome: "Caneca",
        preco: 10.10,
        categoriaId: "cat01",
        img: "img05"
    },
    {
        id: "prod06",
        nome: "Bola de Basquete",
        preco: 70.50,
        categoriaId: "cat02",
        img: "img06"
    },
    {
        id: "prod07",
        nome: "Bola de Tênis",
        preco: 25.50,
        categoriaId: "cat02",
        img: "img07"
    },
    {
        id: "prod08",
        nome: "Regador",
        preco: 25.50,
        categoriaId: "cat03",
        img: "img08"
    },
    {
        id: "prod09",
        nome: "Mangueira",
        preco: 25.50,
        categoriaId: "cat03",
        img: "img09"
    }
];

const categorias = [
    {
        id: "cat01",
        nome: "Cozinha"
    },
    {
        id: "cat02",
        nome: "Esportes"
    },
    {
        id: "cat03",
        nome: "Jardinagem"
    },
    
];

module.exports = {
    produtos,
    categorias
}