sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/"
], function (Controller, ) {
    return Controller.extend("sap.ui.demo.CrudPecas.controller.App", {
      onShowHello : function () {
         alert("Olá Mundo");
      }
    });
 });
