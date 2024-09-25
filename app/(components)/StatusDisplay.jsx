const StatusDisplay = ({ status }) => {
  // StatusDisplay bileşeni, 'status' prop'unu alır.

  const getColor = (status) => {
    // Status değerine göre arka plan rengini döndüren fonksiyon.
    let color; // Renk değişkenini tanımlıyoruz.

    // Status değerine göre switch-case ile renk belirleniyor.
    switch (status.toLowerCase()) {
      case "done":
        color = "bg-green-200"; // Tamamlanmış durum için yeşil renk
        return color; // Rengi döndür

      case "started":
        color = "bg-yellow-200"; // Başlanmış durum için sarı renk
        return color; // Rengi döndür

      case "not started":
        color = "bg-red-200"; // Başlanmamış durum için kırmızı renk
        return color; // Rengi döndür

      default:
        color = "bg-slate-700"; // Tanımsız durumlar için gri renk
    }

    return color; // Rengi döndür
  };

  return (
    <span
      className={`inline-block rounded-full px-2 py-1 text-xs font-semibold text-gray-700 ${getColor(
        status
      )}`}
      // Statüsünü gösteren stil ile ayarlanmış bir <span> döndürüyoruz.
    >
      {status} {/* Statüsünü içerik olarak gösteriyoruz */}
    </span>
  );
};

export default StatusDisplay; // Bileşeni dışa aktarma
