    // Sidebar toggle functionality
    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');
    const closeSidebar = document.getElementById('close-sidebar');

    hamburger.addEventListener('click', () => {
        sidebar.classList.remove('hidden');
    });

    closeSidebar.addEventListener('click', () => {
        sidebar.classList.add('hidden');
    });
      document.addEventListener("DOMContentLoaded", function () {
   
        const map = L.map("map").setView([-6.1214375,120.4579375], 18);
    
        
        const osmLayer = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
          maxZoom: 19,
          attribution:  'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

        });
    
       
        const satelliteLayer = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',  {
            maxZoom: 19,
          attribution: '© Esri, Maxar, Earthstar Geographics, and the GIS User Community'
        });
    
       
        osmLayer.addTo(map);
    
        
        const baseLayers = {
          "Standar": osmLayer,
          "Satelit": satelliteLayer
        };
        L.control.layers(baseLayers).addTo(map);
    
        
        const umkmData = {
            name: "Smart Wash Laundry",
            rating: "4,8",
            reviews: 4,
            category: "Laundry",
            buka: "Buka · Tutup pukul 22.00 🔻",
            alamat:
              "VFH5+94G, Benteng Sel., Kec. Benteng, Kab. Kepulauan Selayar, Sulawesi Selatan",
            phone: "082347393691",
            coords: [-6.1214375, 120.4579375],
            imageUrl: "./data/smartwash.jpg",
            hours: {
              Senin: "09.00–22.00",
              Selasa: "09.00–22.00",
              Rabu: "09.00–22.00",
              Kamis: "09.00–22.00",
              Jumat: "09.00–22.00",
              Sabtu: "09.00–22.00",
              Minggu: "09.00–22.00",
            },
          };
  
          const marker = L.marker(umkmData.coords).addTo(map);
  
          // Menambahkan tooltip permanen pada marker
          marker.bindTooltip(umkmData.name, {
            permanent: true,
            direction: "top",
            className: "marker-tooltip",
          });
  
          marker.bindPopup(`
                  <div class="popup-container">
                      <div class="popup-header">${umkmData.name}</div>
                      <div class="popup-rating">⭐ ${umkmData.rating} <span>(${umkmData.reviews})</span></div>
                      <div class="popup-category">${umkmData.category}</div>
                      <img src="${umkmData.imageUrl}" alt="${umkmData.name}" class="popup-image" />
                      <div class="popup-address"><i class="fas fa-map-marker-alt"></i> ${umkmData.alamat}</div>
                      <div class="popup-hours"><i class="fas fa-clock"></i> <span>${umkmData.buka}</span></div>
                      <div class="popup-contact"><i class="fas fa-phone-alt"></i> ${umkmData.phone}</div>
                  </div>
              `);
  
          fetch("./data/jalanBentengAnjay.geojson")
            .then((response) => response.json())
            .then((geojsonData) => {
              L.geoJSON(geojsonData, {
                style: {
                  color: "#333",
                  weight: 4,
                  opacity: 1,
                },
              }).addTo(map);
            })
            .catch((error) =>
              console.error("Error loading jalan GeoJSON:", error)
            );
  
          fetch("./data/kecamatanBenteng.geojson")
            .then((response) => response.json())
            .then((geojsonData) => {
              L.geoJSON(geojsonData, {
                style: {
                  color: "#4dcf",
                  weight: 1.5,
                  opacity: 0.8,
                  fillColor: "#4dcf",
                  fillOpacity: 0.1,
                },
              }).addTo(map);
            })
            .catch((error) =>
              console.error("Error loading kecamatanBenteng GeoJSON:", error)
            );
        });
 
  