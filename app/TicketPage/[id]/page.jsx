// TicketForm bileşenini içe aktarma
import TicketForm from "@/app/(components)/TicketForm";

// Belirli bir ID ile Ticket verisini almak için asenkron fonksiyon
const getTicketById = async (id) => {
  try {
    // API'den Ticket verisini alma isteği
    const res = await fetch(`http://localhost:3000/api/Tickets/${id}`, {
      cache: "no-store", // Tarayıcı önbelleklemesini devre dışı bırak
    });

    // Yanıtın başarılı olup olmadığını kontrol et
    if (!res.ok) {
      throw new Error("Failed to fetch ticket"); // Başarısız olursa hata fırlat
    }

    // Yanıtı JSON formatına çevir ve döndür
    return res.json();
  } catch (error) {
    console.error("Error fetching ticket:", error); // Hata durumunda konsola yazdır
    return null; // Hata durumunda null döndür
  }
};

// TicketPage bileşeni
const TicketPage = async ({ params }) => {
  // Eğer ID "new" ise düzenleme modu kapalıdır
  const isEditMode = params.id !== "new"; // Daha anlamlı değişken adı

  let ticketData = isEditMode ? await getTicketById(params.id) : { _id: "new" };

  // Eğer düzenleme modundaysak ve veri gelmediyse hata mesajı döndürebilirsiniz
  if (isEditMode && !ticketData) {
    return <div>Error loading ticket data</div>; // Hata mesajı
  }

  // TicketForm bileşenini render et
  return <TicketForm ticket={ticketData} />;
};

// TicketPage bileşenini dışa aktarma
export default TicketPage;
