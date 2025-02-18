// Firebase SDK を読み込む
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// 🔹 Firebase の設定
const firebaseConfig = {
    apiKey: "AIzaSyBYtkWuK0sbCYyQcVhLeFWCPhU7GhMG8pg",
    authDomain: "exceldisplay-505fc.firebaseapp.com",
    projectId: "exceldisplay-505fc",
    storageBucket: "exceldisplay-505fc.appspot.com",
    messagingSenderId: "491087347583",
    appId: "1:491087347583:web:64f812b63ad8b6ac0be44a",
    measurementId: "G-D5H647GG6L"
};

// 🔹 Firebase 初期化
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🔹 Firestore からデータを取得して HTML に反映
async function loadFirestoreData() {
    const docRef = doc(db, "tables", "sheet1"); // 🔹 Firestore のドキュメントを指定
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
        const data = docSnap.data();
        console.log("Firestore のデータ:", data);

        // 🔹 Firestore のデータを HTML に反映
        document.getElementById("nameCell").textContent = data.name || "N/A";
        document.getElementById("ageCell").textContent = data.age || "N/A";
        document.getElementById("jobCell").textContent = data.job || "N/A";
    } else {
        console.warn("Firestore にデータが存在しません。");
    }
}

// 🔹 Firestore のデータを読み込む
loadFirestoreData();

// 🔹 コンソールでスタイルを変更できる関数
window.updateTableStyle = function ({ colWidths, rowHeight, fontSize, textColor }) {
    const table = document.getElementById("dataTable");

    // 列の幅を変更
    if (colWidths) {
        colWidths.forEach((width, index) => {
            const th = table.rows[0].cells[index];
            const tds = table.querySelectorAll(`td:nth-child(${index + 1})`);
            if (th) th.style.width = width + "px";
            tds.forEach(td => td.style.width = width + "px");
        });
    }

    // 行の高さを変更
    if (rowHeight) {
        table.querySelectorAll("tr").forEach(row => {
            row.style.height = rowHeight + "px";
        });
    }

    // フォントサイズとテキストカラーを変更
    if (fontSize || textColor) {
        table.querySelectorAll("th, td").forEach(cell => {
            if (fontSize) cell.style.fontSize = fontSize + "px";
            if (textColor) cell.style.color = textColor;
        });
    }

    console.log("テーブルスタイルが更新されました！");
};
