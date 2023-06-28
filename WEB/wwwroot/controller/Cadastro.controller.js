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
            
            const stringVazia = "";

            let peca = {
                nome: stringVazia,
                descricao: stringVazia,
                categoria: stringVazia,
                dataDeFabricacao: stringVazia,
                estoque: stringVazia
            }

            this._comparaData();

            this.getView().setModel(new JSONModel(peca), modeloPeca);
        },

        _atualizaPagina: function(){
            this.byId("nome").setValueState("None");
            this.byId("descricao").setValueState("None");
            this.byId("categoria").setValueState("None");
            this.byId("data").setValueState("None");
            this.byId("estoque").setValueState("None");
        },

        _comparaData:  function(){
            let dataMaxima = new Date();
            this.byId("data").setMaxDate(dataMaxima);

            let dataMinima = new Date("1755-01-01T12:00:00.000Z");
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

        _navegar: function(rota, id){
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo(rota, {id});
        },

        aoClicarSalvar: function () {
            let peca = this.getView().getModel(modeloPeca).getData();
            //validar campos 
            this.validarCampos(peca);
            //definir erros

            //salvar peça
            if(Validacao.ehCamposValidos(peca)){
                this._salvarPeca(peca);
            }
        },

        validarCampos(peca){
            const idCampoNome = "nome";
            if(Validacao.validaNome(peca.nome)){
                this.resetarInput(idCampoNome);
            }else{
                const mensagemErro = "Por favor preencha o campo do nome";
                this.definirInputErro(idCampoNome, mensagemErro)
            }
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

        aoMudarCampoCategoria: function() {
            Validacao.validaCategoria(this.getView().byId("categoria"));
        },

        aoMudarCampoEstoque: function() {
            Validacao.validaEstoque(this.getView().byId("estoque"));
        },

		aoClicarVoltar: function () {
            this._navegar(rotaListaDePecas);
		},

        aoClicarCancelar: function () {
			this._navegar(rotaListaDePecas);
		}
	});
});
