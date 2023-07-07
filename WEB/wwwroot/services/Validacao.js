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
      
      ehCamposValidos: function (peca, elementoData){
        return (this.validaNome(peca.nome)
        && this.validaCategoria(peca.categoria)
        && this.validaDescricao(peca.descricao) 
        && this.validaData(elementoData)
        && this.validaEstoque(peca.estoque)); 
      }
    };  
  });
  