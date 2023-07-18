sap.ui.define([
      "sap/ui/core/mvc/Controller",
	  "sap/m/MessageBox"
    ], function (Controller, MessageBox) {
      return Controller.extend("PedroAutoPecas.controller.BaseController", {
        processarEvento: function(action){
			const tipoDaPromise = "catch",
				tipoBuscado = "function";
			try {
				var promise = action();
				if(promise && typeof(promise[tipoDaPromise]) == tipoBuscado){
					promise.catch(error => MessageBox.error(error.message));
				}
			} catch (error) {
				MessageBox.error(error.message);
			}
		},

		navegar: function(rota, id){
			let oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo(rota, {id});
		},

		carregarRecursoI18n: function () {
			const oResourceBundle = this.getOwnerComponent()
			  .getModel("i18n")
			  .getResourceBundle();
	
			return oResourceBundle;
		}
      });
    }
  );
  