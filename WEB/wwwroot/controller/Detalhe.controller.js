sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	const rotaDetalhe = "detalhe";
	const api = "https://localhost:7028/api/Peca";
	const modeloPeca = "peca";
	const rotaListaDePecas = "listaDePecas";
	const rotaEdicao = "edicao";

	return Controller.extend("PedroAutoPecas.controller.Detalhe", {
		onInit: function () {
			let oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute(rotaDetalhe).attachPatternMatched(this._aoCoincidirRota, this);
		},

		_aoCoincidirRota: function (oEvent) {
			let idPeca = oEvent.getParameter("arguments").id;
			if(idPeca)
				this._carregarPeca(idPeca);
        },
		
		_carregarPeca: function(idPeca){
			fetch(`${api}/${idPeca}`)
				.then(response => response.json())
				.then(json => {
					var oModel = new JSONModel(json);
					this.getView().setModel(oModel, modeloPeca);
			})
		},

		_removePeca: function(peca){
			fetch(`${api}/${peca.id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(peca)
			})
			.then(response => response.json())
			.then(this._navegar(rotaListaDePecas))
		},

		aoClicarRemover: function(){
			const peca = this.getView().getModel(modeloPeca).getData();
			this._removePeca(peca);
		},

		aoClicarEditar:  function () {
			let idPeca = this.getView().getModel(modeloPeca).getData().id
			this._navegar(rotaEdicao, idPeca);
		},

		aoClicarVoltar: function () {
			this._navegar(rotaListaDePecas);
		},

		_navegar: function(rota, id){
			let oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo(rota, {id});
		}
	});
});