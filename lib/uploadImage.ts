import { ID, storage } from "@/appwrite";

const uploadImage = async (file: File) => {
    if (!file) return;

    const fileUploaded = await storage.createFile(
        "648c5b3095707888a42d", // storage bucked id
        ID.unique(),
        file
    );

    return fileUploaded;
}

export default uploadImage;