sap.ui.define([

], function () {
    return {
      existeValor(valor){
        debugger
        return !!valor;
      },

      validaData: function (elementoData) {
        const valorCampo = elementoData.getValue()
        return (this.existeValor(valorCampo) && elementoData.isValidValue());
      },

      /*validaEstoque: function (inputEstoque) {
        debugger
        let valorinputEstoque = parseInt(inputEstoque);
        const valorMinimo =  1;
        const valorMaximo = 10000;
        return (this.existeValor(inputEstoque) && valorinputEstoque >= valorMinimo && valorinputEstoque <= valorMaximo)
      },*/
      
      ehCamposValidos: function (peca, elementoData){
        return (this.existeValor(peca) 
        && this.validaData(elementoData)
        && this.validaEstoque(peca.estoque));
      }
    };  
  });
  