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
        debugger
        return !!inputCategoria;
      },

      validaData: function (inputData) {
        const dataValida = inputData.isValidValue();

        if(!valorCampo){
          inputData.setValueState(sap.ui.core.ValueState.Error);
          inputData.setValueStateText("Por favor preencha o campo data corretamente");
          return false;
        } 
        
        if(!dataValida){
          inputData.setValueState(sap.ui.core.ValueState.Error);
          inputData.setValueStateText("Data incorreta !");
          return false;
        }

        inputData.setValueState(sap.ui.core.ValueState.None);
        return true;
      },

      validaEstoque: function (inputEstoque) {
        return !!inputEstoque
      },

      ehCamposValidos: function (peca){
        return (this.validaNome(peca.nome) 
        && this.validaDescricao(peca.descricao)
        && this.validaCategoria(peca.categoria)
        && this.validaData(peca.data)
        && this.validaEstoque(peca.estoque));
      }
    };  
  });
  