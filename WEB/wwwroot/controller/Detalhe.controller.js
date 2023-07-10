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
			const idPeca = oEvent.getParameter("arguments").id;

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
		},

		_removePeca: function(){
			const msgSuceso = "Peça removido com sucesso !";
			const msgErro = "Erro ao remover a peça.";
			const pecaId = this.obterIdPeca();

			fetch(`${api}/${pecaId}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			})
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

		aoClicarEditar:  function () {
			const idPeca = this.obterIdPeca();

			this._navegar(rotaEdicao, idPeca);
		},

		aoClicarVoltar: function () {
			this._navegar(rotaListaDePecas);
		},

		_navegar: function(rota, id){
			let oRouter = this.getOwnerComponent().getRouter();
			
			oRouter.navTo(rota, {id});
		},

		obterIdPeca: function() {
			return this.getView().getModel(modeloPeca).getData().id
		},
	});
});
