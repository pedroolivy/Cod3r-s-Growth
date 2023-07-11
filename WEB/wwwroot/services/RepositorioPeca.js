sap.ui.define([
], function () {
    return {
        ObterTodos: function(api){
			return fetch(api);
		},

        ObterPorId: function (api, idPeca) {
            return fetch(`${api}/${idPeca}`);
        },

        Adicionar: function (api, peca) {
            return fetch(api, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(peca)
            });
        },

        Editar: function (api, peca) {
            return fetch(`${api}/${peca.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(peca)
            })
        },
        
        Remover: function (api, pecaId) {
            return fetch(`${api}/${pecaId}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			})
        }
    };  
  });
  