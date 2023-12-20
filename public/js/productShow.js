function printBarcode() {
    let barcodeImage = document.getElementById('barcode_img');
    let printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><title>Product Barcode</title></head><body>');
    printWindow.document.write('<img src="' + barcodeImage.src + '" style="width:auto; height:10rem;">');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}