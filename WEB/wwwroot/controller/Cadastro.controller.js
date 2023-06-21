sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    const rotaCadastro = "cadastro";
    const rotaListaDePecas = "listaDePecas";
    const api = "https://localhost:7028/api/Peca";
    const modeloPeca = "pecas";

	return Controller.extend("PedroAutoPecas.controller.Cadastro", {
		onInit: function () {
			let oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute(rotaCadastro).attachPatternMatched(this._aoCoincidirRota, this);
		},
        
		_aoCoincidirRota: function () {
            let peca = {
                nome: "",
                descricao: "",
                categoria: "",
                dataDeFabricacao: "",
                estoque: ""
            }
            this.getView().setModel(new JSONModel(peca), modeloPeca);
        },

        aoClicarSalvar: function () {
            let criacaoPeca = this.getView().getModel(modeloPeca).getData();
            this.aoSalvar(criacaoPeca);
            this.aoClicarVoltar();
        },

        aoSalvar: function (oEvent) {
            console.log(oEvent);
			fetch(api, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(oEvent)
            }).then(response => response.json())
        },

		aoClicarVoltar: function () {
			let oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo(rotaListaDePecas, {}, true);
		},

        aoClicarCancelar: function () {
			let oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo(rotaListaDePecas, {}, true);
		}
	});
});