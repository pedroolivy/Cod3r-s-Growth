sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox"
], function (Controller, JSONModel, MessageBox) {
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

		aoClicarRemover: function(){
			let msgAviso = "Deseja mesmo remover essa peça ?";

			MessageBox.confirm(msgAviso, {
                emphasizedAction: MessageBox.Action.YES,
                initialFocus: MessageBox.Action.NO,
                icon: MessageBox.Icon.WARNING,
                actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                onClose: (acao) => {
                    if (acao === MessageBox.Action.YES) {
                        this._removePeca()
                    }
                }
            });
		},

		_removePeca: function(){
			let msgSuceso = "Peça removido com sucesso !";
			let msgErro = "Erro ao remover a peça.";
			let pecaId = this.obtemIdPeca();

			fetch(`${api}/${pecaId}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(pecaId)
			})
			.then(res => {
				if (res.status == 204) {
					MessageBox.success(msgSuceso, {
						emphasizedAction: MessageBox.Action.OK,
						actions: [MessageBox.Action.OK], onClose : (acao) => {
							if (acao == MessageBox.Action.OK) {
								this._navegar(rotaListaDePecas);
							}
						}
					});
				}else {
					MessageBox.error(msgErro, {
					emphasizedAction: MessageBox.Action.CLOSE
					});
				}
			})
		},

		aoClicarEditar:  function () {
			let idPeca = this.obtemIdPeca();

			this._navegar(rotaEdicao, idPeca);
		},

		aoClicarVoltar: function () {
			this._navegar(rotaListaDePecas);
		},

		_navegar: function(rota, id){
			let oRouter = this.getOwnerComponent().getRouter();
			
			oRouter.navTo(rota, {id});
		},

		obtemIdPeca: function() {
			return this.getView().getModel(modeloPeca).getData().id
		},
	});
});