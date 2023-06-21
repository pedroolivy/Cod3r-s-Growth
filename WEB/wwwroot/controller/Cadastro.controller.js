sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    const rotaCadastro = "cadastro";
    const rotaListaDePecas = "listaDePecas";
    const api = "https://localhost:7028/api/Peca";
    const modeloPeca = "pecas";

	return Controller.extend("PedroAutoPecas.controller.Cadastro", {
		onInit: function () {
			let oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute(rotaCadastro).attachPatternMatched(this._aoCoincidirRota, this);
		},
        
		_aoCoincidirRota: function () {
            var peca = {
                nome: "",
                descricao: "",
                categoria: "",
                dataDeFabricacao: "",
                estoque: ""
            }
            this.getView().setModel(new JSONModel(peca), modeloPeca);
        },

        _salvarPeca: function (peca) {
            const rotaDetalhe = "detalhe";
			fetch(api, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(peca)
            })
            .then(response => response.json())
            .then(data => {
                this._navegar(rotaDetalhe, data.id)
            })
        },

        aoClicarSalvar: function () {
            let criacaoPeca = this.getView().getModel(modeloPeca).getData();
            const retorno = this._salvarPeca(criacaoPeca);
        }, 

        _navegar: function(rota, id){
            let oRouter = this.getOwnerComponent().getRouter();

            id
                ? oRouter.navTo(rota, { id: id })
                : oRouter.navTo(rota);
        },
        
		aoClicarVoltar: function () {
			let oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo(rotaListaDePecas, {}, true);
		},

        aoClicarCancelar: function () {
			let oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo(rotaListaDePecas, {}, true);
		}
	});
});