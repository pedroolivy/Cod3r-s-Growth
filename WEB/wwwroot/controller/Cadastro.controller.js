sap.ui.define([
    "./BaseController.controller",
    "sap/ui/model/json/JSONModel",
    "../services/Validacao",
    "../services/Formatacao",
    "../services/RepositorioPeca"
], function (BaseController, JSONModel, Validacao, Formatacao, RepositorioPeca) {
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
           
                if(idPeca){
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

        setarModeloPeca: function () {
            let peca = {
                nome: stringVazia,
                descricao: stringVazia,
                categoria: stringVazia,
                dataDeFabricacao: stringVazia,
                estoque: stringVazia
            }
            this.getView().setModel(new JSONModel(peca), modeloPeca);
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
            const campos = ["nome", "descricao", "categoria", "dataDeFabricacao", "estoque"];
            
            campos.forEach(res =>{
                campodefinido = this.getView().byId(res)
                campodefinido.setValueState(valorPadrao)
                campodefinido.setValue(stringVazia)
            })
        },

        aoClicarSalvar: function () {
            this.processarEvento(() => {
                debugger
                const peca = this.getView()
                .getModel(modeloPeca)
                .getData();
                
                this.validarCampos(peca);
                
                const campoData = this.getView().byId(idDataFabricacao);
                
                if(Validacao.ehCamposValidos(peca, campoData)){
                    peca.id
                        ?this._editarPeca(peca)
                        :this._salvarPeca(peca);
                }
            });
        }, 

        validarCampos: function(peca){
            this.processarEvento(() => {
                debugger
                //lista com todos os inputs
                const inputData = this.getView().byId("dataDeFabricacao");
                const inputNome = this.getView().byId("nome");
                const listaPeca = ["nome", "descricao", "categoria", "dataDeFabricacao", "estoque"];
                //validarTodosOsCampos(campos)
                return Validacao.validarTodosOsCampos(peca, inputData, inputNome);
            });
        },

        resetarInput: function(){
            
        },
    
        definirInputErro: function(){
              
        },

        _salvarPeca: function (peca) {
			return RepositorioPeca.Adicionar(peca)
                .then(response => response.json())
                .then(novaPeca => this.navegar(rotaDetalhe, novaPeca.id))
        },

        _editarPeca: function (peca) {
			RepositorioPeca.Editar(peca)
                .then(response => response.json())
                .then(pecaEditada => this._navegar(rotaDetalhe, pecaEditada.id))
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
