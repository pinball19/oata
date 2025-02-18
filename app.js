document.getElementById("addSecondOption").addEventListener("click", function() {
    document.getElementById("secondOption").classList.remove("hidden");
    this.style.display = "none"; // ボタンを隠す
});

document.getElementById("addThirdOption").addEventListener("click", function() {
    document.getElementById("thirdOption").classList.remove("hidden");
    this.style.display = "none"; // ボタンを隠す
});
