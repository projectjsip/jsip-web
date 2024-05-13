export const translateStatus = (status) => {
    if (status === "submit_to_verifier") return "Diajukan ke Verifikator";
    if (status === "on_review") return "Proses Review";
    if (status === "fund_distribution") return "Proses Penyaluran Dana";
    if (status === "finished") return "Selesai";
};

export const translateStatusTracking = (status) => {
    if (status === "accepted") return "Diterima";
    if (status === "rejected") return "Ditolak";
    if (status === "process") return "Diproses";
};

export const statusColor = (status) => {
    if (status === "accepted") return "green";
    if (status === "rejected") return "red";
    if (status === "process") return "cyan";
};