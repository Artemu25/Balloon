import { HDRCubeTextureLoader } from './HDRCubeTextureLoader.js';


let i = 0;

let names = [
  'В магазине',
  'С курьером',
  'У холодильника',
  'В подъезде',
  'В аптеке',
  'В лифте',
  'На прогулке с собакой',
  'При встече со стражем порядка'
];



AFRAME.registerComponent("koo", {
  init: function() {
    var targetCube = new THREE.WebGLRenderTargetCube(512, 512);
    var renderer = this.el.sceneEl.renderer;

    this.el.addEventListener("model-loaded", e => {
      let mesh = this.el.getObject3D("mesh");
      
      var hdrUrls = [ 'px.hdr', 'nx.hdr', 'py.hdr', 'ny.hdr', 'pz.hdr', 'nz.hdr' ];
      var rgbmUrls = [ 'px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png' ];
      //var texture 
      var rgbmCubeMap = new THREE.CubeTextureLoader()
      .setPath( './' ).load(
      //var texture = new THREE.TextureLoader().load(
        rgbmUrls,
        function() {
          //var cubeTex = targetCube.fromEquirectangularTexture(renderer, texture);
          // hdrCubeRenderTarget = pmremGenerator.fromCubemap( texture );
					// texture.magFilter = THREE.LinearFilter;
          // texture.needsUpdate = true;

          rgbmCubeMap.encoding = THREE.RGBM16Encoding;
					rgbmCubeMap.format = THREE.RGBAFormat;

          mesh.traverse(function(el) {
            if (el.material) {
              console.log('kek');
              el.material.envMap = texture;//cubeTex.texture;
              el.material.envMapIntensity = 1;
              el.material.roughness = 0;
              //el.material.metalness = 0.7;
              //el.material.emissiveIntensity = 0;
              el.material.needsUpdate = true;
              /*var roughtex = new THREE.TextureLoader().load( 'Rougness.png', function(){
                el.material.roughnessMap = roughtex;
              } );*/
            }
          });

          //cubeTex.minFilter = THREE.NearestMipmapNearestFilter;
          renderer.toneMappingExposure = 1;
          renderer.toneMapping = THREE.ACESFilmicToneMapping;
          renderer.outputEncoding = THREE.sRGBEncoding;
        }
      );
    });
  }
});


// function captureVideoFrame(video, format, width, height) {
//   if (typeof video === 'string') {
//     video = document.querySelector(video);
//   }

//   format = format || 'jpeg';

//   if (!video || (format !== 'png' && format !== 'jpeg')) {
//     return false;
//   }

//   var canvas = document.createElement('CANVAS');

//   canvas.width = width || video.videoWidth;
//   canvas.height = height || video.videoHeight;
//   canvas.getContext('2d').drawImage(video, 0, 0);
//   var dataUri = canvas.toDataURL('image/' + format);
//   var data = dataUri.split(',')[1];
//   var mimeType = dataUri.split(';')[0].slice(5);

//   var bytes = window.atob(data);
//   var buf = new ArrayBuffer(bytes.length);
//   var arr = new Uint8Array(buf);

//   for (var i = 0; i < bytes.length; i++) {
//     arr[i] = bytes.charCodeAt(i);
//   }

//   var blob = new Blob([arr], { type: mimeType });
//   return {
//     blob: blob,
//     dataUri: dataUri,
//     format: format,
//     width: canvas.width,
//     height: canvas.height
//   };
// }

// function resizeCanvas(origCanvas, width, height) {
//   let resizedCanvas = document.createElement('canvas');
//   let resizedContext = resizedCanvas.getContext('2d');

//   resizedCanvas.height = width;
//   resizedCanvas.width = height;

//   resizedContext.drawImage(origCanvas, 0, 0, width, height);
//   return resizedCanvas.toDataURL();
// }


// AFRAME.registerComponent('model-opacity', {
//   schema: { default: 1.0 },
//   init: function() {
//     this.el.addEventListener('model-loaded', this.update.bind(this));
//   },

//   update: function() {
//     var mesh = this.el.getObject3D('mesh');
//     var data = this.data;
//     if (!mesh) {
//       return;
//     }
//     mesh.traverse(function(node) {
//       if (node.isMesh) {
//         node.material.opacity = data;
//         node.material.needsUpdate = true;
//       }
//     });
//   }
// });

// AFRAME.registerComponent('pedestal', {
//   schema: {
//     target: { type: 'selector' }
//   },

//   changeText: function() {
//     //this.el.setAttribute('visible', false)
//     this.el.setAttribute('material', {
//       src: '#pedestal-texture-' + (i % 8).toString()
//     });
//   }
// });

