sap.ui.define([

], function () {
    return {
      existeValor(valor){
        return !!valor;
      },

      validaNome(nome) {
        return this.existeValor(nome)
      },
      
      validaCategoria(categoria) {
        return this.existeValor(categoria)
      },

      validaDescricao(descricao) {
        return this.existeValor(descricao)
      },

      validaData: function (elementoData) {
        const valorCampo = elementoData.getValue()
        return (this.existeValor(valorCampo) && elementoData.isValidValue());
      },

      validaEstoque: function (inputEstoque) {
        let valorinputEstoque = parseInt(inputEstoque);
        const valorMinimo =  1;
        const valorMaximo = 10000;
        return (this.existeValor(inputEstoque) && ((valorinputEstoque >= valorMinimo) && (valorinputEstoque <= valorMaximo)))
      },

      validarTodosOsCampos: function (peca, inputData, inputNome) {
        Object.keys(peca).forEach(prop => {
          debugger
          const propId = "id";

          if(prop == propId){
              return;
          }

          let ehValido = false;

          if(prop == "dataDeFabricacao"){
              ehValido = this.validaData(inputData)
          }
          else if(prop == "idEstoque"){
              ehValido = this.validaEstoque(peca[prop])
          }else {
              ehValido = this.existeValor(peca[prop])
          }
          ehValido
              ? this.resetarInput(prop, inputNome) 
              : this.definirInputErro(prop, inputNome);
        });
      },

      resetarInput: function(idCampo, inputNome){
        debugger
        inputNome.setValueState(sap.ui.core.ValueState.None);
      },

      definirInputErro: function(idCampo, inputNome){
        debugger
        inputNome.setValueState(sap.ui.core.ValueState.Error);
        inputNome.setValueStateText((mensagemErro));
      },
      
      ehCamposValidos: function (peca, elementoData){
        return (this.validaNome(peca.nome)
        && this.validaCategoria(peca.categoria)
        && this.validaDescricao(peca.descricao) 
        && this.validaData(elementoData)
        && this.validaEstoque(peca.estoque));
      }
    };  
  });
  