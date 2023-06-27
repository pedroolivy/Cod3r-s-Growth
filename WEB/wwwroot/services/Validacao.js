sap.ui.define([

], function () {
    return {
      validaNome: function (inputNome) {
        let valorDoCampoNome = inputNome.getValue();

        if (!valorDoCampoNome){  
          inputNome.setValueState(sap.ui.core.ValueState.Error);
          inputNome.setValueStateText("Por favor preencha o campo do nome");
          return false;
        }
        else{     
          inputNome.setValueState(sap.ui.core.ValueState.None);   
          return true;
        }
      },

      validaDescricao: function (inputDescricao) {
        let valorDoCampo = inputDescricao.getValue();
        if(!valorDoCampo) {
          inputDescricao.setValueState(sap.ui.core.ValueState.Error);
          inputDescricao.setValueStateText("Por favor preencha o campo descrição");
          return false;
        }
        else{
          inputDescricao.setValueState(sap.ui.core.ValueState.None);
          return true;
        }
      },

      validaCategoria: function (inputCategoria){
        debugger
        let valorDoCampo = inputCategoria.getValue();
        inputCategoria.setValue(valorDoCampo.replaceAll(/[^\D]/g, ""));
        if(!valorDoCampo){
          inputCategoria.setValueState(sap.ui.core.ValueState.Error);
          inputCategoria.setValueStateText("Por favor preencha o campo Categoria");
          return false;
        }
        else{
          inputCategoria.setValueState(sap.ui.core.ValueState.None);
          return true;
        }
      },

      validaData: function (inputData) {
        let valorCampo = inputData.getValue();
        return true;
      },

      validaEstoque: function (inputEstoque) {
        debugger
        let ValorMinimo = 1;
        let valorDoCampo = inputEstoque.getValue();
        inputEstoque.setValue(valorDoCampo.replaceAll(/[^\d]/g, ""));
        if (!valorDoCampo || valorDoCampo < ValorMinimo) {
          inputEstoque.setValueState(sap.ui.core.ValueState.Error);
          inputEstoque.setValueStateText("Estoque tem de ser maior que 0");
          return false;
        }
        else{
          inputEstoque.setValueState(sap.ui.core.ValueState.None);
          return true;
        }
      }
    };  
  });
  