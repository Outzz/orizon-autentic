import type {
  WorkspaceActivity,
  WorkspaceClient,
  WorkspaceProject,
  WorkspaceSnapshot,
} from "./types";

const DATABASE_NAME = "orizon-workspace";
const DATABASE_VERSION = 1;

function openWorkspaceDatabase(): Promise<IDBDatabase> {
  if (typeof indexedDB === "undefined") {
    return Promise.reject(new Error("Este navegador não oferece armazenamento local para projetos."));
  }

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);

    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains("projects")) {
        database.createObjectStore("projects", { keyPath: "id" });
      }
      if (!database.objectStoreNames.contains("clients")) {
        database.createObjectStore("clients", { keyPath: "id" });
      }
      if (!database.objectStoreNames.contains("activities")) {
        database.createObjectStore("activities", { keyPath: "id" });
      }
    };

    request.onsuccess = () => {
      const database = request.result;
      database.onversionchange = () => database.close();
      resolve(database);
    };
    request.onerror = () => reject(request.error ?? new Error("Não foi possível abrir os dados locais."));
    request.onblocked = () => reject(new Error("Feche outras abas da Orizon para atualizar os dados locais."));
  });
}

function getAll<RecordType>(database: IDBDatabase, storeName: string): Promise<RecordType[]> {
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(storeName, "readonly");
    const request = transaction.objectStore(storeName).getAll();
    request.onsuccess = () => resolve(request.result as RecordType[]);
    request.onerror = () => reject(request.error ?? new Error("Não foi possível ler os dados locais."));
  });
}

export async function loadIndexedDBSnapshot(): Promise<WorkspaceSnapshot> {
  const database = await openWorkspaceDatabase();
  try {
    const [projects, clients, activities] = await Promise.all([
      getAll<WorkspaceProject>(database, "projects"),
      getAll<WorkspaceClient>(database, "clients"),
      getAll<WorkspaceActivity>(database, "activities"),
    ]);
    return { projects, clients, activities };
  } finally {
    database.close();
  }
}
