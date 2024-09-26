import React from "react";
import TicketCard from "./(components)/TicketCard";

const fetchTickets = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/Tickets", {
      cache: "no-store", // Her istekte güncel verileri al
    });

    if (!res.ok) throw new Error("Failed to fetch tickets"); // İstek başarısızsa hata fırlat

    return res.json(); // JSON verisini döndür
  } catch (error) {
    console.error("Error loading tickets:", error);
    return []; // Hata durumunda boş bir dizi döndür
  }
};

const getUniqueCategories = (tickets) => [
  ...new Set(tickets.map((ticket) => ticket.category)), // Tekil kategorileri almak için Set kullan
];

const Dashboard = async () => {
  const data = await fetchTickets(); // Verileri al
  const tickets = data.tickets || []; // Verilerden ticket'ları al

  if (!tickets.length) return <p>No tickets available.</p>; // Ticket yoksa mesaj göster

  return (
    <div className="p-5">
      {getUniqueCategories(tickets).map((category, index) => (
        <div key={index} className="mb-4">
          <h2 className="text-lg font-semibold">{category}</h2>{" "}
          {/* Kategori başlığı için stil eklendi */}
          <div className="lg:grid grid-cols-2 xl:grid-cols-4 gap-4">
            {" "}
            {/* Gap eklendi */}
            {tickets
              .filter((ticket) => ticket.category === category) // Kategoriye göre filtrele
              .map((filteredTicket) => (
                <TicketCard key={filteredTicket.id} ticket={filteredTicket} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard; // Bileşeni dışa aktar
