

// Lista de textos comuns para tentativa de decodificação
const textosComuns = ["café", "1234", "admin", "teste", "flask", "python", 
"casa", "12345", "trabalho", "senha123", "qwerty", "abc123", "deixaentrar", 
"bemvindo", "macaco", "carro", "login", "convidado", "usuario", 
"amor", "root", "superusuario", "gato", "pass", "123456", "12345678", 
"azerty", "nãoconfie", "sol", "família", "ola", "liberdade", 
"ninja", "sombra", "mestre", "cachorro", "111111", "654321", 
"telefone", "senha1", "padrão", "qazwsx", "comida", "1q2w3e4r", 
"senha1234", "teamo", "admin123", "teste123", "superman", "batman", 
"acesso", "123123", "qwertyuiop", "1qaz2wsx", "abcde", "amigo", 
"asdfgh", "minhasenha", "computador", "dragão", "futebol", 
"deixaentrar123", "zaq12wsx", "senha0", "q1w2e3r4", "p@ssw0rd", 
"seguro", "minha", "seguro123", "minhasenha", "oracle", "oracle123", 
"banco", "banco123", "servidor", "servidor123", "sorvete", 
"linux", "windows", "senha!", "mudeagora", "senha2", "sistema", 
"sol", "sistema123", "usuarioteste", "exemplo", "exemplo123", 
"primavera", "verão", "outono", "inverno", "estações", "essa", 
"estações123", "janeiro", "fevereiro", "março", "abril", "maio", 
"junho", "julho", "agosto", "setembro", "outubro", "novembro", 
"dezembro", "meses", "escola", "meses123", "fimdesemana", 
"diasemana", "manhã", "tarde", "noite", "dia", "dias", 
"dias123", "trabalho", "livro", "trabalho123", "emprego", 
"emprego123", "casa", "casa123", "lar", "lar123", "familia", 
"mesa", "familia123", "amigo", "amigo123", "amigos", "amigos123", 
"escola", "escola123", "educação", "educação123", "aprendizado", 
"professor", "aprendizado123", "professor123", "aluno", "aluno123", 
"usuário", "usuário123", "conta", "conta123", "sessão", "sessão123", 
"segurança", "segurança123", "proteção", "proteção123", "defesa", 
"defesa123", "guarda", "guarda123", "escudo", "escudo123", "seguro", 
"seguro123", "trancar", "trancar123", "abrir", "abrir123", "fechar", 
"fechar123", "chave", "chave123", "portão", "portão123", "porta", 
"porta123", "janela", "janela123", "código", "código123", 
"programação", "programação123", "programa", "programa123", 
"desenvolvedor", "desenvolvedor123", "engenheiro", "engenheiro123", 
"software", "software123", "hardware", "hardware123", "rede", 
"rede123", "internet", "internet123", "web", "web123", "site", 
"site123", "domínio", "domínio123", "hospedagem", "hospedagem123", 
"nuvem", "nuvem123", "dados", "dados123", "banco", "banco123", 
"admin1", "admin2", "admin3", "admin4", "admin5", "usuario1", 
"usuario2", "usuario3", "usuario4", "usuario5", "teste1", "teste2", 
"teste3", "teste4", "teste5", "exemplo1", "exemplo2", "exemplo3", 
"exemplo4", "exemplo5", "exemplo6", "exemplo7", "exemplo8", 
"exemplo9", "exemplo0", "cidade", "praia", "montanha", "festa", 
"caminho", "estrada", "rua", "parque", "jardim", "flor", "comida", 
"bebida", "água", "fruta", "animal", "pássaro", "peixe", "fogo", 
"ar", "terra", "mar", "sol", "lua", "estrela", "coração", 
"paz", "esperança", "sorriso", "feliz", "triste", "cansado", 
"amigos", "pessoas", "gente", "vida", "mundo", "universo", 
"natureza", "oceano", "rio", "montanha", "planeta", "vento", 
"chuva", "neve", "calor", "frio", "tempestade", "relâmpago", 
"trovão", "sonho", "realidade", "verdade", "mentira", "saudade", 
"alegria", "tristeza", "surpresa", "medo", "coragem", "força", 
"poder", "luz", "escuridão", "vida", "morte", "tempo", "relógio", 
"música", "canção", "filme", "arte", "poesia", "livro", "história", 
"viagem", "aventura", "descoberta", "mistério", "ciência", 
"tecnologia", "espaço", "galáxia", "universo", "planeta", 
"estrela", "futuro", "passado", "presente", "estacio", "ola mundo"
];

// Função para gerar o hash SHA-224
function gerarHash() {
    const texto = document.getElementById('texto').value;
    const hash = sha224(texto);
    document.getElementById('hash-output').innerText = hash;
    document.getElementById('download-hash').style.display = "inline-block";
}

// Função para tentar decodificar o hash SHA-224
function decodificarHash() {
    const hashInput = document.getElementById('hash_input').value;
    let decodedText = null;

    for (let texto of textosComuns) {
        if (sha224(texto) === hashInput) {
            decodedText = texto;
            break;
        }
    }

    document.getElementById('decoded-output').innerText = decodedText ? decodedText : "Texto não encontrado";
    document.getElementById('download-decoded').style.display = decodedText ? "inline-block" : "none";
}

// Função para baixar o conteúdo em um arquivo .txt
function baixarArquivo(filename, content) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

// Função SHA-224 
function sha224(str) {
    return sha256.sha224(str);
}

// Função para calcular o hash de um arquivo
function calculateHash(filePath) {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash('sha256'); // Usando SHA-256 como exemplo
        const stream = fs.createReadStream(filePath);

        stream.on('data', (data) => {
            hash.update(data);
        });

        stream.on('end', () => {
            resolve(hash.digest('hex'));
        });

        stream.on('error', (err) => {
            reject(err);
        });
    });
}

// Função para ler os arquivos do usuário e comparar os hashes
async function compareFiles(file1, file2) {
    try {
        const hash1 = await calculateHash(file1);
        const hash2 = await calculateHash(file2);

        console.log(`Hash do arquivo 1 (${file1}): ${hash1}`);
        console.log(`Hash do arquivo 2 (${file2}): ${hash2}`);

        if (hash1 === hash2) {
            console.log('Os arquivos são iguais.');
        } else {
            console.log('Os arquivos são diferentes.');
        }
    } catch (err) {
        console.error('Erro ao calcular hash:', err);
    }
}

// Interface para o usuário inserir os caminhos dos arquivos
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Digite o caminho do primeiro arquivo: ', (file1) => {baixarArquivo})
    rl.question('Digite o caminho do segundo arquivo: ', (file2) => {baixarArquivo})
