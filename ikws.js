const esyalar = {
    "Çamaşır Makinası":"500",
    "Saç Kurutma Makinası": "1200",
    "Buzluk": "120",
    "Diğer Buzluk" : "120",
    "Üçüncü Buzluk" : "120",
    "Diffiriz" : "200",
    "Bulaşık Makinası": "1800",
    "Kurutma Makinası": "3000",
    "Mikrodalga":"1200",
    "Televizyon": "60",
    "Kettle": "1200",
    "Şofben": "6000",
    "Klima": "3000",
    "İki Klima (Toplam)": "6000",
    "Üç Klima (Toplam)" : "9000",
    "Dört Klima (Toplam)" : "12000",
    "Ütü": "2000",
    "Sebil": "100",
    "Serinlik": "50",
    "Bir LED Ampul" : "10",
    "İki LED Ampul (Toplam)" : "20",
    "Üç LED Ampul (Toplam)" : "30",
    "Dört LED Ampul (Toplam)" : "40",
    "Normal Ampul" : "75",
    "İki Normal Ampul (Toplam)" : "150",
    "Üç Normal Ampul (Toplam)" : "225",
    "Dört Normal Ampul (Toplam)" : "300",
    "Heater" : "3250",
    "Soba" : "750",
    "İkinci Soba" : "750",
    "Hidrofor" : "650",
    "Fırın" : "3250",
    "Kahve Makinası" : "750",
    "Su Motoru" : "750"

};

basliklar = ["Eşya", "Günde (Saat : Dakika)", "Ayda<br>kaç<br>gün?", "Toplam<br>kWs"];


var genelTuketim = {};


let t = document.createElement("table");

toplam = 0;

for (baslik of basliklar){
    
    var hea = document.createElement("th");
    hea.innerHTML = baslik;
    hea.className = "elems";
    t.appendChild(hea);
}

for (e in esyalar){
    var gundeKacSaat = document.createElement("input");
    gundeKacSaat.type ="number";
    gundeKacSaat.min = "0";
    gundeKacSaat.max = "24";
    gundeKacSaat.value= "0";
    gundeKacSaat.className = "elems";
    gundeKacSaat.step ="1";
    gundeKacSaat.name = e;
    gundeKacSaat.id = e + "ranc";
    gundeKacSaat.oninput = function (){
        var esyaToplam = (this.value + (document.getElementById(this.name + "dakika").value / 60)) * esyalar[this.name] * document.getElementById(this.name + "ayda").value / 1000;

        document.getElementById(this.name +"kws").innerHTML = esyaToplam;

        genelTuketim[this.name] = esyaToplam;
        console.log(genelTuketim);

        toplaBak(0);

    }

    var gundeKacDakika = document.createElement("input");
    gundeKacDakika.type ="number";
    gundeKacDakika.min = "0";
    gundeKacDakika.max = "59";
    gundeKacDakika.value= "0";
    gundeKacDakika.className = "elems";
    gundeKacDakika.step ="1";
    gundeKacDakika.name = e;
    gundeKacDakika.id = e + "dakika";
    gundeKacDakika.oninput = function (){
        var esyaToplam = (document.getElementById(this.name + "ranc").value +  (this.value / 60)) * esyalar[this.name] * document.getElementById(this.name + "ayda").value / 1000;

        document.getElementById(this.name +"kws").innerHTML = esyaToplam;

        genelTuketim[this.name] = esyaToplam;
        console.log(genelTuketim);

        toplaBak(0);

    }
    
    var aydaKacGun = document.createElement("input");
    aydaKacGun.type ="number";
    aydaKacGun.min = "0";
    aydaKacGun.max = "31";
    aydaKacGun.className = "elems";
    aydaKacGun.step = "0";
    aydaKacGun.name = e;
    aydaKacGun.id = e + "ayda";
    aydaKacGun.value = "0";
    aydaKacGun.oninput = function (){
        var esyaToplam = this.value * esyalar[this.name] * (document.getElementById(this.name + "ranc").value + (document.getElementById(this.name + "dakika").value / 60)) / 1000;

        document.getElementById(this.name +"kws").innerHTML = esyaToplam;
        
        genelTuketim[this.name] = esyaToplam;
        console.log(genelTuketim);

        toplaBak(0);


        
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
      
        if(toplamlari>250){
            document.body.style.background = "#FF0000";
        } else {
            document.body.style.background = "#FFFFFF";
        }

        if(toplamlari <= 250){
            fatura.innerHTML = (toplamlari * 0.9873) + " TL";
        }
        
        if(toplamlari >= 250 && toplamlari <= 500){
        var ilk = 250 * 0.9873;
        var ikinci = (toplamlari - 250) * 2.7;
            fatura.innerText = Number(ilk) + Number(ikinci) + " TL";
        }

        if(toplamlari >= 500 && toplamlari <= 750){
        var ilk = 250 * 0.9873;
        var ikinci = 250 * 2.7;
        var ucuncu = (toplamlari - 500) * 2.95;
            fatura.innerText = Number(ilk) + Number(ikinci) + Number(ucuncu) + " TL";
        }

        if(toplamlari >= 750 && toplamlari <= 1000){
        var ilk = 250 * 0.9873;
        var ikinci = 250 * 2.7;
        var ucuncu = 250 * 2.95;
        var dorduncu = (toplamlari - 750) * 3.25;
            fatura.innerText = Number(ilk) + Number(ikinci) + Number(ucuncu) + Number (dorduncu) + " TL";
        
        }
        
        if(toplamlari >= 1000){
        var ilk = 250 * 0.9873;
        var ikinci = 250 * 2.7;
        var ucuncu = 250 * 2.95;
        var dorduncu = 250 * 3.25;
        var besinci = (toplamlari - 1000) * 4;
            fatura.innerText = Number(ilk) + Number(ikinci) + Number(ucuncu) + Number (dorduncu) + Number (besinci) + " TL";
        }

        
        

        
        
        
    }


    var esyaToplamKws = document.createElement("span");
    esyaToplamKws.id = e +"kws";
    esyaToplamKws.innerHTML = "0";
    esyaToplamKws.name="esyaToplam";
    esyaToplamKws.className="elems";
    
    var esyaAdi = document.createElement("span");
    esyaAdi.innerHTML = e;
    esyaAdi.className = "elems";
    
    let r = t.insertRow();
    
    let es = r.insertCell();
    es.className ="elems";
    
    let d = r.insertCell();
    d.className = "elems";
    
    let o = r.insertCell();
    o.className = "elems";

    
    let g = r.insertCell();
    g.className = "elems";
    
    
    es.appendChild(esyaAdi);
    d.appendChild(gundeKacSaat);
    d.append(" : ");
    d.appendChild(gundeKacDakika);
    g.appendChild(esyaToplamKws);
    o.appendChild(aydaKacGun);
    
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


