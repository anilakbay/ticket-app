"use client"; // Next.js'in client-side rendering kullanacağını belirtiyor.

import { useRouter } from "next/navigation"; // Router nesnesini alıyoruz, sayfa yönlendirmesi için.
import React, { useState } from "react"; // React'ten useState hook'unu alıyoruz.

const EditTicketForm = ({ ticket }) => {
  const router = useRouter(); // Yönlendirme ve sayfa yenileme için kullanacağız.
  const isEditMode = ticket._id !== "new"; // Eğer ticket'in ID'si "new" değilse düzenleme modundayız demektir.

  // Formu başlatırken kullanılacak başlangıç değerleri.
  const defaultTicketData = {
    title: "", // Başlık
    description: "", // Açıklama
    priority: 1, // Öncelik seviyesi (1 - düşük)
    progress: 0, // Tamamlama yüzdesi (başlangıçta 0)
    status: "not started", // Durum (henüz başlanmadı)
    category: "Hardware Problem", // Kategori
  };

  // Eğer düzenleme modundaysak mevcut ticket değerlerini kullan, değilse boş bir form başlat.
  const [formData, setFormData] = useState(
    isEditMode
      ? { ...defaultTicketData, ...ticket } // Eğer düzenleme modundaysak ticket verilerini forma ekliyoruz.
      : defaultTicketData // Yeni bir ticket oluşturulacaksa varsayılan değerler kullanılıyor.
  );

  const [loading, setLoading] = useState(false); // Form gönderilirken yükleme durumunu kontrol etmek için.
  const [error, setError] = useState(null); // Hataları takip etmek için.

  // Formdaki değişiklikleri takip eden fonksiyon.
  const handleChange = (e) => {
    const { name, value } = e.target; // Değişen input elemanının adı ve değerini alıyoruz.
    setFormData((prevState) => ({
      ...prevState,
      [name]: value, // Değişiklik form verilerine kaydediliyor.
    }));
  };

  // Form gönderildiğinde çalışacak fonksiyon.
  const handleSubmit = async (e) => {
    e.preventDefault(); // Sayfanın yeniden yüklenmesini engeller.
    setLoading(true); // Yükleme durumunu aktif hale getirir.
    setError(null); // Önceki hataları temizler.

    try {
      // Eğer düzenleme modundaysak PUT isteği, değilse POST isteği gönderiyoruz.
      const response = await fetch(
        isEditMode ? `/api/Tickets/${ticket._id}` : "/api/Tickets",
        {
          method: isEditMode ? "PUT" : "POST", // PUT -> güncelleme, POST -> yeni oluşturma
          headers: {
            "Content-Type": "application/json", // JSON formatında veri gönderiyoruz.
          },
          body: JSON.stringify(formData), // Form verilerini JSON formatında body'e ekliyoruz.
        }
      );

      if (!response.ok) throw new Error("Failed to process the ticket."); // Eğer cevap başarısızsa hata fırlatır.

      router.refresh(); // Sayfayı yeniler, böylece güncellenmiş veriler görünür.
      router.push("/"); // Ana sayfaya yönlendirir.
    } catch (err) {
      setError(err.message); // Hata varsa hata mesajını state'e kaydeder.
    } finally {
      setLoading(false); // İşlem bittiğinde yükleme durumunu kapatır.
    }
  };

  // Kullanıcıya seçenek olarak sunulan kategoriler.
  const categories = [
    "Hardware Problem", // Donanım Problemi
    "Software Problem", // Yazılım Problemi
    "Application Development", // Uygulama Geliştirme
    "Project", // Proje
  ];

  return (
    <div className="flex justify-center">
      {" "}
      {/* Formun sayfada ortalanmasını sağlıyor. */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-1/2">
        {" "}
        {/* Form başlatma ve CSS stilleri */}
        <h3>{isEditMode ? "Update Your Ticket" : "Create New Ticket"}</h3>{" "}
        {/* Başlık, düzenleme modunda güncelleme metni, yeni modda oluşturma metni gösterilir. */}
        {error && <p className="text-red-500">{error}</p>}{" "}
        {/* Eğer bir hata varsa kullanıcıya kırmızı renkli hata mesajı gösterir. */}
        {loading && <p>Loading...</p>}{" "}
        {/* Yükleme sırasında kullanıcıya yükleniyor mesajı gösterir. */}
        <label>Title</label> {/* Başlık etiketi */}
        <input
          id="title" // Input'a benzersiz bir ID veriyoruz.
          name="title" // State ile eşleştirmek için input'a bir isim veriyoruz.
          type="text" // Input'un türü metin.
          onChange={handleChange} // Her değişiklikte handleChange fonksiyonu çağrılır.
          value={formData.title} // Input değeri state ile kontrol ediliyor.
          required // Bu alanın doldurulması zorunlu.
        />
        <label>Description</label> {/* Açıklama etiketi */}
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          value={formData.description}
          rows="5" // Textarea'nın 5 satır yüksekliğinde olmasını sağlar.
          required
        />
        <label>Category</label> {/* Kategori etiketi */}
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {" "}
              {/* Kategori seçeneklerini döngü ile oluşturuyoruz. */}
              {category}{" "}
              {/* Her bir seçenek kullanıcının seçmesi için görüntülenir. */}
            </option>
          ))}
        </select>
        <label>Priority</label> {/* Öncelik etiketi */}
        <div className="flex gap-2">
          {" "}
          {/* Radyo butonları arasında boşluk bırakır. */}
          {[1, 2, 3, 4, 5].map(
            (
              priority // 1'den 5'e kadar öncelik seçeneklerini döngü ile oluşturur.
            ) => (
              <label key={priority}>
                <input
                  id={`priority-${priority}`}
                  name="priority"
                  type="radio" // Radyo butonu türü, sadece bir tanesi seçilebilir.
                  onChange={handleChange}
                  value={priority}
                  checked={formData.priority === priority} // Seçilen radyo butonunu kontrol eder.
                />
                {priority} {/* Radyo butonunun yanında sayıyı gösterir. */}
              </label>
            )
          )}
        </div>
        <label>Progress</label> {/* İlerleme etiketi */}
        <input
          type="range" // İlerleme durumu için bir kaydırma çubuğu.
          id="progress"
          name="progress"
          value={formData.progress}
          min="0" // Minimum değer 0
          max="100" // Maksimum değer 100
          onChange={handleChange}
        />
        <label>Status</label> {/* Durum etiketi */}
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="not started">Not Started</option>{" "}
          {/* Başlanmadı durumu */}
          <option value="started">Started</option> {/* Başladı durumu */}
          <option value="done">Done</option> {/* Tamamlandı durumu */}
        </select>
        <button
          type="submit" // Formu gönderme butonu.
          className="btn max-w-xs" // Butonun genişlik sınırlaması.
          disabled={loading} // Eğer yükleme yapılıyorsa buton devre dışı bırakılır.
        >
          {isEditMode ? "Update Ticket" : "Create Ticket"}{" "}
          {/* Butonun üzerinde düzenleme moduna göre yazı gösterilir. */}
        </button>
      </form>
    </div>
  );
};

export default EditTicketForm; // Bileşeni dışa aktarıyoruz.
