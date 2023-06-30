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

      validaData: function (inputData, roraData) {
        debugger

        const dataValida = roraData.isValidValue();
        console.log(dataValida)
        if(!inputData){
          console.log(!!inputData)
          return !!inputData;
        } 

        if(!dataValida){
          console.log(dataValida)
          return dataValida;
        }
        return true;
      },

      validaEstoque: function (inputEstoque) {
        debugger
        let valorinputEstoque = parseInt(inputEstoque);
        const valorMinimo =  1;
        const valorMaximo = 10000;
        if(valorinputEstoque >= valorMinimo && valorinputEstoque <= valorMaximo){
          return !!inputEstoque;
        } else{
          return false;
        }
          
      },

      ehCamposValidos: function (peca){
        console.log(peca)
        return (this.validaNome(peca.nome) 
        && this.validaDescricao(peca.descricao)
        && this.validaCategoria(peca.categoria)
        && this.validaData(peca.data)
        && this.validaEstoque(peca.estoque));
      }
    };  
  });
  