sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../services/Validacao"
], function (Controller, JSONModel, Validacao) {
    const rotaCadastro = "cadastro";
    const rotaListaDePecas = "listaDePecas";
    const rotaDetalhe = "detalhe";
    const api = "https://localhost:7028/api/Peca";
    const modeloPeca = "pecas";

	return Controller.extend("PedroAutoPecas.controller.Cadastro", {
		onInit: function () {
			let oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute(rotaCadastro).attachPatternMatched(this._aoCoincidirRota, this);
		},

		_aoCoincidirRota: function () {
            this._atualizaPagina();
            this._iniciaCamposPeca();
            this._comparaData();
        },

        _atualizaPagina: function(){
            this.byId("nome").setValueState("None");
            this.byId("descricao").setValueState("None");
            this.byId("categoria").setValueState("None");
            this.byId("data").setValueState("None");
            this.byId("estoque").setValueState("None");
        },

        _iniciaCamposPeca: function () {
            const stringVazia = "";
            let peca = {
                nome: stringVazia,
                descricao: stringVazia,
                categoria: stringVazia,
                dataDeFabricacao: stringVazia,
                estoque: stringVazia
            }
            this.getView().setModel(new JSONModel(peca), modeloPeca);
        },

        _comparaData:  function(){
            let dataMaxima = new Date();
            const dataMinima = new Date("1755-01-01T12:00:00.000Z");
            this.byId("data").setMaxDate(dataMaxima);
            this.byId("data").setMinDate(dataMinima);
        },

        _salvarPeca: function (peca) {
			fetch(api, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(peca)
            })
            .then(response => response.json())
            .then(data => this._navegar(rotaDetalhe, data.id))
        },

        aoClicarSalvar: function () {
            let peca = this.getView().getModel(modeloPeca).getData();
            this.validarCampos(peca);
            if(Validacao.ehCamposValidos(peca)){
                this._salvarPeca(peca);
            }
        }, 

        validarCampos: function(peca){
            debugger
            const idCampoNome = "nome";
            const idCampoDescricao = "descricao";
            const idCampoCategoria = "categoria";
            const idCampoData = "data";
            const idCampoEstoque = "estoque";

            if(Validacao.validaNome(peca.nome)){
                this.resetarInput(idCampoNome);
            } else{
                const mensagemErro = "Por favor preencha o campo do nome";
                this.definirInputErro(idCampoNome, mensagemErro)
            }
            if(Validacao.validaDescricao(peca.descricao)){
                this.resetarInput(idCampoDescricao);
            } else{
                const mensagemErro = "Por favor preencha o campo do nome";
                this.definirInputErro(idCampoDescricao, mensagemErro)
            }
            if(Validacao.validaCategoria(peca.categoria)){
                this.resetarInput(idCampoCategoria);
            } else{
                const mensagemErro = "Por favor preencha o campo categoria";
                this.definirInputErro(idCampoCategoria, mensagemErro)
            }
            if(Validacao.validaEstoque(peca.estoque)){
                debugger
                this.resetarInput(idCampoEstoque);
            } else{
                debugger
                const mensagemErro = "Por favor preencha o campo do nome";
                this.definirInputErro(idCampoEstoque, mensagemErro)
            }
            if(Validacao.validaData(peca.dataDeFabricacao)){
                this.resetarInput(idCampoData);
            } else{
                const mensagemErro = "Por favor preencha o campo do nome";
                this.definirInputErro(idCampoData, mensagemErro)
            }
            
            
        },

        formatarCategoria: function(campoCategoria){
            const regexLetras = /[^\D]/g;
            let valorDoCampo = campoCategoria.getValue();
            campoCategoria.setValue(valorDoCampo.replaceAll(regexLetras, "").substring(0, 19));
        },

        formatarEstoque: function(campoEstoque){
            const regexLetras = /[^\d]/g;
            let valorDoCampo = campoEstoque.getValue();
            campoEstoque.setValue(valorDoCampo.replaceAll(regexLetras, ""));
        },

        aoMudarCampoCategoria: function() {
            let campoCategoria = this.getView().byId("categoria");
            this.formatarCategoria(campoCategoria);
            debugger
            Validacao.validaCategoria(campoCategoria);
        },

        aoMudarCampoEstoque: function() {
            let campoEstoque = this.getView().byId("estoque");
            this.formatarEstoque(campoEstoque);
            debugger
            console.log(campoEstoque)
            console.log(campoEstoque.getValue())
            Validacao.validaEstoque(campoEstoque.getValue());
        },
        
        resetarInput: function(idCampo){
            let input = this.getView().byId(idCampo);
            input.setValueState(sap.ui.core.ValueState.None);
        },

        definirInputErro: function(idCampo, mensagemErro){
            let input = this.getView().byId(idCampo);
            
            input.setValueState(sap.ui.core.ValueState.Error);
            input.setValueStateText(mensagemErro);
        },
        
		aoClicarVoltar: function () {
            this._navegar(rotaListaDePecas);
		},

        aoClicarCancelar: function () {
			this._navegar(rotaListaDePecas);
		},

        _navegar: function(rota, id){
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo(rota, {id});
        }
	});
});
