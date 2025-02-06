frappe.listview_settings['Sales Pipeline Control'] = {
    hide_name_column: true,  // Menghilangkan kolom name
    hide_name_filter: true,  // Menghilangkan filter name
    onload(listview) {
        // Menambahkan style custom langsung di file JS
        var styles = `
            .list-row .level-left { 
                flex: 4;
                min-width: 90% !important;
            }
        `;
        var styleSheet = document.createElement("style");
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);

        // Menambahkan style khusus pada elemen dengan class tertentu
        var elements = document.getElementsByClassName('level-left list-header-subject');
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.minWidth = '90%';
        }

        // Periksa apakah pengguna bukan pengguna mobile
        if (window.innerWidth > 768) { // 768px adalah breakpoint umum untuk mobile
            // Menyembunyikan sidebar
            var sidebar = document.getElementsByClassName('col-lg-2 layout-side-section');
            for (var i = 0; i < sidebar.length; i++) {
                sidebar[i].style.display = 'none';
            }
        }
    },

    formatters: {
        cbd_amount: formatUang,
        sq_final_amount: formatUang,
        gross_margin: formatUang,
        nett_margin: formatUang,
    }
};

// Fungsi formatter untuk uang
function formatUang(value) {
    if (!value) return "-"; // Jika null atau kosong, tampilkan "-"

    let formattedValue;
    
    if (value >= 1000000) {
        // Format ke juta (99.000.000 → 99,00jt)
        let juta = (value / 1000000).toFixed(2).replace(".", ",");
        formattedValue = `Rp ${juta.replace(",00", "")}jt`; // Hilangkan ,00 jika desimalnya nol
    } else {
        // Format ke ribuan (999.000 → 999,00rb)
        let ribu = (value / 1000).toFixed(2).replace(".", ",");
        formattedValue = `Rp ${ribu.replace(",00", "")}rb`; // Hilangkan ,00 jika desimalnya nol
    }

    // **Menampilkan nilai asli saat hover & mempertahankan fitur klik**
    return `<span title="Rp ${new Intl.NumberFormat('id-ID').format(value)}">${formattedValue}</span>`;
}