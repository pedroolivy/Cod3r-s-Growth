sap.ui.define([
	"./BaseController.controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
	"../services/RepositorioPeca"
], function (BaseController, JSONModel, MessageBox, RepositorioPeca) {
	const rotaDetalhe = "detalhe";
	const modeloPeca = "peca";
	const rotaListaDePecas = "listaDePecas";
	const rotaEdicao = "edicao";
	const rotaNotFound = "notFound"

	return BaseController.extend("PedroAutoPecas.controller.Detalhe", {
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
			const statusNotFound = 500;

			RepositorioPeca.ObterPorId(idPeca)
				.then(response => {
					if(response.status === statusNotFound) {
						this.navegar(rotaNotFound)
					}
				 return response.json()})
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
						this.mensagemSucesso(msgSuceso, this.navegar.bind(this), [rotaListaDePecas])
					}else {
						this.mensagemfalha(msgErro);
					}
				})
		},

		aoClicarRemover: function(){
			this.processarEvento(() => {
				const msgAviso = "Deseja mesmo remover essa peça ?";
				this.mensagemConfirmar(msgAviso, this._removePeca.bind(this))
			});
		},

		mensagemSucesso: function (mensagem, callback, args = null) {
			return MessageBox.success(mensagem, {
			emphasizedAction: MessageBox.Action.OK,
			actions: [MessageBox.Action.OK], onClose : (acao) => {
				if (acao == MessageBox.Action.OK) 
					return callback.apply(this, args);
			}
			});
		},

		mensagemfalha: function (mensagem) {
			return MessageBox.error(mensagem, {
				emphasizedAction: MessageBox.Action.CLOSE
			});
		},

		mensagemConfirmar: function (mensagem, callback) {
			return MessageBox.confirm(mensagem, {
				emphasizedAction: MessageBox.Action.YES,
				initialFocus: MessageBox.Action.NO,
				icon: MessageBox.Icon.WARNING,
				actions: [MessageBox.Action.YES, MessageBox.Action.NO],
				onClose: (acao) => {
					if (acao === MessageBox.Action.YES)
						return callback();
					}
			});
		},

		aoClicarEditar:  function () {
			this.processarEvento(() => {
				const idPeca = this.obterIdPeca();
				this.navegar(rotaEdicao, idPeca);
			});
		},

		aoClicarVoltar: function () {
			this.processarEvento(() => {
				this.navegar(rotaListaDePecas);
			});
		},

		obterIdPeca: function() {
			return this.getView().getModel(modeloPeca).getData().id
		}

	});
});
