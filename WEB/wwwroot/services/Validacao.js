sap.ui.define([

], function () {
    return {
      existeValor(valor){
        debugger
        return !!valor;
      },

      validaNome(nome) {
        debugger
        return this.existeValor(nome)
      },
      
      validaCategoria(categoria) {
        debugger
        return this.existeValor(categoria)
      },

      validaDescricao(descricao) {
        debugger
        return this.existeValor(descricao)
      },

      validaData: function (elementoData) {
        debugger
        const valorCampo = elementoData.getValue()
        return (this.existeValor(valorCampo) && elementoData.isValidValue());
      },

      validaEstoque: function (inputEstoque) {
        debugger
        let valorinputEstoque = parseInt(inputEstoque);
        const valorMinimo =  1;
        const valorMaximo = 10000;
        return (this.existeValor(inputEstoque) && ((valorinputEstoque >= valorMinimo) && (valorinputEstoque <= valorMaximo)))
      },

      resetarInput: function(input){
        debugger
        input.setValueState(sap.ui.core.ValueState.None);
      },

      definirInputErro: function(input){
        debugger
          const mensagemErro = "MensagemErroNoCampo";
          input.setValueState(sap.ui.core.ValueState.Error);
          input.setValueStateText((mensagemErro));
      },

      validarTodosOsCampos: function (campo) {
        debugger
        let valorDoCampo = campo.getValue();
        const campoId = "id";

        if(valorDoCampo == campoId){
          return;
        }

        let ehValido = false;
        let idDoCampoData = "container-PedroAutoPecas---cadastro--dataDeFabricacao";
        let idDocampoEstoque = "container-PedroAutoPecas---cadastro--estoque";

        if(campo.sId == idDoCampoData){
          ehValido = this.validaData(campo)
        }
        else if(campo.sId == idDocampoEstoque){
          ehValido = this.validaEstoque(valorDoCampo)
        }else {
          ehValido = this.existeValor(valorDoCampo)
        }
        ehValido
          ? this.resetarInput(campo) 
          : this.definirInputErro(campo);
      },
      
      ehCamposValidos: function (peca, elementoData){
        debugger
        return (this.validaNome(peca.nome)
        && this.validaCategoria(peca.categoria)
        && this.validaDescricao(peca.descricao) 
        && this.validaData(elementoData)
        && this.validaEstoque(peca.estoque));
      }
    };  
  });