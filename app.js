// Firebase SDK を読み込む
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Handsontable をCDNからロード
import Handsontable from "https://cdn.jsdelivr.net/npm/handsontable@latest/dist/handsontable.full.min.js";

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

// 🔹 Firebase初期化
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🔹 Handsontableの設定
const container = document.getElementById('table');
let hot;

// 🔹 Firestoreからデータを取得して特定のセルに設定
async function loadData() {
    const docRef = doc(db, "tables", "sheet1");
    const docSnap = await getDoc(docRef);
    
    let tableData = [
        ["名前", "年齢", "職業"],
        ["田中", "30", "エンジニア"],
        ["鈴木", "25", "デザイナー"]
    ]; // デフォルトの2D配列

    if (docSnap.exists()) {
        const data = docSnap.data();
        console.log("Firestore から取得したデータ:", data);

        // 🔹 `strings` フィールドが存在する場合、特定のセル（row=1, col=1）にデータを挿入
        if (data.strings) {
            tableData[1][1] = data.strings; // 例: "strings" フィールドのデータを (1,1) のセルに挿入
            console.log(`セル (1,1) に '${data.strings}' を挿入しました。`);
        }
    }

    return tableData;
}

// 🔹 Handsontableを初期化（Firestoreのデータを取得）
loadData().then((data) => {
    console.log("最終的なテーブルデータ:", data);
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
