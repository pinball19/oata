// 🔹 マル販（ロット・一般・学生）の選択処理
document.querySelectorAll("#ticketType .option-btn").forEach(button => {
    button.addEventListener("click", function() {
        document.querySelectorAll("#ticketType .option-btn").forEach(btn => btn.classList.remove("selected"));
        this.classList.add("selected");
        console.log("選択されたマル販:", this.dataset.value);
    });
});

// 🔹 座席（ハザ・ロザ）の選択処理
document.querySelectorAll(".seat-group .seat-btn").forEach(button => {
    button.addEventListener("click", function() {
        this.parentNode.querySelectorAll(".seat-btn").forEach(btn => btn.classList.remove("selected"));
        this.classList.add("selected");
        console.log("選択された座席:", this.dataset.value);
    });
});
