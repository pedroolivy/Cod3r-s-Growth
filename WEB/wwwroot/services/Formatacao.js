sap.ui.define([

], function () {
    return {
        formatarCategoriaSemNumeros: function(campoCategoria){
            const regexLetras = /[^\D]/g;
            let valorDoCampo = campoCategoria.getValue();

            campoCategoria.setValue(valorDoCampo.replaceAll(regexLetras, "").substring(0, 19));
        },

        formatarEstoqueSemLetras: function(campoEstoque){
            const regexLetras = /[^\d]/g;
            let valorDoCampo = campoEstoque.getValue();
            
            campoEstoque.setValue(valorDoCampo.replaceAll(regexLetras, ""));
        }
    };  
  });
  