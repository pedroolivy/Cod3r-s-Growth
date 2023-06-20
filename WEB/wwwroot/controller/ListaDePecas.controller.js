sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	const rotaListaPecas = "listaDePecas";
	const api = "https://localhost:7028/api/Peca";
	const modeloPeca = "pecas";
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

		aoClicarNaLinha: function (oEvent) {
			let id = oEvent.getSource().getBindingContext(modeloPeca).getObject().id
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo(rotaDetalhe, {id});
		}
	});
});
