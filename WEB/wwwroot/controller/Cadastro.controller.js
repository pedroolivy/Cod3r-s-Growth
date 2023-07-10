sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../services/Validacao"
], function (Controller, JSONModel, Validacao) {
    const rotaCadastro = "cadastro";
    const rotaListaDePecas = "listaDePecas";
    const rotaDetalhe = "detalhe";
    const rotaEdicao = "edicao";
    const api = "https://localhost:7028/api/Peca";
    const modeloPeca = "pecas";
    const idDataFabricacao = "dataDeFabricacao";
    const idEstoque = "estoque";
    const idCategoria = "categoria";

	return Controller.extend("PedroAutoPecas.controller.Cadastro", {
		onInit: function () {
			let oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute(rotaEdicao).attachPatternMatched(this._aoCoincidirRota, this);
			oRouter.getRoute(rotaCadastro).attachPatternMatched(this._aoCoincidirRota, this);
		},

		_aoCoincidirRota: function (oEvent) {
            let idPeca = oEvent.getParameter("arguments").id;

            this.setarValorPadraoInputs();
            this.setarIntervaloData();
            
            if(idPeca){
                this._carregarPeca(idPeca);
                this.byId("titulo").setTitle("Edição");
            } else{
                this.setarModeloPeca();
                this.byId("titulo").setTitle("Cadastro");
            }          
        },
        
        _carregarPeca: function(idPeca){
			fetch(`${api}/${idPeca}`)
				.then(response => response.json())
				.then(json => {
					var oModel = new JSONModel(json);
					this.getView().setModel(oModel, modeloPeca);
			})
		},

        setarModeloPeca: function () {
            const stringVazia = "";
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
            const  string_vazia = "";
            let campos = ["nome", "descricao", "categoria", "dataDeFabricacao", "estoque"]
            
            campos.forEach(res =>{
                campodefinido = this.getView().byId(res)
                campodefinido.setValueState(valorPadrao)
                campodefinido.setValue(string_vazia)
            })
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
			fetch(api, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(peca)
            })
            .then(response => response.json())
            .then(novaPeca => this._navegar(rotaDetalhe, novaPeca.id))
        },

        _editarPeca: function (peca) {
			fetch(`${api}/${peca.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(peca)
            })
            .then(response => response.json())
            .then(pecaEditada => this._navegar(rotaDetalhe, pecaEditada.id))
        },

        formatarCategoria: function(campoCategoria){
            const regexLetras = /[^\D]/g;
            let valorDoCampo = campoCategoria.getValue();
            campoCategoria.setValue(valorDoCampo.replaceAll(regexLetras, "").substring(0, 19));
        },

        formatarEstoque: function(campoEstoque){
            const regexLetras = /[^\d]/g;
            let valorDoCampo = campoEstoque.getValue();
            campoEstoque.setValue(valorDoCampo.replaceAll(regexLetras, ""));
        },

        aoMudarCampoCategoria: function() {
            let campoCategoria = this.getView().byId(idCategoria);
            this.formatarCategoria(campoCategoria);
        },

        aoMudarCampoEstoque: function() {
            let campoEstoque = this.getView().byId(idEstoque);
            this.formatarEstoque(campoEstoque);
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
        
		aoClicarVoltar: function () {
            this._navegar(rotaListaDePecas);
		},

        aoClicarCancelar: function () {
			this._navegar(rotaListaDePecas);
		},

        _navegar: function(rota, id){
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo(rota, {id});
        }
	});
});
