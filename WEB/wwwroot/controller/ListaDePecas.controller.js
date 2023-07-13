sap.ui.define([
	"./BaseController.controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"../services/RepositorioPeca"
], function (BaseController, JSONModel, Filter, FilterOperator, RepositorioPeca) {
	const rotaListaPecas = "listaDePecas";
	const modeloPeca = "pecas";
	const rotaCadastro = "cadastro";
	const rotaDetalhe = "detalhe";

	return BaseController.extend("PedroAutoPecas.controller.ListaDePecas", {
		onInit: function () {
			let oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute(rotaListaPecas).attachPatternMatched(this._aoCoincidirRota, this);
		},

		_aoCoincidirRota: function () {
			this._carregaPecas();
		},

		_carregaPecas: function(){
			RepositorioPeca.ObterTodos()
				.then(resp => resp.json())
				.then(data => {
					let oModel = new JSONModel(data);
					this.getView().setModel(oModel, modeloPeca)
				})
		},
		
		aoClicarAdicionar: function () {
			this.processarEvento(() => {
				this.navegar(rotaCadastro);
			});
		},

		aoClicarNaLinha: function (oEvent) {
			this.processarEvento(() => {
				let idPeca = oEvent.getSource().getBindingContext(modeloPeca).getObject().id
				this.navegar(rotaDetalhe, idPeca);
			});
		},

		aoClicarProcurarPeca : function (peca) {
			let aFilter = [];
			let nomePeca = peca.getParameter("newValue");
			if (nomePeca) {
				aFilter.push(new Filter("nome", FilterOperator.Contains, nomePeca));
			}

		 	this.byId("pecasDaTabela").getBinding("items").filter(aFilter);
		}

	});
});
