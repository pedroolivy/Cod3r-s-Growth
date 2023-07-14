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

	return BaseController.extend("PedroAutoPecas.controller.Cadastro", {
		onInit: function () {
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
            let campos = ["nome", "descricao", "categoria", "dataDeFabricacao", "estoque"]
            
            campos.forEach(res =>{
                campodefinido = this.getView().byId(res)
                campodefinido.setValueState(valorPadrao)
                campodefinido.setValue(stringVazia)
            })
        },

        validarCampos: function(peca){
            this.processarEvento(() => {
                const propId = "id";
            
                //lista com todos os inputs
                //validarTodosOsCampos(campos)
                Object.keys(peca).forEach(prop => {

                    if(prop == propId){
                        return;
                    }

                    const inputData = this.getView().byId(idDataFabricacao);
                    let ehValido = false;

                    if(prop == idDataFabricacao){
                        ehValido = Validacao.validaData(inputData)
                    }
                    else if(prop == idEstoque){
                        ehValido = Validacao.validaEstoque(peca[prop])
                    }else {
                        ehValido = Validacao.existeValor(peca[prop])
                    }
                    ehValido
                        ? this.resetarInput(prop) 
                        : this.definirInputErro(prop);
                });
            });
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

        resetarInput: function(idCampo){
            let input = this.getView().byId(idCampo);
            input.setValueState(sap.ui.core.ValueState.None);
        },

        definirInputErro: function(idCampo){
            const mensagemErro = `Por favor preecha o campo`;
            let input = this.getView().byId(idCampo);
            input.setValueState(sap.ui.core.ValueState.Error);
            input.setValueStateText(mensagemErro);
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
                
                this.validarCampos(peca);
                
                const campoData = this.getView().byId(idDataFabricacao);
                
                if(Validacao.ehCamposValidos(peca, campoData)){
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
