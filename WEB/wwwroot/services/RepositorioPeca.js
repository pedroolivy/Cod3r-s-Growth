sap.ui.define([
], function () {
    const api = "https://localhost:7028/api/Peca";

    return {
        ObterTodos: function(){
			return fetch(api);
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
  