let keksit = 0;
let klikkausVoima = 1;

let uunit = 0;
let tehouunit = 0;

let klikkausHinta = 75;
let uuniHinta = 200;
let tehouuniHinta = 600;
let tehokkainklikkausHinta = 500;

let klikkauksiaOstettu = 0;
let uunejaOstettu = 0;
let tehouunejaOstettu = 0;
let tehokkaitaKlikkauksiaOstettu = 0;

const keksiNappi = document.getElementById("keksiNappi");

const klikkausParannus = document.getElementById("klikkausParannus");
const uuniParannus = document.getElementById("uuniParannus");
const tehouuniParannus = document.getElementById("tehouuniParannus");
const tehokkainklikkausParannus = document.getElementById("tehokkainklikkausParannus");
const devLisaaKeksit = document.getElementById("devLisaaKeksit");

function muotoileLuku(luku) {
    return luku.toLocaleString("fi-FI", {
        maximumFractionDigits: 2
    });
}


function laskeTuotanto() {
    return uunit * Math.pow(1.25, tehouunit);
}

function paivitaPeli() {

    let tuotanto = laskeTuotanto();

    document.getElementById("keksit").textContent =
        muotoileLuku(keksit) + " keksiä";

    document.getElementById("tuotanto").textContent =
        "KPS: " + muotoileLuku(tuotanto);

    document.getElementById("klikkausVoima").textContent =
        "KPK: " + klikkausVoima;

    document.getElementById("klikkausHinta").textContent =
        "Hinta: " + klikkausHinta + " keksiä";

    document.getElementById("uuniHinta").textContent =
        "Hinta: " + uuniHinta + " keksiä";

    document.getElementById("tehouuniHinta").textContent =
        "Hinta: " + tehouuniHinta + " keksiä";

    document.getElementById("tehokkainklikkausHinta").textContent =
        "Hinta: " + tehokkainklikkausHinta + " keksiä";

    document.getElementById("klikkausMaara").textContent =
        "Ostettu: " + klikkauksiaOstettu;

    document.getElementById("uuniMaara").textContent =
        "Ostettu: " + uunejaOstettu;

    document.getElementById("tehouuniMaara").textContent =
        "Ostettu: " + tehouunejaOstettu;

    document.getElementById("tehokkainklikkausMaara").textContent =
        "Ostettu: " + tehokkaitaKlikkauksiaOstettu;

    klikkausParannus.disabled = keksit < klikkausHinta;
    uuniParannus.disabled = keksit < uuniHinta;

    tehouuniParannus.disabled =
        keksit < tehouuniHinta || uunit === 0;

    tehokkainklikkausParannus.disabled =
        keksit < tehokkainklikkausHinta;

    if (uunit === 0) {
        document.getElementById("tehouuniVaatimus").textContent =
            "Vaatii vähintään yhden tavallisen uunin.";
    } else {
        document.getElementById("tehouuniVaatimus").textContent =
            "Automaattinen tuotanto kasvaa 25 %.";
    }
}

function naytaKlikkausEfekti() {

    const teksti = document.createElement("span");

    teksti.className = "piste-teksti";
    teksti.textContent = "+" + klikkausVoima;

    keksiNappi.appendChild(teksti);

    setTimeout(function() {
        teksti.remove();
    }, 800);

    keksiNappi.classList.remove("klikattu");

    void keksiNappi.offsetWidth;

    keksiNappi.classList.add("klikattu");

    setTimeout(function() {
        keksiNappi.classList.remove("klikattu");
    }, 130);
}

function naytaOstoEfekti(painike) {

    const kortti = painike.closest(".parannus");

    kortti.classList.add("ostettu");

    const palaute = document.createElement("span");

    palaute.className = "osto-palaute";
    palaute.textContent = "✓ Ostettu!";

    kortti.appendChild(palaute);

    setTimeout(function() {
        palaute.remove();
        kortti.classList.remove("ostettu");
    }, 900);
}

keksiNappi.addEventListener("click", function() {

    keksit += klikkausVoima;

    naytaKlikkausEfekti();

    paivitaPeli();

});

klikkausParannus.addEventListener("click", function() {

    if (keksit >= klikkausHinta) {

        keksit -= klikkausHinta;
        klikkausVoima += 1;
        klikkauksiaOstettu++;

        klikkausHinta = Math.ceil(klikkausHinta * 1.8);

        naytaOstoEfekti(klikkausParannus);
        paivitaPeli();

    }

});

uuniParannus.addEventListener("click", function() {

    if (keksit >= uuniHinta) {

        keksit -= uuniHinta;
        uunit++;
        uunejaOstettu++;

        uuniHinta = Math.ceil(uuniHinta * 1.8);

        naytaOstoEfekti(uuniParannus);
        paivitaPeli();

    }

});

tehouuniParannus.addEventListener("click", function() {

    if (keksit >= tehouuniHinta && uunit > 0) {

        keksit -= tehouuniHinta;
        tehouunit++;
        tehouunejaOstettu++;

        tehouuniHinta = Math.ceil(tehouuniHinta * 1.8);

        naytaOstoEfekti(tehouuniParannus);
        paivitaPeli();

    }

});

tehokkainklikkausParannus.addEventListener("click", function() {

    if (keksit >= tehokkainklikkausHinta) {

        keksit -= tehokkainklikkausHinta;
        klikkausVoima = Math.ceil(klikkausVoima * 1.5);
        tehokkaitaKlikkauksiaOstettu++;

        tehokkainklikkausHinta =
            Math.ceil(tehokkainklikkausHinta * 1.8);

        naytaOstoEfekti(tehokkainklikkausParannus);
        paivitaPeli();

    }

});

setInterval(function() {

    keksit += laskeTuotanto();

    paivitaPeli();

}, 1000);
devLisaaKeksit.addEventListener("click", function() {
    keksit += 2000;
    paivitaPeli();
});

paivitaPeli();