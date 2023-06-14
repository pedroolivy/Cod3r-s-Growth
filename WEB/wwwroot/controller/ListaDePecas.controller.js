sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {

	const modeloPeca = "pecas";

	return Controller.extend("PedroAutoPecas.controller.ListaDePecas", {
		onInit: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("Peca").attachPatternMatched(this._aoCoincidirRota, this);
		},

		_aoCoincidirRota: function () {
			fetch('https://localhost:7028/api/pecas')
            .then(response => response.json())
            .then(json => {
                var oModel = new JSONModel(json);
                this.getView().setModel(oModel, modeloPeca);
        })}
	});
});
