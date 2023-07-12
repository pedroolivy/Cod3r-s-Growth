sap.ui.define([
      "sap/ui/core/mvc/Controller"
    ], function (Controller) {
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

      });
    }
  );