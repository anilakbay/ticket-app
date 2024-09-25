import DeleteBlock from "./DeleteBlock"; // Ticket'ı silme işlevselliği sağlayan bileşen
import PriorityDisplay from "./PriorityDisplay"; // Ticket'ın önceliğini gösteren bileşen
import ProgressDisplay from "./ProgressDisplay"; // Ticket'ın ilerleme durumunu gösteren bileşen
import StatusDisplay from "./StatusDisplay"; // Ticket'ın durumunu gösteren bileşen

const TicketCard = () => {
  return (
    <div className="flex flex-col bg-card hover:bg-card-hover rounded-md shadow-lg p-3 m-2">
      {/* Ticket kartı için ana kapsayıcı div */}

      <div className="flex mb-3">
        {/* Üst kısmındaki içerikleri düzenleyen flex div */}
        <PriorityDisplay /> {/* Öncelik durumunu gösteren bileşen */}
        <div className="ml-auto">
          {/* Sağ tarafa yaslanmış silme butonu */}
          <DeleteBlock /> {/* Ticket'ı silme butonu */}
        </div>
      </div>

      <h4>Ticket Title</h4>
      {/* Ticket başlığı */}

      <hr className="h-px border-0 bg-page mb-2 " />
      {/* Ayrım çizgisi */}

      <p className="whitespace-pre-wrap">
        this is the ticket description! Please do this ticket
      </p>
      {/* Ticket açıklaması */}

      <div className="flex-grow"></div>
      {/* Kartın içeriğini esnetmek için boş bir alan */}

      <div className="mt-2">
        {/* Alt kısmındaki içerikler için kapsayıcı div */}
        <div className="flex flex-col">
          <p className="text-xs my-1">19/11/2023 10.00</p>
          {/* Ticket'ın tarih ve saat bilgisi */}
          <ProgressDisplay />{" "}
          {/* Ticket'ın ilerleme durumunu gösteren bileşen */}
        </div>

        <div className="flex justify-end mt-2">
          {/* Sağ tarafa yaslanmış durum bilgisi */}
          <StatusDisplay /> {/* Ticket'ın durumunu gösteren bileşen */}
        </div>
      </div>
    </div>
  );
};

export default TicketCard; // Bileşeni dışa aktarma
