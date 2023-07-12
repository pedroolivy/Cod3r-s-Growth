sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"../services/RepositorioPeca"
], function (Controller, JSONModel, Filter, FilterOperator, RepositorioPeca, ) {
	const rotaListaPecas = "listaDePecas";
	const modeloPeca = "pecas";
	const rotaCadastro = "cadastro";
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
			RepositorioPeca.ObterTodos()
				.then(resp => resp.json())
				.then(data => {
					let oModel = new JSONModel(data);
					this.getView().setModel(oModel, modeloPeca)
				})
		},

		_navegar: function(rota, id){
			let oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo(rota, {id});
		},
		
		aoClicarAdicionar: function () {
			this._processarEvento(() => {
				this._navegar(rotaCadastro);
			});
		},

		aoClicarNaLinha: function (oEvent) {
			this._processarEvento(() => {
				let idPeca = oEvent.getSource().getBindingContext(modeloPeca).getObject().id
				this._navegar(rotaDetalhe, idPeca);
			});
		},

		aoClicarProcurarPeca : function (peca) {
			let aFilter = [];
			let nomePeca = peca.getParameter("newValue");
			if (nomePeca) {
				aFilter.push(new Filter("nome", FilterOperator.Contains, nomePeca));
			}

		 	this.byId("pecasDaTabela").getBinding("items").filter(aFilter);
		},

		_processarEvento: function(action){
			const tipoDaPromise = "catch",
				tipoBuscado = "function";
			try {
				var promise = action();
				if(promise && typeof(promise[tipoDaPromise]) == tipoBuscado){
					promise.catch(error => MessageBox.error(error.message));
				}
			} catch (error) {
				MessageBox.error(error.message);
			}
		}	

	});
});
