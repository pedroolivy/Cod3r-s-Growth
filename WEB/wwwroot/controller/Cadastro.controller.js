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
            debugger
            let peca = this.getView().getModel(modeloPeca).getData();
            let inputNome= this.getView().byId("nome");
            let inputDescricao= this.getView().byId("descricao");
            let inputCategoria= this.getView().byId("categoria");
            let inputData= this.getView().byId("data");
            let inputEstoque= this.getView().byId("estoque");
            let valNom = Validacao.validaNome(inputNome);
            let valDes = Validacao.validaDescricao(inputDescricao);
            let valCat = Validacao.validaCategoria(inputCategoria);
            let valDat = Validacao.validaData(inputData);
            let valEst = Validacao.validaEstoque(inputEstoque);
            if(valNom != "" && valDes != "" && valCat != "" && valDat != "" && valEst != ""){
                this._salvarPeca(peca);
            }
        },

        aoMudarCampoEstoque: function(){
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
