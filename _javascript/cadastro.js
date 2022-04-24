var button1 = document.getElementById("cadas");
button1.addEventListener("click", verificar);
/**************************************
                ↑↑ botão ↑↑
 **************************************/

function verificar() {

    /*var dado_formulario = {
        Name: Nome(),
        CPF: valiCPF(),
        CNPJ: valiCNPJ(),
        Telefone: Tel(),
        Cep: Cep(),
        Rua: document.getElementById("rua").value,
        Numero: Numero_da_residencia(),
        Bairro: document.getElementById("bairro").value,
        Cidade: document.getElementById("cidade").value,
        Estado: document.getElementById("uf").value,
        Complemento: Comp(),
    }*/
    var Name= Nome();
    var CPF= valiCPF();
    var CNPJ= valiCNPJ();
    var Telefone= Tel();
    var CEP = Cep();
    var Rua= document.getElementById("rua").value;
    var Numero= Numero_da_residencia();
    var Bairro= document.getElementById("bairro").value;
    var Cidade= document.getElementById("cidade").value;
    var Estado= document.getElementById("uf").value;
    var Complemento= Comp();

    /**********************************************************
    ↑↑ variável que armazena todos os campos do formulario ↑↑
    **********************************************************/

    dado_formulario1 ={

        Name, CPF, Telefone, CEP, Rua, Numero, Bairro, Cidade, Estado, Complemento
    }
    dado_formulario2 ={

        Name, CNPJ, Telefone, CEP, Rua, Numero, Bairro, Cidade, Estado, Complemento
    }

    if(CPF == false)
    {
        if (Name != false &&
            CNPJ != false &&
            Telefone != false &&
            cep != false &&
            Numero != false) {
            /***************************************************************
            ↑↑ esse if verificar se algum campo do formulario nâo foi preenchido considerando CNPJ↑↑
            ***************************************************************/
    
            var json = JSON.stringify(dado_formulario2);
            console.log(json);
            document.write("<h1>Dados</h1>"); //escreve o titulo do json
            document.write(json); //escreve os dados do furmulario no json
            /**********************************
            ↑↑ cria e prenche o arquivo json ↑↑
             **********************************/
        }
    }
    if(CNPJ == false )
    {
        if (Name != false &&
            CPF != false &&
            Telefone != false &&
            cep != false &&
            Numero != false) {
            /***************************************************************
            ↑↑ esse if verificar se algum campo do formulario nâo foi preenchido considerando CPF↑↑
            ***************************************************************/
            //window.open()
            var json = JSON.stringify(dado_formulario1);
            console.log(json);
            document.write("<h1>Dados</h1>");//escreve o titulo do json
            document.write(json); //escreve os dados do furmulario no json
            /**********************************
            ↑↑ cria e prenche o arquivo json ↑↑
             **********************************/
        }
    }
    

}
/***********************************************************************
↓↓ funções para verificar se os dados do formulario foram preenchidos ↓↓
 ***********************************************************************/
function Nome() {

    if (document.getElementById("nome").value == "") {
        alert("Nome esta vazio")
        return (false);
    } else {
        return (document.getElementById("nome").value)
    }
}

function Cpf() {
    var strCPF = TestaCPF(document.getElementById("cpf_CNPJ").value);
    if (strCPF != true) {
        alert("CPF invalido");
        return (false);
    } else {
        var cpf_errado = document.getElementById("cpf_CNPJ").value;
        r = cpf_errado.split(""); //transformar uma string em um array separrando cada letra
        var cpf_certo = r[0] + r[1] + r[2] + "." + r[3] + r[4] + r[5] + "." + r[6] + r[7] + r[8] + "-" + r[9] + r[10] //combina o array em uma string 
        return (cpf_certo)
    }
}

function TestaCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;
    if (strCPF == "00000000000") return false;

    for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return false;
    return true;
}

function CNPJ() {
    var strCNPJ = TestaCNPJ(document.getElementById("cpf_CNPJ").value);
    if (strCNPJ != true) {
        alert("CNPJ invalido");
        return (false);
    } else {
        var CNPJ_errado = document.getElementById("cpf_CNPJ").value;
        r = CNPJ_errado.split(""); //transformar uma string em um array separrando cada letra
        var CNPJ_certo = r[0] + r[1] + "." + r[2] + r[3] + r[4] + "." + r[5] + r[6] + r[7] + "/" + r[8] + r[9] + r[10] + r[11] + "-" + r[12] + r[13];//01.234.567/0001-91
        return (CNPJ_certo)
    }
}

function TestaCNPJ(cnpj) {
    if (!cnpj || cnpj.length != 14
        || cnpj == "00000000000000"
        || cnpj == "11111111111111"
        || cnpj == "22222222222222"
        || cnpj == "33333333333333"
        || cnpj == "44444444444444"
        || cnpj == "55555555555555"
        || cnpj == "66666666666666"
        || cnpj == "77777777777777"
        || cnpj == "88888888888888"
        || cnpj == "99999999999999")
        return false
    var tamanho = cnpj.length - 2
    var numeros = cnpj.substring(0, tamanho)
    var digitos = cnpj.substring(tamanho)
    var soma = 0
    var pos = tamanho - 7
    for (var i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--
        if (pos < 2) pos = 9
    }
    var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
    if (resultado != digitos.charAt(0)) return false;
    tamanho = tamanho + 1
    numeros = cnpj.substring(0, tamanho)
    soma = 0
    pos = tamanho - 7
    for (var i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--
        if (pos < 2) pos = 9
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
    if (resultado != digitos.charAt(1)) return false
    return true;

}

/*function vali() {
    if (document.getElementById("cpf_CNPJ").value == "") {
        alert("CPF ou CNPJ esta vazio")
        return (false);
    } else {
        if (document.getElementById("cpf_CNPJ").value.length == 11) {
            var resultado_cpf = Cpf()
            if (resultado_cpf == false) {
                return (false)
            } else {
                return (resultado_cpf)
            }
        } else {
            if (document.getElementById("cpf_CNPJ").value.length == 14) {
                var resultado_CNPJ = CNPJ()
                if (resultado_CNPJ == false) {
                    return (false)
                } else {
                    return (resultado_CNPJ)
                }
            } else {
                alert("CPF ou CNPJ invalido")
                return (false);
            }
        }

    }
}*/

function valiCPF() {
    if (document.getElementById("cpf_CNPJ").value == "") {
        alert("CPF ou CNPJ esta vazio")

        return (false);
    } else {
        if (document.getElementById("cpf_CNPJ").value.length == 11) {
            var resultado_cpf = Cpf()
            if (resultado_cpf == false) {
                return (false)
            } else {
                return (resultado_cpf)
            }
        } else{
            return (false)
        }
    }

}
function valiCNPJ() {
    if (document.getElementById("cpf_CNPJ").value == "") {
        //alert("CPF ou CNPJ esta vazio")
        return (false);
    } else {
        if (document.getElementById("cpf_CNPJ").value.length == 14) {
            var resultado_CNPJ = CNPJ()
            if (resultado_CNPJ == false) {
                return (false)
            } else {
                return (resultado_CNPJ)
            }
        } else {

            return(false)
        }
    }
}

    function Tel() {

        if (document.getElementById("tele").value == "") {
            alert("telefone esta vazio")
            return (false);
        } else {
            return (document.getElementById("tele").value)
        }
    }

    function Cep() {

        if (document.getElementById("cep").value == "" &&
            document.getElementById("rua").value == "" &&
            document.getElementById("bairro").value == "" &&
            document.getElementById("cidade").value == "" &&
            document.getElementById("uf").value == ""
        ) {
            alert("endereço invalido")
            return (false);
        } else {
            return (document.getElementById("cep").value)
        }
    }

    function Numero_da_residencia() {

        if (document.getElementById("numero").value == "") {
            alert("numero esta vazio")
            return (false);
        } else {
            return (document.getElementById("numero").value)
        }
    }

    function Comp() {

        if (document.getElementById("Complemento").value == "") {
            return (" ");
        } else {
            return (document.getElementById("Complemento").value)
        }
    }
