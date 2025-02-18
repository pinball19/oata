// Firebase SDK を読み込む
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import Handsontable from "https://cdn.jsdelivr.net/npm/handsontable@12.1.0/dist/handsontable.full.min.mjs";

// 🔹 Firebaseの設定（自分のプロジェクトの値に置き換える）
const firebaseConfig = {
  apiKey: "AIzaSyBYtkWuK0sbCYyQcVhLeFWCPhU7GhMG8pg",
  authDomain: "exceldisplay-505fc.firebaseapp.com",
  projectId: "exceldisplay-505fc",
  storageBucket: "exceldisplay-505fc.firebasestorage.app",
  messagingSenderId: "491087347583",
  appId: "1:491087347583:web:64f812b63ad8b6ac0be44a",
  measurementId: "G-D5H647GG6L"
};

// 🔹 FirebaseアプリとFirestoreを初期化
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🔹 Handsontableの設定
const container = document.getElementById('table');
let hot;

// 🔹 Firestoreからデータを取得
async function loadData() {
    const docRef = doc(db, "tables", "sheet1");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data().tableData; // 既存データを取得
    } else {
        return [
            ["名前", "年齢", "職業"],
            ["田中", "30", "エンジニア"],
            ["鈴木", "25", "デザイナー"]
        ]; // 初期データ
    }
}

// 🔹 Firestoreのリアルタイムリスナー（他のユーザーの変更も即反映）
onSnapshot(doc(db, "tables", "sheet1"), (docSnap) => {
    if (docSnap.exists() && hot) {
        hot.loadData(docSnap.data().tableData);
    }
});

// 🔹 Handsontableを初期化（データをFirestoreから取得）
loadData().then((data) => {
    hot = new Handsontable(container, {
        data: data,
        colHeaders: true,
        rowHeaders: true,
        width: "100%",
        height: "auto",
        manualColumnResize: true,
        manualRowResize: true,
        licenseKey: "non-commercial-and-evaluation",
        afterChange: async (changes) => {
            if (!changes) return;
            
            // Firestoreにデータを保存
            const updatedData = hot.getData();
            await setDoc(doc(db, "tables", "sheet1"), { tableData: updatedData });
        }
    });
});
