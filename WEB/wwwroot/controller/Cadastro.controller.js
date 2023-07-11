sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../services/Validacao",
    "../services/Formatacao",
    "../services/RepositorioPeca"
], function (Controller, JSONModel, Validacao, Formatacao, RepositorioPeca) {
    const rotaCadastro = "cadastro";
    const rotaListaDePecas = "listaDePecas";
    const rotaDetalhe = "detalhe";
    const rotaEdicao = "edicao";
    const api = "https://localhost:7028/api/Peca";
    const modeloPeca = "pecas";
    const idDataFabricacao = "dataDeFabricacao";
    const idEstoque = "estoque";
    const idCategoria = "categoria";
    const stringVazia = "";

	return Controller.extend("PedroAutoPecas.controller.Cadastro", {
		onInit: function () {
			let oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute(rotaEdicao).attachPatternMatched(this._aoCoincidirRota, this);
			oRouter.getRoute(rotaCadastro).attachPatternMatched(this._aoCoincidirRota, this);
		},

		_aoCoincidirRota: function (oEvent) {
            const idPeca = oEvent.getParameter("arguments").id;

            this.setarValorPadraoInputs();
            this.setarIntervaloData();
            
            if(idPeca){
                this._carregarPeca(idPeca);
                const tituloEdicao = "Edição";
                this.byId("titulo").setTitle(tituloEdicao);
            } else{
                this.setarModeloPeca();
                const tituloCadastro = "Cadastro";
                this.byId("titulo").setTitle(tituloCadastro);
            }          
        },
        
        _carregarPeca: function(idPeca){
			RepositorioPeca.ObterPorId(api, idPeca)
				.then(response => response.json())
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
            const propId = "id";
            
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
        },

        _salvarPeca: function (peca) {
			RepositorioPeca.Adicionar(api, peca)
                .then(response => response.json())
                .then(novaPeca => this._navegar(rotaDetalhe, novaPeca.id))
        },

        _editarPeca: function (peca) {
			RepositorioPeca.Editar(api, peca)
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
        }, 

        aoMudarCampoCategoria: function() {
            let campoCategoria = this.getView().byId(idCategoria);
            Formatacao.formatarCategoria(campoCategoria);
        },

        aoMudarCampoEstoque: function() {
            let campoEstoque = this.getView().byId(idEstoque);
            Formatacao.formatarEstoque(campoEstoque);
        },
        
		aoClicarVoltar: function () {
            this._navegar(rotaListaDePecas);
		},

        aoClicarCancelar: function () {
			this._navegar(rotaListaDePecas);
		}

	});
});
