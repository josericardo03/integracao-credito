import { HttpClient } from "../src";

async function run(): Promise<void> {
  // Com token (opcional)
  const client = new HttpClient("https://jsonplaceholder.typicode.com", {
    authToken: "seu_token_aqui",
    defaultHeaders: { "X-App": "integracao-credito" },
  });

  // Também é possível definir/atualizar depois:
  // client.setAuthToken("novo_token");

  try {
    console.log("=== Exemplo GET ===");
    const getResponse = await client.get("/posts/1");
    console.log("Status:", getResponse.status);
    console.log("Data:", getResponse.data);

    console.log("\n=== Exemplo POST ===");
    const postData = {
      title: "foo",
      body: "bar",
      userId: 1,
    };
    const postResponse = await client.post("/posts", postData);
    console.log("Status:", postResponse.status);
    console.log("Data:", postResponse.data);

    console.log("\n=== Exemplo PUT ===");
    const putData = {
      id: 1,
      title: "foo atualizado",
      body: "bar atualizado",
      userId: 1,
    };
    const putResponse = await client.put("/posts/1", putData);
    console.log("Status:", putResponse.status);
    console.log("Data:", putResponse.data);

    console.log("\n=== Exemplo DELETE ===");
    const deleteResponse = await client.delete("/posts/1");
    console.log("Status:", deleteResponse.status);
    console.log("Data:", deleteResponse.data);

    console.log("\n=== Exemplo usando método genérico request ===");
    const requestResponse = await client.request("GET", "/posts/2");
    console.log("Status:", requestResponse.status);
    console.log("Data:", requestResponse.data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Erro:", errorMessage);
  }
}

run();
