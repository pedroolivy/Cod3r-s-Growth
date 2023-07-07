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

			MessageBox.confirm("Deseja mesmo remover essa peça ?", {
                emphasizedAction: MessageBox.Action.YES,
                initialFocus: MessageBox.Action.NO,
                icon: MessageBox.Icon.WARNING,
                actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                onClose: (acao) => {
                    if (acao === MessageBox.Action.YES) {
                        this._removePeca(peca)
                        .then(res => {
                            if (res.status == 200) {
                                MessageBox.success("Peça removido com sucesso !", {
                                    emphasizedAction: MessageBox.Action.OK,
                                    actions: [MessageBox.Action.OK], onClose : (acao) => {
                                        if (acao == MessageBox.Action.OK) {
                                            this.aoClicarEmVoltar();
                                        }
                                    }
                            	});
                        	}else {
								MessageBox.error("Erro ao remover a peça.", {
								emphasizedAction: MessageBox.Action.CLOSE
								});
							}
                        });
                    }
                }
            });
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