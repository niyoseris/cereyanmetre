const esyalar = {
    "Çamaşır Makinası":"500",
    "Saç Kurutma Makinası": "1200",
    "Buzluk": "120",
    "Dipfiriz" : "200",
    "Bulaşık Makinası": "1800",
    "Kurutma Makinası": "3000",
    "Mikrodalga":"1200",
    "Televizyon": "60",
    "Kettle": "1200",
    "Şofben": "6000",
    "Klima": "3000",
    "Ütü": "2000",
    "Sebil": "100",
    "Serinlik": "50",
    "LED Ampul" : "10",
    "Normal Ampul" : "75",
    "Heater" : "3250",
    "Soba" : "750",
    "Hidrofor" : "650",
    "Fırın" : "3250",
    "Kahve Makinası" : "750",
    "Su Motoru" : "750"

};

basliklar = ["Eşya", "Günde", "Ayda", "Toplam<br>kWs"];


var genelTuketim = {};


let t = document.createElement("table");
var sel = document.getElementById("sel");

var ilkKademe = parseFloat("2,6963");
var ikinciKademe = parseFloat("5.5625");
var ucuncuKademe = parseFloat("5.9810");
var dorduncuKademe = parseFloat("6.4831");
var besinciKademe = parseFloat("7.7383");
var maktu = parseInt("85");


toplam = 0;

for (baslik of basliklar){
    
    var hea = document.createElement("th");
    hea.innerHTML = baslik;
    t.appendChild(hea);
}


for (e in esyalar){

    var selOpt = document.createElement("option");
    selOpt.text = e;
    sel.add(selOpt);
}

    
function toplaBak(mm){
    
        var fatura = document.getElementById("toplamFatura");

        if(mm == 0){
        toplamlari = '';
    
        for(ee in genelTuketim){
            toplamlari = Number(genelTuketim[ee]) + Number(toplamlari);
        }
        }else{
            toplamlari = mm;
        }
    
    document.getElementById("toplamKw").innerHTML = toplamlari + " kWs";
    
    if(toplamlari>10000){
        document.body.style.background = "#f5b7b1";
    } else {
        document.body.style.background = "#FFFFFF";
    }

    if(toplamlari <= 250){
        fatura.innerHTML = ((toplamlari * ilkKademe) + maktu) * 1.1 + " TL";
    }
    
    if(toplamlari >= 250 && toplamlari <= 500){
    var ilk = 250 * ilkKademe;
    var ikinci = (toplamlari - 250) * ikinciKademe;
        fatura.innerText = (Number(ilk) + Number(ikinci) + maktu) * 1.1 + " TL";
    }

    if(toplamlari >= 500 && toplamlari <= 750){
    var ilk = 250 * ilkKademe;
    var ikinci = 250 * ikinciKademe;
    var ucuncu = (toplamlari - 500) * ucuncuKademe;
        fatura.innerText = (Number(ilk) + Number(ikinci) + Number(ucuncu) + maktu) * 1.1 + " TL";
    }

    if(toplamlari >= 750 && toplamlari <= 1000){
    var ilk = 250 * ilkKademe;
    var ikinci = 250 * ikinciKademe;
    var ucuncu = 250 * ucuncuKademe;
    var dorduncu = (toplamlari - 750) * dorduncuKademe;
        fatura.innerText = (Number(ilk) + Number(ikinci) + Number(ucuncu) + Number (dorduncu) + maktu) * 1.1 + " TL";
    
    }
    
    if(toplamlari >= 1000){
    var ilk = 250 * ilkKademe;
    var ikinci = 250 * ikinciKademe;
    var ucuncu = 250 * ucuncuKademe;
    var dorduncu = 250 * dorduncuKademe;
    var besinci = (toplamlari - 1000) * besinciKademe;
        fatura.innerText = ((Number(ilk) + Number(ikinci) + Number(ucuncu) + Number (dorduncu) + Number (besinci)) * 1.1) + maktu + " TL";
    }

    
}



var toplamText = document.createElement("span");
toplamText.id = "toplamKw";
toplamText.className = "toplam";
toplamText.innerHTML = "0 kWs";

var toplamFatura = document.createElement("span");
toplamFatura.id = "toplamFatura";
toplamFatura.className = "toplamFatura";
toplamFatura.innerHTML = "0 TL";

document.getElementById("tableDiv").appendChild(t);
document.getElementById("toplamDiv").appendChild(toplamText);
document.getElementById("toplamFaturaDiv").appendChild(toplamFatura);


var cc = document.createElement("input");
cc.type = "number";
cc.id = "ikws";
cc.className ="ikwsinput";

var ikwsT = document.createElement("span");
ikwsT.innerHTML = "Toplam kWs : ";

var kwb = document.createElement("button");
kwb.innerHTML = "Hesap Lütfen";
kwb.onclick = function(){
    toplaBak(document.getElementById("ikws").value);
}

document.getElementById("direktKw").appendChild(ikwsT);
document.getElementById("direktKw").appendChild(cc);
document.getElementById("direktKw").appendChild(kwb);



function sec(){
    bilinenKw.value = esyalar[sel.value];
    document.getElementById("gundeKacSaat").value = 0;
    document.getElementById("gundeKacDakika").value = 0;
    document.getElementById("aydaKacGun").value = 0;
}


function selBak(){

    var esya = document.getElementById("sel").value;
    var kacSaat = document.getElementById("gundeKacSaat").value;
    var kacDakika = document.getElementById("gundeKacDakika").value;
    var kacGun = document.getElementById("aydaKacGun").value;

    var esyaToplam = ((esyalar[esya] * (Number(kacSaat) + (Number(kacDakika) / 60))) * kacGun) / 1000;

    let r = t.insertRow();
    r.id = esya + Math.floor(Date.now() * 1000);

    let esyaCell = r.insertCell();
    esyaCell.innerHTML = esya.replace(/ /g, "<br>");

    let saatDakikaCell = r.insertCell();
    saatDakikaCell.innerHTML = kacSaat + " saat <br>" + kacDakika + " dakika";

    let gunCell = r.insertCell();
    gunCell.innerHTML = kacGun;

    let kwCell = r.insertCell();
    kwCell.innerHTML = esyaToplam;
    genelTuketim[r.id] = esyaToplam;
    toplaBak(0);

    let silCell = r.insertCell();
    let silBut = document.createElement("button");
    silBut.innerText = "sil";
    silBut.className = "butto";
    silBut.onclick = function() {
        t.deleteRow(this.parentNode.parentNode.rowIndex);
        delete genelTuketim[r.id];
        toplaBak(0);
    }
    silCell.append(silBut);
    t.insertRow(r);

}
