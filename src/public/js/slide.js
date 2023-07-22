function loaddata(){
    slide();
}
var hinh = ["1200x628-01.png", "Banner-Thang-4-851x475-UPWEB.jpg", "Bo-Tra.png", "Tet-sach_851x475.png"];

function slide() {
    var img = document.getElementById("img");
    var sizeimg = hinh.length;
    var h = Math.floor(Math.random()* sizeimg);
    img.src = `../img/`+hinh[h];
    document.getElementById("vitri").value = h;
    thumb();
}

function thumb(){
    let kq = "";
    for (let i = 0; i < hinh.length; i++) {
            kq += `<img src="./img/`+hinh[i]+`">`;
    }
    document.getElementById("thumb").innerHTML = kq;
}

function prev(){
    var vitri = document.getElementById("vitri").value;
    if (vitri == 0) {
        vitri = hinh.length;
    }
    var j = vitri - 1;
    document.getElementById("img").src = `./img/`+hinh[j];
    document.getElementById("vitri").value = j;
}

function next(){
    var vitri = parseInt(document.getElementById("vitri").value);
    if (vitri == (hinh.length - 1)) {
        vitri = -1;
    }
    var j = vitri + 1;
    document.getElementById("img").src = `./img/`+hinh[j];
    document.getElementById("vitri").value = j;
}