sap.ui.define([

], function () {
    return {
      _i18n: null,
      ModeloI18n: function (i18nModel) {
        this._i18n = i18nModel;
      },

      existeValor: function(valorDoCampo){
        return Boolean(valorDoCampo);
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
        const objetoCampoData = "object";

        if(typeof campoData === objetoCampoData){
          const valorDoCampoData = campoData.getValue();

          return this.existeValor(valorDoCampoData) && campoData.isValidValue();
        }
        else{
          const valorDoCampoData = campoData;

          return this.existeValor(valorDoCampoData);
        }
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

      validarTodosOsCampos: function (listaCampos) {
        let ehValido = false;

        listaCampos.forEach(campo => {
          let valorDoCampo = campo.getValue();
          let idDoCampoData = "dataDeFabricacao";
          let idDoCampoEstoque = "estoque";
  
          const idCampo = campo.getId().split("--").reverse()[0]; 
          
          if(idCampo === idDoCampoData){
            ehValido = this.validaData(campo)
          }
          else if(idCampo === idDoCampoEstoque){
            ehValido = this.validaEstoque(valorDoCampo)
          }else {
            ehValido = this.existeValor(valorDoCampo)
          }

          ehValido
            ? this.resetarInput(campo) 
            : this.definirInputErro(campo);
        })
      },
    
      ehCamposValidos: function (peca){
        return (this.validaNome(peca.nome)
        && this.validaCategoria(peca.categoria)
        && this.validaDescricao(peca.descricao) 
        && this.validaData(peca.dataDeFabricacao)
        && this.validaEstoque(peca.estoque));
      }
    };  
  });
  