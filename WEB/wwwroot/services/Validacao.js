sap.ui.define([

], function () {
  debugger
    return {
      validaNome: function (inputNome) {
        let valorDoCampoNome = inputNome.getValue();
        if (valorDoCampoNome == ""){  
          inputNome.setValueState(sap.ui.core.ValueState.Error);
          inputNome.setValueStateText("Por favor preencha o campo do nome");
        }

      },

      validaDescricao: function (inputDescricao) {
        let valorDoCampo = inputDescricao.getValue();
        if(valorDoCampo == "") {
          inputDescricao.setValueState(sap.ui.core.ValueState.Error);
          inputDescricao.setValueStateText("Por favor preencha o campo descrição")
        }
      },

      validaCategoria: function (inputCategoria){
        let valorDoCampo = inputCategoria.getValue();
        if(valorDoCampo == ""){
          inputCategoria.setValueState(sap.ui.core.ValueState.Error);
          inputCategoria.setValueStateText("Por favor preencha o campo descrição");
        }
      },

      validaData: function (inputData) {
        let valorCampo = inputData.getValue();

      },

      validaEstoque: function (inputEstoque) {
        let valorDoCampo = inputEstoque.getValue();
        if (valorDoCampo < 1) {
          inputEstoque.setValueState(sap.ui.core.ValueState.Error);
          inputEstoque.setValueStateText("O valor não pode ser menor que 0");
        }
        inputEstoque.setValue(valorDoCampo.replaceAll(/[^\d]/g, ""));
      },
    };  
  });
  