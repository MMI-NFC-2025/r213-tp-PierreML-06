import PocketBase from 'pocketbase';

// ⚠️ Mets l’URL de TON serveur PocketBase
// En local par défaut :
const db = new PocketBase('http://127.0.0.1:8090');

/**
 * Récupère toutes les maisons de la collection "maison"
 */
export async function getOffres() {
    try {
        const data = await db.collection('maison').getFullList({
            sort: '-created',
        });

        return data;
    } catch (error) {
        console.error(
            'Une erreur est survenue en lisant la liste des maisons :',
            error
        );
        return [];
    }
}

/**
 * Génère l'URL complète d’un fichier image stocké dans PocketBase
 * @param {Object} record → l’enregistrement PocketBase
 * @param {string} recordImage → nom du fichier image (ex: "maison.jpg")
 */
export function getImageUrl(record, recordImage) {
    if (!record || !recordImage) return null;

    return db.files.getURL(record, recordImage);
}
