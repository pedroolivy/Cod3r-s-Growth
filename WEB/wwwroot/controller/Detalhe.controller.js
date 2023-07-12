sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
	"../services/RepositorioPeca"
], function (Controller, JSONModel, MessageBox, RepositorioPeca) {
	const rotaDetalhe = "detalhe";
	const modeloPeca = "peca";
	const rotaListaDePecas = "listaDePecas";
	const rotaEdicao = "edicao";

	return Controller.extend("PedroAutoPecas.controller.Detalhe", {
		onInit: function () {
			let oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute(rotaDetalhe).attachPatternMatched(this._aoCoincidirRota, this);
		},

		_aoCoincidirRota: function (oEvent) {
			const idPeca = oEvent.getParameter("arguments").id;

			if(idPeca)
				this._carregarPeca(idPeca);
        }, 

		_carregarPeca: function(idPeca){
			RepositorioPeca.ObterPorId(idPeca)
				.then(response => response.json())
				.then(json => {
					var oModel = new JSONModel(json);
					this.getView().setModel(oModel, modeloPeca);
			})
		},

		_removePeca: function(){
			const msgSuceso = "Peça removido com sucesso !";
			const msgErro = "Erro ao remover a peça.";
			const pecaId = this.obterIdPeca();

			RepositorioPeca.Remover(pecaId)
				.then(res => {
					const statusNoContent = 204;
					if (res.status == statusNoContent) {
						MessageBox.success(msgSuceso, {
							emphasizedAction: MessageBox.Action.OK,
							actions: [MessageBox.Action.OK], onClose : (acao) => {
								if (acao == MessageBox.Action.OK) 
									this._navegar(rotaListaDePecas);
							}
						});
					}else {
						MessageBox.error(msgErro, {
							emphasizedAction: MessageBox.Action.CLOSE
						});
					}
				})
		},

		_navegar: function(rota, id){
			let oRouter = this.getOwnerComponent().getRouter();
			
			oRouter.navTo(rota, {id});
		},

		aoClicarRemover: function(){
			this._processarEvento(() => {
				const msgAviso = "Deseja mesmo remover essa peça ?";
				MessageBox.confirm(msgAviso, {
					emphasizedAction: MessageBox.Action.YES,
					initialFocus: MessageBox.Action.NO,
					icon: MessageBox.Icon.WARNING,
					actions: [MessageBox.Action.YES, MessageBox.Action.NO],
					onClose: (acao) => {
						if (acao === MessageBox.Action.YES) 
							this._removePeca();
					}
				});
			});
		},

		aoClicarEditar:  function () {
			this._processarEvento(() => {
				const idPeca = this.obterIdPeca();
				this._navegar(rotaEdicao, idPeca);
			});
		},

		aoClicarVoltar: function () {
			this._processarEvento(() => {
				this._navegar(rotaListaDePecas);
			});
		},

		obterIdPeca: function() {
			return this.getView().getModel(modeloPeca).getData().id
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
