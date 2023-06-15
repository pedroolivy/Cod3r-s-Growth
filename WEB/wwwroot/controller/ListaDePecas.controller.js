sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {

	const modeloPeca = "pecas";
	const api = "https://localhost:7028/api/Peca";

	return Controller.extend("PedroAutoPecas.controller.ListaDePecas", {
		onInit: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("Peca").attachPatternMatched(this._aoCoincidirRota, this);
		},

		_aoCoincidirRota: function () {
			fetch(api)
				.then(resp => resp.json())
				.then(data => {
					let oModel = new JSONModel(data);
					this.getView().setModel(oModel, modeloPeca)
				})
		},

		onPress: function (oEvent) {
			let id = oEvent.getSource().getBindingContext("pecas").getObject().id
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("Detalhe", {id});
		}
	});
});
