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
    const idDataFabricacao = "dataDeFabricacao";
    const idEstoque = "estoque";
    const idCategoria = "categoria"

	return Controller.extend("PedroAutoPecas.controller.Cadastro", {
		onInit: function () {
			let oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute(rotaCadastro).attachPatternMatched(this._aoCoincidirRota, this);
		},

		_aoCoincidirRota: function () {
            this.setarModeloPeca();
            this.setarIntervaloData();
            this.setarValorPadraoInputs();
        },

        setarModeloPeca: function () {
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

        setarIntervaloData:  function(){
            const dataMinimaValida = "1755-01-01T12:00:00.000Z"; 
            const dataMaxima = new Date();
            const dataMinima = new Date(dataMinimaValida);
            this.byId(idDataFabricacao).setMaxDate(dataMaxima);
            this.byId(idDataFabricacao).setMinDate(dataMinima);
        },

        setarValorPadraoInputs: function(){
            const peca = this.getView()
                .getModel(modeloPeca)
                .getData();
            Object.keys(peca).forEach(prop => {
                this.byId(prop).setValueState("None");
            })
        },

        aoClicarSalvar: function () {
            const peca = this.getView()
                .getModel(modeloPeca)
                .getData();
            const campoData = this.getView().byId(idDataFabricacao);

            this.validarCampos(peca);
            
            if(Validacao.ehCamposValidos(peca, campoData)){
                this._salvarPeca(peca);
            }
        }, 

        validarCampos: function(peca){
            Object.keys(peca).forEach(prop => {
                const inputData = this.getView().byId(idDataFabricacao);

                if(prop == idDataFabricacao){
                    Validacao.validaData(inputData)
                        ? this.resetarInput(prop) 
                        : this.definirInputErro(prop);
                }
                else if(prop == idEstoque){
                    Validacao.validaEstoque(peca[prop])
                        ? this.resetarInput(prop) 
                        : this.definirInputErro(prop);
                }
                else if(Validacao.existeValor(peca[prop])){
                    this.resetarInput(prop);
                } else{
                    this.definirInputErro(prop)
                }
            });
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
            .then(dataDeFabricacao => this._navegar(rotaDetalhe, dataDeFabricacao.id))
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
            let campoCategoria = this.getView().byId(idCategoria);
            this.formatarCategoria(campoCategoria);
        },

        aoMudarCampoEstoque: function() {
            let campoEstoque = this.getView().byId(idEstoque);
            this.formatarEstoque(campoEstoque);
        },
        
        resetarInput: function(idCampo){
            let input = this.getView().byId(idCampo);
            input.setValueState(sap.ui.core.ValueState.None);
        },

        definirInputErro: function(idCampo){
            const mensagemErro = `Por favor preecha o campo`;
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
