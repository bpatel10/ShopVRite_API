var dataFile = require('../data/datajson');
exports.getCustomerPoints = function(req,res){
    var fsn=req.query.fsn;
    var name=getCustomer(fsn);
    var data;
    if(name){
        tot=getTotalPoints(fsn);
        data={
            fsn:fsn,
            customerName: name,
            totalPoints:tot
        };
    }
    else{
        data={
            error:'You are not the customer'
        };
    }
    res.send(data);
};

exports.scanQRCode = function(req,res){
    var fsn=req.body.fsn;
    var qrCode=req.body.QRCode;
    var name=getCustomer(fsn);
    if(name){
        if(!isQRScanned(fsn,qrCode)){
            var qrPoints=getQRPoints(qrCode);
            if(qrPoints){
                addScannedQRToList(fsn,qrCode,qrPoints);
                tot=getTotalPoints(fsn);
                data={
                    fsn:fsn,
                    qrCode:qrCode,
                    qrPoints:qrPoints,
                    totalPoints:tot
                };
            }
            else{
                data={
                    error:'Invalid QRCode'
                };
            }
            
        }else{
            data={
                error:'You have already scanned this QRCode'
            };
        }   
    }
    else{
        data={
            error:'You are not the customer'
        };
    }
    res.send(data);
};

function getCustomer(fsn){
    for(var i=0;i<dataFile.customer.length;i++){
        if(dataFile.customer[i].fsn===fsn){
            return dataFile.customer[i].name;
        }
    }
}

function getTotalPoints(fsn){
    var tot=0;
    var scanned=dataFile.customerScanned[fsn];
    if(scanned){
        for(var obj in scanned){
            tot+=scanned[obj].points;
        }
    }
    return tot;
}

function isQRScanned(fsn,QRCode){
    var scanned=dataFile.customerScanned[fsn];
    console.log(scanned);
    return scanned && scanned[QRCode];
}

function getQRPoints(QRCode){
    for(var i=0;i<dataFile.QRCodes.length;i++){
        if(dataFile.QRCodes[i].QRCode===QRCode){
            return dataFile.QRCodes[i].points;
        }
    }
    return null;
}

function addScannedQRToList(fsn,QRCode,QRPoints){
    if(!dataFile.customerScanned[fsn]){
        dataFile.customerScanned[fsn]={};
    }
    dataFile.customerScanned[fsn][QRCode]={points:QRPoints};
}
 