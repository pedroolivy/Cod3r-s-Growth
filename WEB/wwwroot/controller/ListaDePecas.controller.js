sap.ui.define([
	"./BaseController.controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"../services/RepositorioPeca",
	'sap/m/MessageToast'
], function (BaseController, Filter, FilterOperator, RepositorioPeca, MessageToast) {
	const rotaListaPecas = "listaDePecas";
	const modeloPeca = "pecas";
	const rotaCadastro = "cadastro";
	const rotaDetalhe = "detalhe";
	let oResourceBundle;

	return BaseController.extend("PedroAutoPecas.controller.ListaDePecas", {
		onInit: function () {
			oResourceBundle = this.carregarRecursoI18n();
			let oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute(rotaListaPecas).attachPatternMatched(this._aoCoincidirRota, this);
		},

		_aoCoincidirRota: function () {
			this.processarEvento(() => {
				this._carregaPecas();
			});
		},

		_carregaPecas: async function(){
			let listaPecas = await RepositorioPeca.ObterTodos();
			let TipoDeListaPecas = "number";

			if(typeof listaPecas == TipoDeListaPecas){
				var msg = 'ErroAoObterTodos';
				
				MessageToast.show(oResourceBundle.getText(msg));
			}
			this.getView().setModel(this.criarModeloPeca(listaPecas), modeloPeca);
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
			this.processarEvento(() => {
				const propNomeTabela = "nome";
				const idTabela = "pecasDaTabela";
				let aFilter = [];
				let nomePeca = peca.getParameter("newValue");
				
				if (nomePeca) {
					aFilter.push(new Filter(propNomeTabela, FilterOperator.Contains, nomePeca));
				}

		 		this.byId(idTabela).getBinding("items").filter(aFilter);
			});
		}
	});
});
