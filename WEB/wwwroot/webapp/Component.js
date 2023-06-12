sap.ui.define([
	"sap/ui/core/UIComponent"
], function (UIComponent) {
	return UIComponent.extend("sap.ui.demo.CrudPecas.webapp.Component", {
		metadata: {
			interfaces: ["sap.ui.core.IAsyncContentCreation"],
			manifest: "json"
		},

		init: function () {
			// call the init function of the parent
			UIComponent.prototype.init.apply(this, arguments);

			// create the views based on the url/hash
			this.getRouter().initialize();
		}
	});
});