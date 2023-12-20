let result = document.querySelector("p");

function onScanSuccess(decodedText, decodedResult) {
    console.log(`Code matched = ${decodedText}`, decodedResult);
    val = decodedText;
    result.innerHTML = `<b>Scanned Details: </b> ${decodedText}`;
}

function onScanFailure(error) {
    console.warn(`Code scan error = ${error}`);
}

let html5QrcodeScanner = new Html5QrcodeScanner(
    "reader",
    { fps: 10, qrbox: {width: 300, height: 300} },
    /* verbose= */ false);

html5QrcodeScanner.render(onScanSuccess, onScanFailure);