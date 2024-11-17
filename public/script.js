const links = [
    { url: "http://localhost:8080/icon", text: "アイコン表示" },
    { url: "http://localhost:8080/janken", text: "じゃんけん" },
    { url: "http://localhost:8080/luck", text: "おみくじ" },
    { url: "http://localhost:8080/dice", text: "サイコロをn回振る" },
    { url: "http://localhost:8080/gamble", text: "丁半ゲーム" },
    { url: "http://localhost:8080/gacha", text: "ガチャ" },
    { url: "http://localhost:8080/weather", text: "天気予報（クオリティ低）" },
];

window.onload = () => {
    document.getElementById("linkContainer").innerHTML = links.map(link =>
        `<a href="${link.url}" target="_blank">${link.text}</a><br>`
    ).join('');
};


