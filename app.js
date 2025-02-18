// Firebase SDK を読み込む
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Handsontableを正しいURLからインポート
import Handsontable from "https://cdn.jsdelivr.net/npm/handsontable@12.1.0/dist/handsontable.full.min.js";

// 🔹 Firebaseの設定
const firebaseConfig = {
  apiKey: "AIzaSyBYtkWuK0sbCYyQcVhLeFWCPhU7GhMG8pg",
  authDomain: "exceldisplay-505fc.firebaseapp.com",
  projectId: "exceldisplay-505fc",
  storageBucket: "exceldisplay-505fc.appspot.com",
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
        console.log("Firestore から取得したデータ:", docSnap.data().tableData);
        return docSnap.data().tableData; // 既存データを取得
    } else {
        console.warn("Firestore にデータが存在しません。初期データを使用します。");
        return [
            ["名前", "年齢", "職業"],
            ["田中", "30", "エンジニア"],
            ["鈴木", "25", "デザイナー"]
        ];
    }
}

// 🔹 Firestoreのリアルタイムリスナー
onSnapshot(doc(db, "tables", "sheet1"), (docSnap) => {
    if (docSnap.exists() && hot) {
        console.log("Firestore の変更を検出、データ更新:", docSnap.data().tableData);
        hot.loadData(docSnap.data().tableData);
    }
});

// 🔹 Handsontableを初期化（データをFirestoreから取得）
loadData().then((data) => {
    console.log("取得データ:", data);
    if (!data) {
        console.error("データが取得できませんでした！");
        return;
    }

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
            console.log("Firestore にデータを保存:", updatedData);
            await setDoc(doc(db, "tables", "sheet1"), { tableData: updatedData });
        }
    });
}).catch(error => {
    console.error("データの読み込みに失敗しました:", error);
});
