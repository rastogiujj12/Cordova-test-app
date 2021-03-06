var scanApp = {   
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady);
    },
    onDeviceReady: function () {
        console.log('Received Device Ready Event');
        Log.initialize(app.displayLogLine);
    },
    scan: function () {
        cordova.plugins.barcodeScanner.scan(
                function (result) {
                    // alert("Barcode/QR code data\n" + "Result: " + result.text + "\n" + "Format: " + result.format + "\n" + "Cancelled: " + result.cancelled);
                    try{
                        let obj = JSON.parse(result.text);
                        alert("QR Code data\nName :"+obj.name+"\nTL :"+obj.tl+"\nDescription :"+obj.description);
                    }
                    catch(err){
                        alert("error\nThis QR code is not generated by us");
                    }
                    

                },
                function (error) {
                    alert("Scanning failed: " + error);
                }
        );
    },
};