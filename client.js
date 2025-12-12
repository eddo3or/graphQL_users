const GRAPHQL_URL = "http://localhost:4000";

async function graphqlRequest(query, variables = {}) {
  const response = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }), 
  });

  //Si la respuesta no es JSON, se muestra texto para depurar
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    console.error("La respuesta no es JSON:");
    console.error(text);
    throw new Error("Respuesta inválida del servidor");
  }
}

//Obtención de todos los usuarios
async function getAllUsers() {
  const query = `
    query {
      getAllUsers {
        id
        name
        email
        age
      }
    }
  `;
  const data = await graphqlRequest(query);
  console.log("Lista de usuarios:", data.data.getAllUsers);
}

//Obtención de un usuario por ID
async function getUserById(id) {
  const query = `
    query ($id: ID!) {
      getUserById(id: $id) {
        id
        name
        email
        age
      }
    }
  `;
  const variables = { id };
  const data = await graphqlRequest(query, variables);
  console.log(`Usuario con ID ${id}:`, data.data.getUserById);
}

//Crear un nuevo usuario
async function createUser(name, email, age) {
  const mutation = `
    mutation ($name: String!, $email: String!, $age: Int!) {
      createUser(name: $name, email: $email, age: $age) {
        id
        name
        email
        age
      }
    }
  `;
  const variables = { name, email, age };
  const data = await graphqlRequest(mutation, variables);
  console.log("Nuevo usuario creado:", data.data.createUser);
}

//Eliminar usuario
async function deleteUser(id) {
  const mutation = `
    mutation ($id: ID!) {
      deleteUser(id: $id) {
        id
        name
        email
        age
      }
    }
  `;
  const variables = { id };
  const data = await graphqlRequest(mutation, variables);
  console.log("Usuario eliminado:", data.data.deleteUser);
  
}



//Ejemplos 
(async () => {
  await getAllUsers();
  await getUserById("1");
  await createUser("Pedro", "pedritoPedrez@gmail.com", 23);
  await deleteUser("3");
  await getAllUsers();
})();