"use client"; // Next.js'in client-side rendering kullanacağını belirtiyor.

import { useRouter } from "next/navigation"; // Router nesnesini alıyoruz, sayfa yönlendirmesi için.
import React, { useState } from "react"; // React'ten useState hook'unu alıyoruz.

const TicketForm = ({ ticket }) => {
  const router = useRouter(); // Yönlendirme ve sayfa yenileme için kullanacağız.

  const isEditMode = ticket && ticket._id !== "new"; // Düzenleme modunu kontrol ediyoruz.

  const defaultTicketData = {
    title: "", // Başlık
    description: "", // Açıklama
    priority: 1, // Öncelik seviyesi (1 - düşük)
    progress: 0, // Tamamlama yüzdesi (başlangıçta 0)
    status: "not started", // Durum
    category: "Hardware Problem", // Kategori
  };

  const [formData, setFormData] = useState(
    isEditMode ? { ...defaultTicketData, ...ticket } : defaultTicketData // Duruma göre başlangıç değerleri
  );

  const [loading, setLoading] = useState(false); // Yükleme durumu
  const [error, setError] = useState(null); // Hata durumu

  const handleChange = (e) => {
    const { name, value } = e.target; // Değişen input elemanının adı ve değeri
    setFormData((prevState) => ({
      ...prevState,
      [name]: value, // Form verilerini güncelliyoruz
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Sayfa yeniden yüklenmesini engelle
    setLoading(true); // Yükleme durumunu başlat
    setError(null); // Önceki hataları temizle

    try {
      const response = await fetch(
        isEditMode ? `/api/Tickets/${ticket._id}` : "/api/Tickets",
        {
          method: isEditMode ? "PUT" : "POST", // PUT veya POST isteği
          headers: {
            "Content-Type": "application/json", // JSON formatı
          },
          body: JSON.stringify(formData), // Form verilerini JSON formatında gönder
        }
      );

      if (!response.ok) throw new Error("Failed to process the ticket."); // Hata durumunda fırlat
      router.refresh(); // Sayfayı yenile
      router.push("/"); // Ana sayfaya yönlendir
    } catch (err) {
      setError(err.message); // Hata mesajını state'e kaydet
    } finally {
      setLoading(false); // Yükleme durumunu kapat
    }
  };

  const categories = [
    "Hardware Problem",
    "Software Problem",
    "Application Development",
    "Project",
  ];

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-1/2">
        <h3>{isEditMode ? "Update Your Ticket" : "Create New Ticket"}</h3>
        {error && <p className="text-red-500">{error}</p>}
        {loading && <p>Loading...</p>}

        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={handleChange}
          value={formData.title}
          required
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          value={formData.description}
          rows="5"
          required
        />

        <label htmlFor="category">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>

        <label>Priority</label>
        <div className="flex gap-4">
          {[1, 2, 3, 4, 5].map((priority) => (
            <label key={priority}>
              <input
                id={`priority-${priority}`}
                name="priority"
                type="radio"
                onChange={handleChange}
                value={priority}
                checked={formData.priority === priority}
              />
              {priority}
            </label>
          ))}
        </div>

        <label htmlFor="progress">Progress</label>
        <input
          type="range"
          id="progress"
          name="progress"
          value={formData.progress}
          min="0"
          max="100"
          onChange={handleChange}
        />

        <label htmlFor="status">Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="not started">Not Started</option>
          <option value="started">Started</option>
          <option value="done">Done</option>
        </select>

        <button type="submit" className="btn max-w-xs" disabled={loading}>
          {isEditMode ? "Update Ticket" : "Create Ticket"}
        </button>
      </form>
    </div>
  );
};

export default TicketForm; // Bileşeni dışa aktarıyoruz.
