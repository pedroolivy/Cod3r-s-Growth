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
        let valorDoCampo = inputCategoria.getValue();
        inputCategoria.setValue(valorDoCampo.replaceAll(/[^\D]/g, "").substring(0, 19));

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
        debugger;
        let valorCampo = inputData.getValue();

        const dataValida = inputData.isValidValue();

        if(!valorCampo){
          inputData.setValueState(sap.ui.core.ValueState.Error);
          inputData.setValueStateText("Por favor preencha o campo data corretamente");
          return false;
        } 
        
        if(!dataValida){
          inputData.setValueState(sap.ui.core.ValueState.Error);
          inputData.setValueStateText("Data ultrapassa data atual !");
          return false;
        }

        inputData.setValueState(sap.ui.core.ValueState.None);
        return true;
      },

      validaEstoque: function (inputEstoque) {
        let ValorMinimo = 1;
        let valorMaximo = 10000;
        let valorDoCampo = inputEstoque.getValue();
        inputEstoque.setValue(valorDoCampo.replaceAll(/[^\d]/g, ""));

        if (!valorDoCampo || valorDoCampo < ValorMinimo || valorDoCampo > valorMaximo) {
          inputEstoque.setValueState(sap.ui.core.ValueState.Error);
          inputEstoque.setValueStateText("Por favor preencha o campo estoque corretamente !");
          return false;
        }
        else{
          inputEstoque.setValueState(sap.ui.core.ValueState.None);
          return true;
        }
      }
    };  
  });
  