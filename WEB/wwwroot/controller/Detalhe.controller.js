sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	const rotaDetalhe = "detalhe";
	const api = "https://localhost:7028/api/Peca";
	const modeloPeca = "peca";
	const rotaListaDePecas = "listaDePecas";

	return Controller.extend("PedroAutoPecas.controller.Detalhe", {
		onInit: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute(rotaDetalhe).attachPatternMatched(this._aoCoincidirRota, this);
		},

		_aoCoincidirRota: function (oEvent) {
			var idPeca = oEvent.getParameter("arguments").id
			fetch(`${api}/${idPeca}`)
            	.then(response => response.json())
            	.then(json => {
                	var oModel = new JSONModel(json);
                	this.getView().setModel(oModel, modeloPeca);
        	})
        },

		aoClicarVoltar: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo(rotaListaDePecas, {}, true);
		}
	});
});