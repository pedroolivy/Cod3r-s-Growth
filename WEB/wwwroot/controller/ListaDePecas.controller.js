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
			let oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute(rotaListaPecas).attachPatternMatched(this._aoCoincidirRota, this);
		},

		_aoCoincidirRota: function () {
			this._carregaPecas();
		},

		_carregaPecas: function(){
			fetch(api)
			.then(resp => resp.json())
			.then(data => {
				let oModel = new JSONModel(data);
				this.getView().setModel(oModel, modeloPeca)
			})
		},

		_aoNavegar: function(rota, id){
			let oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo(rota, {id});
		},

		aoClicarProcurarPeca : function (peca) {
			let aFilter = [];
			let nomePeca = peca.getParameter("query");
			if (nomePeca) {
				aFilter.push(new Filter("nome", FilterOperator.Contains, nomePeca));
			}
			let oList = this.byId("pecasDaTabela");
			let oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},

		aoClicarAdicionar: function () {
			this._aoNavegar(rotaCadastro);
		},

		aoClicarNaLinha: function (oEvent) {
			let idPeca = oEvent.getSource().getBindingContext(modeloPeca).getObject().id
			this._aoNavegar(rotaDetalhe, idPeca);
		}
	});
});
