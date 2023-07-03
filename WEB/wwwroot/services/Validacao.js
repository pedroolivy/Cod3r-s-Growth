sap.ui.define([

], function () {
    return {
      validaNome: function (inputNome) {
        return !!inputNome;
      },

      validaDescricao: function (inputDescricao) {
        return !!inputDescricao;  
      },

      validaCategoria: function (inputCategoria){
        return !!inputCategoria;
      },

      validaData: function (elementoData) {
        const valorCampo = elementoData.getValue()
        return (this.existeValor(valorCampo) && elementoData.isValidValue());
      },

      validaEstoque: function (inputEstoque) {
        let valorinputEstoque = parseInt(inputEstoque);
        const valorMinimo =  1;
        const valorMaximo = 10000;

        if(valorinputEstoque >= valorMinimo && valorinputEstoque <= valorMaximo){
          return !!inputEstoque;
        } else{
          return false;
        }
      },

      existeValor(valor){
        return !!valor;
      },

      ehCamposValidos: function (peca, elementoData){
        return (this.validaNome(peca.nome) 
        && this.validaDescricao(peca.descricao)
        && this.validaCategoria(peca.categoria)
        && this.validaData(elementoData)
        && this.validaEstoque(peca.estoque));
      }
    };  
  });
  