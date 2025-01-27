// Copyright (c) 2025, Navi and contributors
// For license information, please see license.txt

frappe.ui.form.on('Sales Pipeline Control', {
    refresh: function (frm) {
        // Pastikan elemen HTML untuk sankey diagram tersedia
        const sankeyContainerId = "sptc-sankey-d3js";
        const sankeyContainer = document.getElementById(sankeyContainerId);

        if (!sankeyContainer) {
            frappe.msgprint(`Element with ID "${sankeyContainerId}" not found.`);
            return;
        }

        createSankeyDiagram()

        // Memuat file D3.js dan D3-Sankey.js dari lokal
        /*frappe.require([
            "/assets/navi_for_s/js/d3.min.js",
            "/assets/[nama_app]/js/d3-sankey.min.js"
        ], () => {
            // Setelah file dimuat, buat sankey diagram
            createSankeyDiagram();
        });
        */

        function createSankeyDiagram() {
            // Pilih elemen target (div) dan dapatkan dimensinya
            const container = document.getElementById("sptc-sankey-d3js");
            const parent_section = document.getElementsByClassName("form-page")[0];
            console.log(document.getElementsByClassName("form-page")[0].clientWidth);
            const containerWidth = parent_section.clientWidth - 40;
            const containerHeight = 250 ; // Tetapkan tinggi tetap atau fleksibel sesuai kebutuhan

            // Ambil data dari form (field-level variables)
            const level1 = {
                cost_breakdown: frm.doc.cbd_amount || 0,
                profit_margin: frm.doc.profit_amount || 0,
            };

            const level2 = {
                total_cost: (level1.cost_breakdown  || 0) + (level1.profit_margin || 0),
            };

            const level3 = {
                discount: frm.doc.discount_amount || 0,
                remaining_price: level2.total_cost - (frm.doc.discount_amount || 0),
                void1: 0,
            };

            const level4 = {
                production_cost: level1.cost_breakdown,
                gross_margin: level3.remaining_price - level1.cost_breakdown,
            };

            const level5 = {
                fee_customer: frm.doc.fee_customer || 0,
                consignment_total: frm.doc.total_consignment || 0,
                sales_incentive: frm.doc.sales_insentive || 0,
                miscellaneous_expenses: frm.doc.miscellaneous_expenses || 0,
            };

            const level6 = {
                net_margin:
                    level3.remaining_price -
                    (level1.cost_breakdown +
                        level5.fee_customer +
                        level5.consignment_total +
                        level5.sales_incentive +
                        level5.miscellaneous_expenses),
            };

            console.log(level1.profit_margin)
            // Data format sesuai dengan contoh yang Anda berikan
            const data = {
                nodes: [
                    { node: 0, name: "Markup Pricing", category: "In", display_value: level1.profit_margin},
                    { node: 1, name: "Cost Breakdown", category: "Static", display_value: level1.cost_breakdown },
                    { node: 2, name: "Proposed SQ", category: "Static", display_value: level2.total_cost},
                    { node: 3, name: "Accepted SQ", category: "Static", display_value: level3.remaining_price},
                    { node: 4, name: "Discount", category: "Out", display_value: level3.discount},
                    { node: 5, name: "Gross Margin", category: "In", display_value: level4.gross_margin   },
                    { node: 6, name: "Net Margin", category: "In", display_value: level6.net_margin},
                    { node: 7, name: " ", category: "Static" },
                    { node: 8, name: " ", category: "Static" },
                    { node: 9, name: "Sales Incentive", category: "Out", display_value: level5.sales_incentive },
                    { node: 10, name: "COGS", category: "Static", display_value: level4.production_cost},
                    { node: 11, name: " ", category: "Out" },
                    { node: 12, name: "Customer Fee", category: "Out", display_value: level5.fee_customer},
                    { node: 13, name: "Total Consignment", category: "Out", display_value: level5.consignment_total},
                    { node: 14, name: "Other Expenses", category: "Out", display_value: level5.miscellaneous_expenses },
                ],
                links: [
                    { source: 0, target: 2, value: level1.profit_margin/2, display_value: level1.profit_margin },
                    {source:1, target: 2, value: level1.cost_breakdown/2, display_value: level1.cost_breakdown},
                    { source: 2, target: 3, value: level3.remaining_price/2, display_value: level3.remaining_price},
                    { source: 2, target: 4, value: level3.discount /2, display_value: level3.discount},
                    { source: 3, target: 5, value: level4.gross_margin /2, display_value: level4.gross_margin},
                    { source: 3, target: 10, value: level4.production_cost /2, display_value: level4.production_cost},
                    { source: 5, target: 6, value: level6.net_margin/2, display_value: level4.gross_margin},
                    { source: 5, target: 7, value: 1 },
                    { source: 5, target: 8, value: 1 },
                    { source: 5, target: 9, value: level5.sales_incentive/2, display_value: level5.sales_incentive},
                    { source: 5, target: 14, value: level5.miscellaneous_expenses/2, display_value: level5.miscellaneous_expenses},
                    { source: 5, target: 12, value: level5.fee_customer/2, display_value: level5.fee_customer},
                    { source: 5, target: 13, value: level5.consignment_total/2, display_value: level5.consignment_total},
                    { source: 4, target: 11, value: 0 },
                    { source: 7, target: 11, value: 0 },
                    { source: 8, target: 11, value: 0 },
                    { source: 9, target: 11, value: 0 },
                    { source: 14, target: 11, value: 0 },
                    { source: 10, target: 11, value: 0 },
                    { source: 12, target: 11, value: 0 },
                    { source: 13, target: 11, value: 0 },
                ],
            };

            // Cek warna tema untuk menyesuaikan warna teks dengan tema
            const themeMode = document.documentElement.getAttribute("data-theme-mode");
            let textColor;

            if (themeMode === "dark") {
                textColor = "#fff"; // Warna teks putih untuk tema gelap
                linkOpacity = 0.5; // Warna bg link
            } else {
                textColor = "#000"; // Warna teks hitam untuk tema terang
                linkOpacity = 0.2;
            }

            // pop up hover
            // Tambahkan elemen tooltip
            const tooltip = d3
            .select("body")
            .append("div")
            .attr("class", "tooltip")
            .style("position", "absolute")
            .style("color", "#000")
            .style("background", "#fff")
            .style("padding", "8px")
            .style("border-radius", "10px")
            .style("pointer-events", "none") // Agar tooltip tidak mengganggu hover
            .style("opacity", 0); // Sembunyikan tooltip secara default

            // Hapus elemen sebelumnya jika ada
            d3.select("#sptc-sankey-d3js").select("svg").remove();
            
            // Tambahkan elemen SVG
            const svg = d3
                .select("#sptc-sankey-d3js")
                .append("svg")
                .attr("width", containerWidth)
                .attr("height", containerHeight)
                .attr("style", "margin-bottom:15px;");
            
            // Konfigurasi sankey
            const sankey = d3
                .sankey()
                .nodeWidth(20)
                .nodePadding(30)
                .extent([
                    [1, 1],
                    [containerWidth - 1, containerHeight - 6],
                ]);
            
            // Buat graph sankey dari data
            const graph = sankey(data);
            
            // Fungsi untuk menentukan warna berdasarkan kategori
            const colorScale = (category) => {
                switch (category) {
                    case "In":
                        return "#79d7be";
                    case "Static":
                        return "#66b3f3";
                    case "Out":
                        return "#ce8fe6";
                    default:
                        return "#66b3f3"; // Warna default jika kategori tidak ditemukan
                }
            };
            
            // Definisikan gradient untuk setiap link
            const defs = svg.append("defs");
            
            graph.links.forEach((link, i) => {
                const sourceColor = colorScale(link.source.category);
                const targetColor = colorScale(link.target.category);
                const gradientId = `gradient-${i}`; 
            
                const gradient = defs
                    .append("linearGradient")
                    .attr("id", gradientId)
                    .attr("gradientUnits", "userSpaceOnUse")
                    .attr("x1", link.source.x1)
                    .attr("x2", link.target.x0)
                    .attr("y1", (link.source.y0 + link.source.y1) / 2)
                    .attr("y2", (link.target.y0 + link.target.y1) / 2);
            
                gradient
                    .append("stop")
                    .attr("offset", "0%")
                    .attr("stop-color", sourceColor);
            
                gradient
                    .append("stop")
                    .attr("offset", "100%")
                    .attr("stop-color", targetColor);
            });
            
            // Tambahkan links dengan gradient
            svg.append("g")
                .selectAll("path")
                .data(graph.links)
                .join("path")
                .attr("d", d3.sankeyLinkHorizontal())
                .attr("stroke-width", (d) => Math.max(0, d.width))
                .attr("stroke", (d, i) => `url(#gradient-${i})`)
                .attr("fill", "none")
                .attr("opacity", linkOpacity);
            
            // Tambahkan nodes dengan warna berdasarkan kategori
            const node = svg
                .append("g")
                .selectAll("g")
                .data(graph.nodes)
                .join("g");
            
            node.append("rect")
                .attr("x", (d) => d.x0)
                .attr("y", (d) => d.y0)
                .attr("height", (d) => d.y1 - d.y0)
                .attr("width", (d) => d.x1 - d.x0)
                .attr("fill", (d) => colorScale(d.category));
            
            // Tambahkan teks untuk nodes
            node.append("text")
                .attr("x", (d) => d.x0 - 6)
                .attr("y", (d) => (d.y1 + d.y0) / 2)
                .attr("dy", "0.35em")
                .attr("text-anchor", "end")
                .text((d) => d.name)
                .attr("fill", textColor)
                .filter((d) => d.x0 < containerWidth / 2)
                .attr("x", (d) => d.x1 + 6)
                .attr("text-anchor", "start")
                .attr("fill", textColor);

            // pop up listener
            svg.selectAll("path")
                .on("mouseover", function (event, d) {
                    // Tambahkan border tebal pada link
                    d3.select(this)
                        .attr("opacity", 0.8); // opasitas link

                    // Tampilkan tooltip
                    tooltip
                        .style("opacity", 1)
                        .html(`<strong>${d.source.name} → ${d.target.name}</strong><br>Value: ${d.display_value}`)
                        .style("left", `${event.pageX + 5}px`) // Posisi tooltip di sebelah kursor
                        .style("top", `${event.pageY - 20}px`);
                })
                .on("mouseout", function () {
                    // Kembalikan border ke kondisi semula
                    d3.select(this)
                        .attr("opacity", linkOpacity) // opasitas link
                    // Sembunyikan tooltip
                    tooltip.style("opacity", 0);
                });

            node.on("mouseover", function (event, d) {
                // Tambahkan border tebal pada node
                d3.select(this)
                    .select("rect")
                    .attr("stroke", colorScale(d.category)) // Warna border
                    .attr("stroke-width", 8); // Ketebalan border
                console.log()

                // Tampilkan tooltip
                tooltip
                    .style("opacity", 1)
                    .html(`<strong>${d.name}</strong><br>Value: ${d.display_value}`)
                    .style("left", `${event.pageX + 5}px`) // Posisi tooltip di sebelah kursor
                    .style("top", `${event.pageY - 20}px`)
                    .style("box-shadow", "5px 5px 15px rgba(0, 0, 0, 25%)");
            })
            .on("mouseout", function () {
                // Kembalikan border ke kondisi semula
                d3.select(this)
                    .select("rect")
                    .attr("stroke", 2) // Hapus border
                    .attr("stroke-width", null);
                // Sembunyikan tooltip
                tooltip.style("opacity", 0);
            });
            
            // Tambahkan event listener untuk resize

            if (container) {
                let resizeTimeout;
                let previousWidth = container.clientWidth;
                const threshold = 5; // Batas perubahan ukuran (dalam piksel)

                const resizeObserver = new ResizeObserver((entries) => {
                    for (let entry of entries) {
                        const currentWidth = entry.contentRect.width;
                        const widthDifference = Math.abs(currentWidth - previousWidth);

                        if (widthDifference > threshold) {
                            clearTimeout(resizeTimeout); // Hapus timeout sebelumnya
                            resizeTimeout = setTimeout(() => {
                                requestAnimationFrame(() => {
                                    createSankeyDiagram(); // Render ulang diagram setelah 0.5 detik
                                    previousWidth = currentWidth; // Simpan lebar terbaru

                                    // Hentikan observasi setelah diagram di-render (opsional)
                                    resizeObserver.unobserve(container);
                                });
                            }, 5); // Tunggu 10ms (0.01 detik)
                        }
                    }
                });

                resizeObserver.observe(container); // Mulai memantau container
            }
        }
        
    }
});
