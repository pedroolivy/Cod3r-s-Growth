sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
 ], function (Controller, JSONModel) {
     "use strict";
     const URL = 'https://localhost:7028/api/pecas';
     return Controller.extend("sap.ui.demo.CrudPecas.controller.TabelaDePecas", {

       onInit: async function() {
         await this._obterListaDePeças();
       },

         _obterListaDePeças: function(){
            fetch('https://localhost:7028/api/peca').then(response => response.json())
            .then(data => {
               console.log(data)
               this.getView().setModel(new JSONModel(data),"pecas");
            })
            .catch(ex => {
               debugger
               console.log(ex)
            })
         }
     });
  });