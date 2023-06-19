import { databases } from "@/appwrite"

export const getTodosByColumn = async () => {
    const data = await databases.listDocuments(
        '648c59f262af4c5b2ba7',
        '648c5a1c155d64468b75',
    );

    console.log(data);
}