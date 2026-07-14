const { createApp, ref, computed, onMounted, watch, nextTick } = Vue;

const CERTIFICATES = [
    { title: "IA na Prática: Como Dados bem Estruturados fazem a Diferença", institution: "Fundação Bradesco", category: "IA & Dados", date: "Jul 2026", sort: "2026-07-13", year: 2026, hours: 2 },
    { title: "Análise de Dados no Power BI", institution: "Fundação Bradesco", category: "IA & Dados", date: "Jul 2026", sort: "2026-07-13", year: 2026, hours: 4 },
    { title: "8° Congresso Internacional do IPLD", institution: "IPLD", category: "Riscos & Compliance", date: "Mai 2026", sort: "2026-05-27", year: 2026, hours: 1 },
    { title: "Análise de Demonstrações Financeiras", institution: "Ibmec", category: "Finanças & Mercado de Capitais", date: "Mai 2026", sort: "2026-05-05", year: 2026, hours: 30 },
    { title: "Gestão de Riscos Financeiros", institution: "Ibmec", category: "Finanças & Mercado de Capitais", date: "Abr 2026", sort: "2026-04-29", year: 2026, hours: 16 },
    { title: "Cloud Computing with AWS", institution: "O'Reilly", category: "Cloud & Tecnologia", date: "Abr 2026", sort: "2026-04-23", year: 2026, hours: 5.17 },
    { title: "Certificação Lean Seis Sigma Green Belt", institution: "FM2S", category: "Gestão & Processos", date: "Abr 2026", sort: "2026-04-15", year: 2026, hours: 60 },
    { title: "AI Fluency: Framework & Foundations", institution: "Anthropic", category: "IA & Dados", date: "Abr 2026", sort: "2026-04-15", year: 2026 },
    { title: "Fundamentos de Economia e Finanças", institution: "ANBIMA", category: "Finanças & Mercado de Capitais", date: "Fev 2026", sort: "2026-02-09", year: 2026, hours: 9 },
    { title: "Inovação no mercado financeiro", institution: "ANBIMA", category: "Finanças & Mercado de Capitais", date: "Jan 2026", sort: "2026-01-07", year: 2026, hours: 2 },
    { title: "Fundamentos da Programação Web", institution: "Rocketseat", category: "Programação", date: "Dez 2025", sort: "2025-12-19", year: 2025, hours: 1 },
    { title: "Databricks Fundamentals Accreditation", institution: "Databricks", category: "IA & Dados", date: "Nov 2025", sort: "2025-11-19", year: 2025 },
    { title: "Responsabilidade Social, Ambiental e Climática", institution: "B3", category: "Riscos & Compliance", date: "Nov 2025", sort: "2025-11-18", year: 2025, hours: 1 },
    { title: "PLD/FTP", institution: "B3", category: "Riscos & Compliance", date: "Nov 2025", sort: "2025-11-18", year: 2025, hours: 1 },
    { title: "Gestão de Riscos e Performance", institution: "ANBIMA", category: "Finanças & Mercado de Capitais", date: "Nov 2025", sort: "2025-11-18", year: 2025, hours: 5.58 },
    { title: "Fundos de Investimento", institution: "ANBIMA", category: "Finanças & Mercado de Capitais", date: "Set 2025", sort: "2025-09-08", year: 2025, hours: 6 },
    { title: "ESG no mercado financeiro", institution: "ANBIMA", category: "Riscos & Compliance", date: "Set 2025", sort: "2025-09-08", year: 2025, hours: 8 },
    { title: "Impacta Digital Tech Summit", institution: "Impacta Digital", category: "Desenvolvimento Profissional & Eventos", date: "Mai 2025", sort: "2025-05-19", year: 2025, hours: 4 },
    { title: "Introdução à Programação Orientada a Objetos (POO)", institution: "Fundação Bradesco", category: "Programação", date: "Mai 2025", sort: "2025-05-11", year: 2025, hours: 5 },
    { title: "Coletivo Online — Preparação para o Mercado de Trabalho", institution: "Instituto Coca-Cola Brasil", category: "Desenvolvimento Profissional & Eventos", date: "Mai 2025", sort: "2025-05-15", year: 2025, hours: 11 },
    { title: "Gestão Estratégica de Marcas: Os Desafios da Era Digital", institution: "USP", category: "Desenvolvimento Profissional & Eventos", date: "Dez 2024", sort: "2024-12-19", year: 2024 },
    { title: "XIV Semana Aberta de Gestão Ambiental", institution: "DAGA", category: "Meio Ambiente & Sustentabilidade", date: "Nov 2024", sort: "2024-11-22", year: 2024, hours: 5 },
    { title: "USP PENSA BRASIL — Mudanças Climáticas e Justiça Ambiental", institution: "USP", category: "Meio Ambiente & Sustentabilidade", date: "Ago 2024", sort: "2024-08-16", year: 2024, hours: 2 },
    { title: "USP PENSA BRASIL — Pensar a metrópole com inclusão", institution: "USP", category: "Meio Ambiente & Sustentabilidade", date: "Ago 2024", sort: "2024-08-16", year: 2024, hours: 2 },
    { title: "USP PENSA BRASIL — Evento Geral", institution: "USP", category: "Meio Ambiente & Sustentabilidade", date: "Ago 2024", sort: "2024-08-16", year: 2024 }
];

const PALETTE = ["#b8935a", "#4a4f63", "#2f6f6b", "#b23a2e", "#c98a3a", "#5c7a99", "#8b5e83", "#7c8a6e"];

createApp({
    setup() {
        const certificates = ref(CERTIFICATES);
        const activeFilter = ref(null);
        const catCanvas = ref(null);
        const instCanvas = ref(null);
        let catChart = null;
        let instChart = null;

        const total = computed(() => certificates.value.length);
        const institutions = computed(() => [...new Set(certificates.value.map(c => c.institution))]);
        const categories = computed(() => [...new Set(certificates.value.map(c => c.category))]);
        const years = computed(() => [...new Set(certificates.value.map(c => c.year))].sort());
        const yearRange = computed(() => {
            const y = years.value;
            if (y.length === 0) return "—";
            return y.length > 1 ? `${y[0]}–${y[y.length - 1]}` : String(y[0]);
        });

        const instChartHeight = computed(() => Math.max(260, institutions.value.length * 28));

        const totalHours = computed(() =>
            certificates.value.reduce((sum, c) => sum + (c.hours || 0), 0)
        );

        function formatHours(h) {
            const rounded = Math.round(h * 10) / 10;
            return (rounded % 1 === 0 ? rounded : rounded.toFixed(1)) + "h";
        }

        function categoryColor(cat) {
            const idx = categories.value.indexOf(cat);
            return PALETTE[idx % PALETTE.length];
        }

        const filteredCertificates = computed(() => {
            if (!activeFilter.value) return certificates.value;
            return certificates.value.filter(c => c.category === activeFilter.value);
        });

        const sortedFilteredCertificates = computed(() =>
            [...filteredCertificates.value].sort((a, b) => (b.sort || "").localeCompare(a.sort || ""))
        );

        function pad(n) {
            return String(n).padStart(2, "0");
        }

        function countByCategory(cat) {
            return certificates.value.filter(c => c.category === cat).length;
        }

        function renderCharts() {
            const catCounts = categories.value.map(cat => countByCategory(cat));
            const instCounts = institutions.value.map(inst =>
                certificates.value.filter(c => c.institution === inst).length
            );

            if (catChart) catChart.destroy();
            if (instChart) instChart.destroy();

            catChart = new Chart(catCanvas.value, {
                type: "doughnut",
                data: {
                    labels: categories.value,
                    datasets: [{ data: catCounts, backgroundColor: PALETTE, borderColor: "#f5f1e8", borderWidth: 3 }]
                },
                options: {
                    plugins: {
                        legend: {
                            position: "bottom",
                            labels: { font: { family: "IBM Plex Mono", size: 11 }, color: "#5c5847", boxWidth: 12, padding: 14 }
                        }
                    },
                    cutout: "62%"
                }
            });

            instChart = new Chart(instCanvas.value, {
                type: "bar",
                data: {
                    labels: institutions.value,
                    datasets: [{ data: instCounts, backgroundColor: "#b23a2e", borderRadius: 2, maxBarThickness: 34 }]
                },
                options: {
                    indexAxis: "y",
                    plugins: { legend: { display: false } },
                    scales: {
                        x: { ticks: { stepSize: 1, font: { family: "IBM Plex Mono", size: 11 }, color: "#5c5847" }, grid: { color: "#e2d9c4" } },
                        y: { ticks: { font: { family: "IBM Plex Mono", size: 11 }, color: "#1c1f2b" }, grid: { display: false } }
                    }
                }
            });
        }

        onMounted(() => {
            nextTick(renderCharts);
        });

        watch(certificates, () => {
            nextTick(renderCharts);
        }, { deep: true });

        return {
            certificates,
            activeFilter,
            catCanvas,
            instCanvas,
            total,
            institutions,
            categories,
            yearRange,
            filteredCertificates,
            sortedFilteredCertificates,
            instChartHeight,
            totalHours,
            pad,
            countByCategory,
            categoryColor,
            formatHours
        };
    }
}).mount("#app");