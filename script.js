const input = document.querySelector('#qr-text');
const size = document.querySelector('#size');
const margin = document.querySelector('#margin');
const dotcolor = document.querySelector('#dot-color1');
const dotcolor2 = document.querySelector('#dot-color2');
const logo = document.querySelector('#logo');
const remove = document.querySelector('#clear');
const dotmode = document.querySelector('#dot');
const download = document.querySelector("#btn-download");
const check = document.querySelector('#check');

let qr = {
    width: 100,
    height: 100,
    type: "png",
    data: input.value,
    image: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
    dotsOptions: {
        color: "#4267b2",
        type:"rounded",
    gradient :{
        "type":"linear",
        "colorStops":[
            {
                "offset": 0,
                "color": "#000000"
            },
            {
                "offset": 1,
                "color": "#000"
            }
        ]
    }
   },
    backgroundOptions: {
        color: "#fff",
    },
    imageOptions: {
        hideBackgroundDots : false,
        crossOrigin: "anonymous",
        margin: 30
      }
  
}

 parse();
 
 input.addEventListener('keyup',e=>{
    qr.data = e.target.value;
    parse();
    });

 size.addEventListener('input',e=>{
    qr.width = e.target.value*10;
    qr.height = e.target.value*10;
    parse();
 });



 margin.addEventListener('input',e=>{
    qr.imageOptions = {margin:e.target.value};
    parse();
 });

 dotmode.addEventListener('input',e=>{
    qr.dotsOptions.type = e.target.value;
    parse();
 });

 dotcolor.addEventListener('input',e=>{
    qr.dotsOptions.gradient.colorStops[0].color = e.target.value;
    parse();
 });
 dotcolor2.addEventListener('input',e=>{
    qr.dotsOptions.gradient.colorStops[1].color = e.target.value;
    parse();
 });


 var qrCode;
 function parse(){
 qrCode = new QRCodeStyling(qr);
 let canvas = document.querySelector('#canvas');
 canvas.innerHTML = '';
 qrCode.append(canvas);
 canvas.nextElementSibling.innerHTML = qr.width + ' x ' +qr.height;
 }

function browse(){
     logo.click();

}

logo.addEventListener('change',e=>{
    let files = e.target.files[0];
    let reader = new FileReader();
    reader.onload = ()=>{
        qr.image = reader.result;
        parse();
    }
 reader.readAsDataURL(files);
});
download.addEventListener('click',e=>{
   qrCode.download({name:'qr-code',extension:'png'});
});

remove.addEventListener('click',e=>{
 delete(qr.image);
 parse();
});

check.addEventListener('change', function() {
    if (this.checked) {
        qr.imageOptions.hideBackgroundDots = true;
        parse();

    } else {
        qr.imageOptions.hideBackgroundDots = false;
        parse();
    }
  });
  