sap.ui.define([
    "./BaseController.controller",
    "../services/Validacao",
    "../services/Formatacao",
    "../services/RepositorioPeca",
    'sap/m/MessageToast'
], function (BaseController, Validacao, Formatacao, RepositorioPeca, MessageToast) {
    const rotaCadastro = "cadastro";
    const rotaListaDePecas = "listaDePecas";
    const rotaDetalhe = "detalhe";
    const rotaEdicao = "edicao";
    const modeloPeca = "pecas";
    const idDataFabricacao = "dataDeFabricacao";
    const idEstoque = "estoque";
    const idCategoria = "categoria";
    const stringVazia = "";
    const rotaNotFound = "notFound";
    let oResourceBundle;

	return BaseController.extend("PedroAutoPecas.controller.Cadastro", {
		onInit: function () {
            oResourceBundle = this.carregarRecursoI18n();
            Validacao.ModeloI18n(oResourceBundle);

			let oRouter = this.getOwnerComponent().getRouter();

			oRouter.getRoute(rotaEdicao).attachPatternMatched(this._aoCoincidirRota, this);
			oRouter.getRoute(rotaCadastro).attachPatternMatched(this._aoCoincidirRota, this);
		},

		_aoCoincidirRota: function (oEvent) {
            this.processarEvento(() => {
                const idPeca = oEvent.getParameter("arguments").id;
                const idTitulo = "titulo";

                this.setarValorPadraoInputs();
                this.setarIntervaloData();

                if(idPeca || (idPeca == 0)){
                    const tituloEdicao = "Edição";
                    this._carregarPeca(idPeca);
                    this.byId(idTitulo).setTitle(tituloEdicao);
                } else{
                    this.setarModeloPeca();
                    const tituloCadastro = "Cadastro";
                    this.byId(idTitulo).setTitle(tituloCadastro);
                } 
            });
        },
        
        _carregarPeca: async function(idPeca){
            let peca =  await RepositorioPeca.ObterPorId(idPeca);
			let statusCode = 500;
			
			peca == statusCode
				?this.navegar(rotaNotFound)
				:this.getView().setModel(this.criarModeloPeca(peca), modeloPeca);
		},

        setarModeloPeca: function () {
            let peca = {
                nome: stringVazia,
                descricao: stringVazia,
                categoria: stringVazia,
                dataDeFabricacao: stringVazia,
                estoque: stringVazia
            }
            this.getView().setModel(this.criarModeloPeca(peca), modeloPeca);
        },   
 
        setarIntervaloData:  function(){
            const dataMinimaValida = "1755-01-01T12:00:00.000Z"; 
            const dataMaxima = new Date();
            const dataMinima = new Date(dataMinimaValida);
            this.byId(idDataFabricacao).setMaxDate(dataMaxima);
            this.byId(idDataFabricacao).setMinDate(dataMinima);
        },

        setarValorPadraoInputs: function(){
            const valorPadrao = "None";
            let campos = ["nome", "descricao", "categoria", "dataDeFabricacao", "estoque"]
            
            campos.forEach(idCampo =>{
                campodefinido = this.getView().byId(idCampo)
                campodefinido.setValueState(valorPadrao)
                campodefinido.setValue(stringVazia)
            })
        },

        _salvarPeca: async function (peca) {
			let novaPeca = await RepositorioPeca.Adicionar(peca);
            let TipoDeNovaPeca = "number"
            let msg = "ErroAoAdicionar";

            typeof novaPeca === TipoDeNovaPeca
                ?MessageToast.show(oResourceBundle.getText(msg))
                :this.navegar(rotaDetalhe, novaPeca.id);
        },

        _editarPeca: async function (peca) {
			let pecaEditada = await RepositorioPeca.Editar(peca);
            let tipoDePeca = "number"
            let msg = "ErroAoEditar";

            typeof pecaEditada === tipoDePeca
                ?MessageToast.show(oResourceBundle.getText(msg))
                :this._navegar(rotaDetalhe, pecaEditada.id);
        },

        _navegar: function(rota, id){
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo(rota, {id});
        },

        aoClicarSalvar: function () {
            this.processarEvento(() => {
                const peca = this.getView()
                    .getModel(modeloPeca)
                    .getData();
                let listaCampos = [];
                let id = "id"
                
                Object.keys(peca).forEach(prop => {
                    if(prop == id)
                        return;

                    listaCampos.push(this.getView().byId(prop));
                });

                Validacao.validarTodosOsCampos(listaCampos)
 
                if(Validacao.ehCamposValidos(peca)){
                    peca.id
                        ?this._editarPeca(peca)
                        :this._salvarPeca(peca);
                }
            });
        },

        aoMudarCampoCategoria: function() {
            this.processarEvento(() => {
                let campoCategoria = this.getView().byId(idCategoria);
                Formatacao.formatarCategoriaSemNumeros(campoCategoria);
            });
        },

        aoMudarCampoEstoque: function() {
            this.processarEvento(() => {
                let campoEstoque = this.getView().byId(idEstoque);
                Formatacao.formatarEstoqueSemLetras(campoEstoque);
            });
        },

		aoClicarVoltar: function () {
            this.processarEvento(() => {
                this.navegar(rotaListaDePecas);
            });
		},

        aoClicarCancelar: function () {
            this.processarEvento(() => {
                this.navegar(rotaListaDePecas);
            });
		}
	});
});