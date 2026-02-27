import PocketBase from "pocketbase";

// URL PB
const db = new PocketBase("http://127.0.0.1:8090");

/**
 * Récupère toutes les maisons de la collection "maison"
 */
export async function getOffres() {
  try {
    const data = await db.collection("maison").getFullList({
      sort: "-created",
    });
    return data;
  } catch (error) {
    console.error("Une erreur est survenue en lisant la liste des maisons :", error);
    return [];
  }
}

/**
 * Filtrer les offres par prix
 */
export async function filterByPrix(minPrix, maxPrix) {
  try {
    const min = Number(minPrix);
    const max = Number(maxPrix);

    const data = await db.collection("maison").getFullList({
      sort: "-created",
      filter: `prix >= ${min} && prix <= ${max}`,
    });

    return data;
  } catch (error) {
    console.error("Une erreur est survenue en filtrant par prix :", error);
    return [];
  }
}

/**
 * Génère l'URL complète d’un fichier image stocké dans PocketBase
 */
export function getImageUrl(record, recordImage) {
  if (!record || !recordImage) return null;
  return db.files.getURL(record, recordImage);
}

/**
 * Récupère une maison par son id
 */
export async function getOffre(id) {
  try {
    const data = await db.collection("maison").getOne(id);
    return data;
  } catch (error) {
    console.log("Une erreur est survenue en lisant la maison", error);
    return null;
  }
}

/**
 * Ajoute une offre
 * house = FormData (recommandé pour upload)
 */
export async function addOffre(house) {
  try {
    await db.collection("maison").create(house);
    return { success: true, message: "Offre ajoutée avec succès" };
  } catch (error) {
    console.log("Une erreur est survenue en ajoutant la maison", error);
    return { success: false, message: "Une erreur est survenue en ajoutant la maison" };
  }
}