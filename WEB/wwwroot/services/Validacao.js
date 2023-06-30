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

      validaData: function (inputData, rotaData) {
        debugger
        const dataValida = rotaData.isValidValue();
        console.log(rotaData.isValidValue())
        if(!inputData){
          return !!inputData;
        } 
        if(!dataValida){
          return dataValida;
        }
        return true;
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

      ehCamposValidos: function (peca, rotaData){
        debugger;
        return (this.validaNome(peca.nome) 
        && this.validaDescricao(peca.descricao)
        && this.validaCategoria(peca.categoria)
        && this.validaData(peca.dataDeFabricacao, rotaData)
        && this.validaEstoque(peca.estoque));
      }
    };  
  });
  