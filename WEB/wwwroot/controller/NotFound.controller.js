sap.ui.define([
   "./BaseController.controller",
 ], function (BaseController) {
   const rotaListaDePecas = "listaDePecas";

    return BaseController.extend("PedroAutoPecas.controller.NotFound", {
       onInit: function () {
       },

      aoClicarEmVoltar: function () {
         this.processarEvento(() => {
            this.navegar(rotaListaDePecas);
         });
      }
      
    });
 });