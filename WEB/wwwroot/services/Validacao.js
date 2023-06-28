sap.ui.define([

], function () {
    return {
      validaNome: function (inputNome) {
        return !!inputNome;
      },

      validaDescricao: function (inputDescricao) {

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
        const regexLetras = /[\d]/g;
        inputCategoria.setValue(valorDoCampo.replaceAll(regexLetras, "").substring(0, 19));

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
        let ValorMinimo = 1;
        let valorMaximo = 10000;
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
  