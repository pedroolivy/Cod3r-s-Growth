sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
    const rotaCadastro = "cadastro";
    const rotaListaDePecas = "listaDePecas";

	return Controller.extend("PedroAutoPecas.controller.Cadastro", {
		onInit: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute(rotaCadastro).attachPatternMatched(this._aoCoincidirRota, this);
		},

		/*_aoCoincidirRota: function (oEvent) {
			var idPeca = oEvent.getParameter("arguments").id
			fetch(`${api}/${idPeca}`)
            	.then(response => response.json())
            	.then(json => {
                	var oModel = new JSONModel(json);
                	this.getView().setModel(oModel, modeloPeca);
        	})
        },*/

		aoClicarVoltar: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo(rotaListaDePecas, {}, true);
		}
	});
});