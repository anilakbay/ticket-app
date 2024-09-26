const StatusDisplay = ({ status }) => {
  // StatusDisplay bileşeni, 'status' prop'unu alır.

  const getColor = (status) => {
    // Status değerine göre arka plan rengini döndüren fonksiyon.
    switch (status.toLowerCase()) {
      case "done":
        return "bg-green-200"; // Tamamlanmış durum için yeşil renk
      case "started":
        return "bg-yellow-200"; // Başlanmış durum için sarı renk
      case "not started":
        return "bg-red-200"; // Başlanmamış durum için kırmızı renk
      default:
        return "bg-slate-700"; // Tanımsız durumlar için gri renk
    }
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
