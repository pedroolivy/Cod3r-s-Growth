sap.ui.define([
	"./BaseController.controller",
	"sap/m/MessageBox",
	"../services/RepositorioPeca"
], function (BaseController, MessageBox, RepositorioPeca) {
	const rotaDetalhe = "detalhe";
	const modeloPeca = "peca";
	const rotaListaDePecas = "listaDePecas";
	const rotaEdicao = "edicao";
	const rotaNotFound = "notFound";
	let oResourceBundle;

	return BaseController.extend("PedroAutoPecas.controller.Detalhe", {
		onInit: function () {
			oResourceBundle = this.carregarRecursoI18n();
			let oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute(rotaDetalhe).attachPatternMatched(this._aoCoincidirRota, this);
		},

		_aoCoincidirRota: function (oEvent) {
			this.processarEvento(() => {
				const idPeca = oEvent.getParameter("arguments").id;

				if(idPeca)
					this._carregarPeca(idPeca);
			});
        }, 

		_carregarPeca: async function(idPeca){
			let peca =  await RepositorioPeca.ObterPorId(idPeca);
			let statusCode = 500;
			
			peca == statusCode
				?this.navegar(rotaNotFound)
				:this.getView().setModel(this.criarModeloPeca(peca), modeloPeca);
		},

		_removePeca: async function(){
			const msgSucesso = "MensagemSucesso";
			const msgErro = "MensagemErro";
			const pecaId = this.obterIdPeca();

			let status = await RepositorioPeca.Remover(pecaId);
			const statusNoContent = 204;
			if (status == statusNoContent) {
				this.mensagemSucesso(oResourceBundle.getText(msgSucesso), this.navegar.bind(this), [rotaListaDePecas])
			}else {
				this.mensagemfalha(oResourceBundle.getText(msgErro));
			}
		},

		aoClicarRemover: function(){
			this.processarEvento(() => {
				const msgAviso = "MensagemAviso";
				this.mensagemConfirmar(oResourceBundle.getText(msgAviso), this._removePeca.bind(this))
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