sap.ui.define([

], function () {
    return {
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
		}
    };  
  });
  