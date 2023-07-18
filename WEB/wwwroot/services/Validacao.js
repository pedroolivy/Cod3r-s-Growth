sap.ui.define([

], function () {
    return {
      _i18n: null,
      ModeloI18n: function (i18nModel) {
        this._i18n = i18nModel;
      },

      existeValor: function(valorDoCampo){
        return !!valorDoCampo;
      },

      validaNome: function(valorDoCampoNome) {
        return this.existeValor(valorDoCampoNome)
      },
      
      validaCategoria: function(valorDoCampoCategoria) {
        return this.existeValor(valorDoCampoCategoria)
      },

      validaDescricao: function(valorDoCampoDescricao) {
        return this.existeValor(valorDoCampoDescricao)
      },

      validaData: function (campoData) {
        const valorDoCampoData = campoData.getValue()
        return (this.existeValor(valorDoCampoData) && campoData.isValidValue());
      },

      validaEstoque: function (valorDoCampoEstoque) {
        let valorDoCampoEstoqueInteiro = parseInt(valorDoCampoEstoque);
        const valorMinimo =  1;
        const valorMaximo = 10000;
        return (this.existeValor(valorDoCampoEstoque) && ((valorDoCampoEstoqueInteiro >= valorMinimo) && (valorDoCampoEstoqueInteiro <= valorMaximo)))
      },

      resetarInput: function(campoDefinido){
        campoDefinido.setValueState(sap.ui.core.ValueState.None);
      },

      definirInputErro: function(campoDefinido){
        const mensagemErro = "MensagemErroNoCampo";
        campoDefinido.setValueState(sap.ui.core.ValueState.Error);
        campoDefinido.setValueStateText(this._i18n.getText(mensagemErro));
      },

      validarTodosOsCampos: function (campoDefinido) {
        let valorDoCampo = campoDefinido.getValue();
        const campoId = "id";

        if(valorDoCampo == campoId){
          return;
        }

        let ehValido = false;
        let propriedadeIdDoCampoData = "container-PedroAutoPecas---cadastro--dataDeFabricacao";
        let propriedadeIdDoCampoEstoque = "container-PedroAutoPecas---cadastro--estoque";

        if(campoDefinido.sId == propriedadeIdDoCampoData){
          ehValido = this.validaData(campoDefinido)
        }
        else if(campoDefinido.sId == propriedadeIdDoCampoEstoque){
          ehValido = this.validaEstoque(valorDoCampo)
        }else {
          ehValido = this.existeValor(valorDoCampo)
        }
        ehValido
          ? this.resetarInput(campoDefinido) 
          : this.definirInputErro(campoDefinido);
      },
      
      ehCamposValidos: function (peca, campoData){
        return (this.validaNome(peca.nome)
        && this.validaCategoria(peca.categoria)
        && this.validaDescricao(peca.descricao) 
        && this.validaData(campoData)
        && this.validaEstoque(peca.estoque));
      }
    };  
  });