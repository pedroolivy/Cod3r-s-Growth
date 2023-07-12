sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
 ], function (Controller, History) {
    "use strict";
    return Controller.extend("PedroAutoPecas.controller.NotFound", {
       onInit: function () {
       },
       aoClicarEmVoltar: function () {
            let rota = this.getOwnerComponent().getRouter();
            rota.navTo("listaDePecas", {}, true);
        }
    });
 });