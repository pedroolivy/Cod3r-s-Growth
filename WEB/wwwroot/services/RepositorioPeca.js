sap.ui.define([
    "sap/ui/model/json/JSONModel"
], function (JSONModel) {
    const api = "https://localhost:7028/api/Peca";

    return {
        ObterTodos: async function(){
	        return (await fetch(api)).json();
		},

        ObterPorId: function (idPeca) {
            return fetch(`${api}/${idPeca}`);
        },

        Adicionar: function (peca) {
            return fetch(api, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(peca)
            });
        },

        Editar: function (peca) {
            return fetch(`${api}/${peca.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(peca)
            })
        },
        
        Remover: function (pecaId) {
            return fetch(`${api}/${pecaId}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			})
        }
    };  
  });
  