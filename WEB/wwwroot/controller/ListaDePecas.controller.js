sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, JSONModel, Filter, FilterOperator) {
	const rotaListaPecas = "listaDePecas";
	const api = "https://localhost:7028/api/Peca";
	const modeloPeca = "pecas";
	const rotaCadastro = "cadastro"
	const rotaDetalhe = "detalhe";

	return Controller.extend("PedroAutoPecas.controller.ListaDePecas", {
		onInit: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute(rotaListaPecas).attachPatternMatched(this._aoCoincidirRota, this);
		},

		_aoCoincidirRota: function () {
			fetch(api)
			.then(resp => resp.json())
			.then(data => {
				let oModel = new JSONModel(data);
				this.getView().setModel(oModel, modeloPeca)
			})
		},

		aoProcurarPeca : function (oEvent) {
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("nome", FilterOperator.Contains, sQuery));
			}
			var oList = this.byId("pecasDaTabela");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},

		aoClicarAdicionar: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo(rotaCadastro);
		},

		aoClicarNaLinha: function (oEvent) {
			let id = oEvent.getSource().getBindingContext(modeloPeca).getObject().id
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo(rotaDetalhe, {id});
		}
	});
});
