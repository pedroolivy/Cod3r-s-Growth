sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History"
], function (Controller, JSONModel, History) {

	const detalheDaPeca = "Detalhe";

	return Controller.extend("PedroAutoPecas.controller.Detalhe", {

		onInit: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("Detalhe").attachPatternMatched(this._aoCoincidirRota, this);
		},
		_aoCoincidirRota: function () {
			fetch('https://localhost:7028/api/pecas')
            .then(response => response.json())
            .then(json => {
                var oModel = new JSONModel(json);
                this.getView().setModel(oModel, detalheDaPeca);
        	})
        },
		onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("Peca", {}, true);
			}
		}
	});
});