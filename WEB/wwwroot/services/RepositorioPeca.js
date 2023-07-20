sap.ui.define([
], function () {
    const api = "https://localhost:7028/api/Peca";

    return {
        ObterTodos: async function(){
	        let response = await fetch(api);

            return response.status != 200
                ?response.status
                :response.json();
		},

        ObterPorId: async function (idPeca) {
            let response = await (fetch(`${api}/${idPeca}`));

            return response.status !== 500 
                ?response.json() 
                :response.status;
        },

        Adicionar: async function (peca) {
            let response = await fetch(api, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(peca)
            });

            return response.status != 200
                ?response.status
                :response.json();
        },

        Editar: async function (peca) {
            let response = await fetch(`${api}/${peca.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(peca)
            });

            return response.status != 200
                ?response.status
                :response.json();
        },
        
        Remover: async function (pecaId) {
            let response = await fetch(`${api}/${pecaId}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			})
            
            return response.status;
        }
    };  
  });
  