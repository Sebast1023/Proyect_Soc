// 1. LÍNEA DE TIEMPO / CRONOLOGÍA
const eventsData = {
    e1948: {
        title: "1948 - El Bogotazo y Crisis Política",
        desc: "Tras los hechos del Bogotazo, Colombia entra en una profunda crisis social y de polarización que antecede a las restricciones de prensa."
    },
    e1953: {
        title: "13 de Junio de 1953 - Golpe de Estado",
        desc: "El general Gustavo Rojas Pinilla llega al poder bajo el lema 'Paz, Justicia y Libertad', iniciando un periodo de fuerte control militar sobre los medios."
    },
    e1955: {
        title: "3 de Agosto de 1955 - Clausura de El Tiempo",
        desc: "Tras publicar información que cuestionaba la versión oficial sobre el asesinato del periodista Emilio Correa, el periódico El Tiempo es clausurado hasta 1957."
    },
    e1986: {
        title: "17 de Diciembre de 1986 - Asesinato de Guillermo Cano",
        desc: "El director de El Espectador es asesinado por el narcotráfico en Bogotá tras sus constantes denuncias sobre las redes ilegales en la política y sociedad."
    },
    e1999: {
        title: "1990s - 1999: Pico Histórico de Violencia",
        desc: "La década con mayor índice de homicidios contra periodistas en la historia reciente (58 casos), marcados por el crimen del humorista y periodista Jaime Garzón."
    },
    e2026: {
        title: "2026 - Violencia Regional y Entorno Digital",
        desc: "Ocurre el asesinato del comunicador comunitario Julián Andrés Hincapié en Anorí. La censura muta hacia la desinformación, el acoso digital y la violencia regional."
    }
};

function showEvent(key) {
    document.getElementById('tl-title').innerText = eventsData[key].title;
    document.getElementById('tl-desc').innerText = eventsData[key].desc;
    
    // Cambiar estado activo en botones
    const buttons = document.querySelectorAll('.tl-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

// MAPA DINÁMICO MEJORADO CON TODAS LAS ZONAS DE RIESGO
document.addEventListener('DOMContentLoaded', () => {
    const map = L.map('map').setView([4.5709, -74.2973], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    // Zonas de alto riesgo según el reporte y los eventos
    const zonas = [
        { name: "Anorí (Antioquia)", coords: [7.0736, -75.1481], text: "<b>Caso 2026:</b> Julián Andrés Hincapié, comunicador comunitario.", status: "Crítico (8.5)" },
        { name: "Arauca", coords: [7.0847, -70.7591], text: "<b>Zona de Silencio:</b> Alto riesgo por conflicto armado.", status: "Crítico (9.8)" },
        { name: "Córdoba", coords: [8.7500, -75.8833], text: "<b>Zona de Silencio:</b> Presión a medios comunitarios.", status: "Crítico (9.5)" },
        { name: "Norte de Santander", coords: [7.8939, -72.5078], text: "<b>Zona de Silencio:</b> Ataques y cibercensura.", status: "Crítico (9.2)" },
        { name: "Cauca", coords: [2.4448, -76.6147], text: "<b>Zona de Silencio:</b> Restricciones a la prensa local.", status: "Crítico (9.0)" },
        { name: "Nariño", coords: [1.2136, -77.2811], text: "<b>Zona de Silencio:</b> Intimidación y amenazas.", status: "Crítico (8.8)" },
        { name: "Bogotá D.C.", coords: [4.7110, -74.0721], text: "<b>Caso Histórico (1986):</b> Asesinato de Guillermo Cano Isaza (El Espectador).", status: "Capital (25% riesgo)" }
    ];

    zonas.forEach(zona => {
        L.marker(zona.coords).addTo(map)
            .bindPopup(`<b>${zona.name}</b><br>Nivel de Riesgo: ${zona.status}<br><br>${zona.text}`);
    });
});

// ==========================================
// CONFIGURACIÓN DE GRÁFICAS CON CHART.JS
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

    // 1. REGISTRO HISTÓRICO DE HOMICIDIOS (Gráfico de Barras)
    const ctxHomicidios = document.getElementById('chartHomicidios').getContext('2d');
    new Chart(ctxHomicidios, {
        type: 'bar',
        data: {
            labels: ['1950s', '1960s', '1970s', '1980s', '1990s', '2000s', '2010s', '2020-2025', '2026 (Ene-Oct)'],
            datasets: [{
                label: 'Número de Periodistas Asesinados',
                data: [8, 5, 10, 38, 58, 32, 11, 10, 3],
                backgroundColor: [
                    '#34495E', '#4A6572', '#E74C3C', '#900C3F', 
                    '#581845', '#E65100', '#2980B9', '#8E44AD', '#C0392B'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'REGISTRO HISTÓRICO DE HOMICIDIOS Y VIOLENCIA CONTRA PERIODISTAS (1950 - 2026)',
                    font: { family: 'Playfair Display', size: 14 }
                }
            }
        }
    });

    // 2. MUTACIÓN DEL PATRÓN DE CENSURA (Barras Apiladas)
    const ctxMutacion = document.getElementById('chartMutacion').getContext('2d');
    new Chart(ctxMutacion, {
        type: 'bar',
        data: {
            labels: ['1950s', '1960s', '1970s', '1980s', '1990s', '2000s', '2010s', '2020-2025', '2026'],
            datasets: [
                { label: 'Censura Institucional / Clausura', data: [9, 8, 7, 3, 2, 4, 3, 2, 1], backgroundColor: '#34495E' },
                { label: 'Violencia Letal y Terrorismo', data: [3, 2, 4, 10, 10, 7, 3, 2, 2], backgroundColor: '#800020' },
                { label: 'Espionaje, Amenazas y Exilio', data: [2, 2, 4, 7, 8, 9, 5, 4, 3], backgroundColor: '#D35400' },
                { label: 'Acoso Judicial y Ciberacoso', data: [1, 1, 2, 2, 3, 4, 8, 9, 9], backgroundColor: '#8E44AD' }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: { x: { stacked: true }, y: { stacked: true, max: 30 } },
            plugins: {
                title: {
                    display: true,
                    text: 'MUTACIÓN DEL PATRÓN DE CENSURA Y RIESGO PERIODÍSTICO',
                    font: { family: 'Playfair Display', size: 14 }
                }
            }
        }
    });

    // 3A. DISTRIBUCIÓN TERRITORIAL DEL RIESGO (Gráfico Donut)
    const ctxDonut = document.getElementById('chartDonutTerritorial').getContext('2d');
    new Chart(ctxDonut, {
        type: 'doughnut',
        data: {
            labels: ['Prensa Regional / Zonas de Silencio (75%)', 'Prensa Nacional / Capitales (25%)'],
            datasets: [{
                data: [75, 25],
                backgroundColor: ['#C0392B', '#34495E']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'DISTRIBUCIÓN TERRITORIAL DEL RIESGO',
                    font: { family: 'Playfair Display', size: 13 }
                }
            }
        }
    });

    // 3B. TOP DEPARTAMENTOS DE ALTO RIESGO (Barras Horizontales)
    const ctxTopDep = document.getElementById('chartTopDepartamentos').getContext('2d');
    new Chart(ctxTopDep, {
        type: 'bar',
        data: {
            labels: ['Arauca', 'Córdoba', 'Norte de Santander', 'Cauca', 'Nariño', 'Bajo Cauca Antioqueño'],
            datasets: [{
                label: 'Índice Relativo de Vulnerabilidad',
                data: [9.8, 9.5, 9.2, 9.0, 8.8, 8.5],
                backgroundColor: '#800020'
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'ZONAS DE ALTO RIESGO ("ZONAS DE SILENCIO")',
                    font: { family: 'Playfair Display', size: 13 }
                }
            }
        }
    });

});