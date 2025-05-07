import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import app from "../../../firebase";
import { NextResponse } from "next/server";

const firestore = getFirestore(app);

export async function POST(req) {
    const { data } = await req.json();
    try {
        const docRef = doc(collection(firestore, "cartas"));
        const id = docRef.id;
        await setDoc(docRef, { ...data, id });
        return NextResponse.json({ id: id, ...data });
    } catch (error) {
        return NextResponse.json({ error: "Failed to add document " + error });
    }
}

export async function GET() {
    const snapshot = await getDocs(collection(firestore, "cartas"));
    const data = snapshot.docs.map((doc) => ({ ...doc.data() }));
    return NextResponse.json(data);
}